const mongoose = require("mongoose");

// 1️⃣ Define Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user",
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },    
  }
);

// 2️⃣ Create Model
const user = mongoose.model("User", UserSchema);

// 3️⃣ Export Model
module.exports = user;
