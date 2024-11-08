import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const TransactionsSchema = new Schema(
  {
    ticker: { type: String, required: true },
    transaction: [
      {
        type: { type: String, enum: ['BUY', 'DIVIDEND'], required: true },
        date: { type: String, required: true },
        nzdInput: { type: Number, required: true },
        grossAmount: { type: Number, required: true },
        costs: { type: Number, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        dy: { type: Number, required: false },
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transactions = mongoose.model("Transactionss", TransactionsSchema);

export default Transactions;