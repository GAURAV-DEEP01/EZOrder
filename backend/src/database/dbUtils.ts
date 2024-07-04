import Items from "../models/itemModel";
import Orders from "../models/orderModel";
import Item_t from "../types/items";

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

export const dbUtil = { getItem, getAllItems, updateItemQuantity };
