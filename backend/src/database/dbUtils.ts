import mongoose from "mongoose";
import Items from "../models/itemModel";
import Orders from "../models/orderModel";
import Item_t from "../types/items";
import { Orders_t, OrderedItem_t } from "../types/orders";
import AppError, { AppErrorType } from "../types/AppError";
import Items_t from "../types/items";

const getItem = async (param: Item_t): Promise<Item_t> => {
  try {
    const item: Item_t | null = await Items.findOne({ _id: param.id }).select(
      "-__v"
    );
    if (item == null) throw new Error("Item not found, wrong item ID");
    return item;
  } catch (e) {
    throw new Error("Item fetch " + e);
  }
};

const getAllItems = async (): Promise<Item_t[]> => {
  try {
    return await Items.find().select("-__v");
  } catch (e) {
    throw new Error("Items find failed" + e);
  }
};

const updateItemQuantity = async (
  params: Item_t,
  itemUpdateReq: Item_t
): Promise<void> => {
  if (
    itemUpdateReq.availableQuantity == undefined &&
    itemUpdateReq.price == undefined
  )
    throw new Error("Updation Error: Either Price or Quantity is required");

  const filter = { _id: params.id };
  const set = { $set: { ...itemUpdateReq } };
  await Items.updateOne(filter, set);
};

const getAllOrders = async (): Promise<Orders_t[]> => {
  try {
    const orders: Orders_t[] = await Orders.find()
      .populate({
        path: "items.id",
        select: "name price -_id",
      })
      .select("-__v -items._id -items.id");
    return orders;
  } catch (e) {
    throw new Error("Unable to fetch orders" + e);
  }
};

const getNextOrderNumber = async (): Promise<Number> => {
  try {
    const res = await Orders.findOne({
      date: { $gt: new Date().setHours(0, 0, 0, 0) },
    })
      .sort({ orderNo: -1 })
      .limit(1);

    let orderNum = res?.orderNo || 0;
    orderNum = ++orderNum % 10000;
    return orderNum;
  } catch (e) {
    throw e;
  }
};

const placeOrder = async (ordereditems: OrderedItem_t[]): Promise<Orders_t> => {
  try {
    for (let item of ordereditems) {
      let dbItem: Items_t | null = await Items.findOne({ _id: item.id });
      if (dbItem == null) throw new Error("Invalid item ID");
      if (item.quantity > dbItem.availableQuantity)
        throw new Error(
          "Requested quantity (${item.quantity}) exceeds available stock (${dbItem.availableQuantity})"
        );
      // uncomment during deployment
      // dbItem.availableQuantity = dbItem.availableQuantity - item.quantity;
      // await dbItem.save();
    }
    const newOrder: Orders_t = new Orders({
      orderNo: await getNextOrderNumber(),
      items: ordereditems,
      status: "ordered",
      date: new Date(),
    });
    await newOrder.save();
    return newOrder;
  } catch (e) {
    throw e;
  }
};

const updateManyItemQuantity = async (
  updationItems: Item_t[]
): Promise<void> => {
  for (let [idx, iterItem] of updationItems.entries()) {
    if (iterItem.id == null)
      throw new Error(
        "The the attribute 'id' is not present in the sent data at index " + idx
      );
    if (iterItem.availableQuantity == null && iterItem.price == null)
      throw new Error(
        "Either 'price' or 'availableQuantity' is required at index " + idx
      );
    const filter = { _id: iterItem.id };
    const { id, name, soldQuantity, image, ...setter } = iterItem;
    try {
      await Items.updateOne(filter, setter);
    } catch (e) {
      throw new Error("Invalid item at index " + idx + " " + e);
    }
  }
};

const getOrder = async (requestOrder: Orders_t): Promise<Orders_t> => {
  try {
    const order: Orders_t | null = await Orders.findOne({
      _id: requestOrder.id,
    })
      .populate({
        path: "items.id",
        select: "name price -_id",
      })
      .select("-__v -items._id ");
    if (order == null) throw new Error("Item couldn't be found");

    if (order.status != "ordered" && order.status != "current")
      throw new AppError(
        AppErrorType.InvalidOrderState,
        `Order Status '${order.status}', but expected 'ordered'`,
        400
      );
    const now: Date = new Date();
    const orderDate: Date = new Date(order.date);
    if (now.getTime() - orderDate.getTime() > 1000 * 60 * 60 * 24) {
      const ExpirationDateOfOrder: Date = new Date(orderDate.getTime() + 1);
      throw new AppError(
        AppErrorType.TokenExpired,
        "Order token has expired on " +
          ExpirationDateOfOrder +
          ". Please request a new one",
        401
      );
    }
    order.status = "current";
    await order.save();
    return order;
  } catch (e) {
    throw e;
  }
};

const updateOrder = async (
  params: Orders_t,
  orderUpdateReq: Orders_t
): Promise<void> => {
  if (orderUpdateReq.status == undefined)
    throw new AppError(
      AppErrorType.InvalidOrderState,
      "Status is required",
      400
    );

  if (
    !["current", "ordered", "confirmed", "finished"].includes(
      orderUpdateReq.status
    )
  )
    throw new AppError(
      AppErrorType.InvalidOrderState,
      "Invalid status, status must be one of: current, ordered, confirmed, finished",
      400
    );

  try {
    const { id, ...setter } = orderUpdateReq;
    let order: any = await Orders.findById(params.id);
    if (
      (order.status == "finished" || order.status == "confirmed") &&
      setter.status == "current"
    )
      throw new AppError(
        AppErrorType.InvalidOrderState,
        "Order is already finished or confirmed",
        400
      );
    order = await order?.set(setter).save();
  } catch (e) {
    throw e;
  }
};

const getCurrentOrder = async (): Promise<Orders_t | null> => {
  try {
    const order: Orders_t | null = await Orders.findOne({
      status: "current",
    })
      .populate({
        path: "items.id",
        select: "name price -_id",
      })
      .select("-__v -items._id ");
    return order;
  } catch (e) {
    throw e;
  }
};

const dbUtil = {
  // items
  getItem,
  getAllItems,
  updateItemQuantity,
  updateManyItemQuantity,
  // orders
  placeOrder,
  getOrder,
  getAllOrders,
  getCurrentOrder,
  updateOrder,
};

export default dbUtil;
