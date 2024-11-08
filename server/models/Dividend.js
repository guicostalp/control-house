import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


const Schema = mongoose.Schema;
loadType(mongoose);

const DividendSchema = new Schema(
  {
    ticker: String, 
    dividend: [
      {
        cash_amount: Number,
        currency: String,
        declaration_date: String,
        dividend_type: String,
        ex_dividend_date: String,
        frequency: Number,
        id: String,
        pay_date: String,
        record_date: String
      }
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Dividend = mongoose.model("Dividend", DividendSchema);

export default Dividend;