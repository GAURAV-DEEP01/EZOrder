import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  orderNo: { type: Number, default: 99 },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["current", "ordered", "confirmed", "finished"],
    default: "ordered",
  },
  date: { type: Date, required: true },
});

const Orders = mongoose.model("Orders", OrderSchema);
export default Orders;
