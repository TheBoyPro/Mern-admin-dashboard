const mongoose = require("mongoose");
const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: {
      type: Number,
      require: true,
    },
    yearlySalesTotal: {
      type: Number,
      require: true,
    },
    yearlyTotalSoldUnits: {
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
    dailyData: [{
      date: String,
      totalSales: Number,
      totalUnits: Number,
    }],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

module.exports = OverallStat;
