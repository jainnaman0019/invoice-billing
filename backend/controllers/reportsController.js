const invoiceModel = require("../models/InvoiceModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

/* =========================
   TODAY SALES (UTC SAFE)
   ========================= */
const TodaySales = async (req, res) => {
  try {
    const shopId = new mongoose.Types.ObjectId(req.user.shopId);

    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    console.log("Today Start:", start);
    console.log("Today End:", end);

    const invoices = await invoiceModel.find({
      shopId,
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });

    console.log(invoices.length, "invoices found for today");

    const total = invoices.reduce(
      (sum, inv) => sum + (inv.total || 0),
      0
    );

    res.status(200).json({ todaySales: total });
  } catch (error) {
    console.error("TodaySales error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =========================
   LAST 7 DAYS SALES
   ========================= */
const getlastsevendays = async (req, res) => {
  try {
    const shopId = new mongoose.Types.ObjectId(req.user.shopId);

    const start = new Date();
    start.setUTCDate(start.getUTCDate() - 6);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    console.log("7 Days Start:", start);
    console.log("7 Days End:", end);

    const report = await invoiceModel.aggregate([
      {
        $match: {
          shopId,
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          total: { $sum: "$total" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    console.log("Seven Days Report:", report);
    res.status(200).json(report);
  } catch (error) {
    console.error("getlastsevendays error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =========================
   MONTHLY SALES
   ========================= */
const monthlysales = async (req, res) => {
  try {
    const shopId = new mongoose.Types.ObjectId(req.user.shopId);

    const result = await invoiceModel.aggregate([
      { $match: { shopId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$total" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("monthlysales error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =========================
   GET USER NAME
   ========================= */
const getusername = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error("getusername error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  TodaySales,
  getlastsevendays,
  monthlysales,
  getusername,
};
