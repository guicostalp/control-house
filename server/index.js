import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import stockRoutes from "./routes/stock.js"
import dividendRoutes from "./routes/dividend.js"
import portfolioRoutes from "./routes/portfolio.js"
import newsRoutes from "./routes/news.js"
import transaction_dataRoutes from "./routes/transaction_data.js"
import transactions_inputRoutes from "./routes/transactions_input.js"
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import Stock from "./models/Stock.js"
import Portfolio from "./models/Portfolio.js"
import Dividend from "./models/Dividend.js";
import News from "./models/News.js"
import { kpis, products, transactions } from "./data/data.js";
import { stocks } from "./data/price_data.js"
import { dividends } from "./data/dividend_data.js"
import { portfolio } from "./data/portfolio_data.js"
import { news } from "./data/news_data.js"




/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
app.use("/stock", stockRoutes);
app.use("/dividend", dividendRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/news", newsRoutes);
app.use("/transactions", transaction_dataRoutes);
app.use("/transactions", transactions_inputRoutes);

/* PYTHON SCRIPTS */


/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => 
      console.log(`Server Port: ${PORT}`)
    );




    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    //await mongoose.connection.db.dropDatabase(); // DROP ALL DATABASE !!
    //KPI.insertMany(kpis);
    //Product.insertMany(products);
    //Transaction.insertMany(transactions); 
    //Stock.insertMany(stocks)
    //Dividend.insertMany(dividends)
    //Portfolio.insertMany(portfolio)
    //News.insertMany(news)

  })
  .catch((error) => console.log(`${error} did not connect`));