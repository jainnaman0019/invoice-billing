const mongoose = require("mongoose");

// 1️⃣ Define Schema
const ShopSchema = new mongoose.Schema(
  { shopName:{
        type:String,
        required:true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
    createdAt: {
        type: Date,
        default: Date.now,
      },    
  }
);

// 2️⃣ Create Model
const shop = mongoose.model("Shop", ShopSchema);

// 3️⃣ Export Model
module.exports = shop;
