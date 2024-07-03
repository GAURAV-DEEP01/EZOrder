import Items from "../models/itemModel";
import Orders from "../models/orderModel";

const getAllItems = async (): Promise<any> => {
  try {
    return await Items.find().select("-__v");
  } catch (e) {
    console.error("Find Error: Item find failed" + e);
    return null;
  }
};

export const dbUtil = { getAllItems };
