import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const StockSchema = new Schema(
  {
    ticker: String, 
    price: [
      {
        date: String,
        v: Number,
        o: Number,
        c: Number,
        h: Number,
        l: Number,
      }
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;