import express from "express";
import News from "../models/News.js";


const router = express.Router();

router.get("/news", async (req,res) => {
    try{
        const news = await News.find();

        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}
        const count = await News.countDocuments();
        //console.log("Dividends:", {news});        
        console.log("Total documents in News:", count);


        res.status(200).json(news);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;