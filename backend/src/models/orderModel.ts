import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderNo : { type: Number, require : true },
  items : [{
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {type : Number, require: true}
  }],
  status: {
    type: String,
    enum: ["current","ordered", "confirmed", "finished"],
    default: "ordered"
  },
  date: {type : Date, require : true}
})

module.exports = mongoose.model('Orders', OrderSchema);
