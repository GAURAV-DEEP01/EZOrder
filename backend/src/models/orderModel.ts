import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderNo: { type: Number, required: true },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
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
