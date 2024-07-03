import { cafeteriaItems } from "./itemsData";
import Items from "../models/itemModel";

export const populateItems = async () => {
  try {
    await Items.insertMany(cafeteriaItems);
    console.info("Database populated with items");
  } catch (e) {
    console.error("Database population ERROR: " + e);
  }
};
