import mongoose from "mongoose";
import { loadType } from "mongoose-currency";


const Schema = mongoose.Schema;
loadType(mongoose);

const NewsSchema = new Schema(
  {
    ticker: String, 
    news: [
      {
        id: String,
        publisher: {
            name: String,
            homepage_url: String,
            logo_url: String,
            favicon_url: String
        },
        title: String,
        author: String,
        published_utc: String,
        article_url: String,
        tickers: [
            String
        ],
        image_url: String,
        description: String,
        keywords: [
            String
        ],
        insights: [
            {
                ticker: String,
                sentiment: String,
                sentiment_reasoning: String
            }
        ]
      }
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const News = mongoose.model("News", NewsSchema);

export default News;