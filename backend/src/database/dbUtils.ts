import Items from "../models/itemModel";
import Orders from "../models/orderModel";
import Item_t from "../types/items";

const getAllItems = async (): Promise<any> => {
  try {
    const data = await Items.find().select("-__v");
    return data;
  } catch (e) {
    console.error("Find Error: Item find failed" + e);
    return null;
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

export const dbUtil = { getAllItems, updateItemQuantity };
