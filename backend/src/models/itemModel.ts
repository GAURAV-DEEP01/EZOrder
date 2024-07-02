import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
  soldQuantity: { type: Number, required: true },
  image: { type: String, required: true },
})

module.exports = mongoose.model('Items', itemSchema)
