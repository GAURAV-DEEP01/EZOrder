import mongoose, { Document } from "mongoose";
import Items_t from "./items";
interface OrderedItem_t {
  id: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface Orders_t extends Document {
  orderNo: Number;
  items: OrderedItem_t[];
  status: "current" | "ordered" | "confirmed" | "finished";
  date: Date;
}

module.exports = { Orders_t, OrderedItems_t };
