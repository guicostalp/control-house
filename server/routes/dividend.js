import express from "express";
import Dividend from "../models/Dividend.js";


const router = express.Router();

router.get("/dividends", async (req,res) => {
    try{
        const dividends = await Dividend.find();

        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}
        const count = await Dividend.countDocuments();
        //console.log("Dividends:", {dividends});        
        console.log("Total documents in Dividends:", count);


        res.status(200).json(dividends);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;