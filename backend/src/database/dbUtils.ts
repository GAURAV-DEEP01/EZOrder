import mongoose from "mongoose";
import Items from "../models/itemModel";
import Orders from "../models/orderModel";
import Item_t from "../types/items";
import { Orders_t, OrderedItem_t } from "../types/orders";

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
    const order: Orders_t[] = await Orders.find().select("-__v  -items._id");
    if (order.length == 0) throw new Error("No orders available");
    return order;
  } catch (e) {
    throw new Error("Unable to fetch orders" + e);
  }
};

const placeOrder = async (
  ordereditems: OrderedItem_t[]
): Promise<mongoose.Schema.Types.ObjectId> => {
  try {
    const newOrder: Orders_t = new Orders({
      items: ordereditems,
      status: "ordered",
      date: new Date(),
    });
    await newOrder.save();
    return newOrder.id;
  } catch (e) {
    throw e;
  }
};
const updateManyItemQuantity = async (updationItems: Item_t[]) => {
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
    const { id, ...setter } = iterItem;
    try {
      await Items.updateOne(filter, setter);
    } catch (e) {
      throw new Error("Invalid item at index " + idx + " " + e);
    }
  }
};
const dbUtil = {
  getItem,
  getAllItems,
  updateItemQuantity,
  placeOrder,
  getAllOrders,
  updateManyItemQuantity,
};

export default dbUtil;
