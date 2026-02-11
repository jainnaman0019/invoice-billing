const {
    Schema,
    model
  } = require("mongoose");
  
  const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
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
  
  const CustomerModel = model("test", CustomerSchema)
  
  module.exports = CustomerModel