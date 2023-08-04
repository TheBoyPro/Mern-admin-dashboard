const mongoose = require("mongoose");
const ProductStatSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    yearlySalesTotal: {
      type: Number,
    },
    yearlyTotalSalesUnits: {
      type: Number,
    },
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductsStat = mongoose.model("ProductsStat", ProductStatSchema);

module.exports = ProductsStat;
