const {
    Schema,
    model
  } = require("mongoose");

  const InvoiceItemSchema = new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    productname:{
        type:String,
    },
    priceatthattime:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
    lineTotal:{
        type:Number,
    },
  })
  
  const InvoiceSchema = new Schema({
    invoicenumber:{
        type: String,
        required: true,
        unique: true,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
      },
    items: [InvoiceItemSchema],
    subtotal: Number,
    gst: Number,
    total: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const InvoiceModel = model("invoice", InvoiceSchema)
  
  module.exports = InvoiceModel