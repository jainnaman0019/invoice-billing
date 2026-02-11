const {
    Schema,
    model
  } = require("mongoose");
  
  const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const ProductModel = model("product", ProductSchema)
  
  module.exports = ProductModel