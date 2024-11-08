import express from "express";
import Transactions from "../models/Transactions.js";


const router = express.Router();

router.get("/get", async (req,res) => {
    try{
        const transactions = await Transactions.find();

        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}
        const count = await Transactions.countDocuments();
        //console.log("Dividends:", {dividends});        
        console.log("Total documents in Transactions:", count);


        res.status(200).json(transactions);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;