const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    cost: {
      type: String,
    },
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction