import { Document } from "mongoose";
interface OrderedItems {
  itemId: string;
  quantity: number;
}

interface Orders_t extends Document {
  orderNo: Number;
  items: OrderedItems[];
  status: "current" | "ordered" | "confirmed" | "finished";
  date: Date;
}
