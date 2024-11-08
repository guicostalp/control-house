import express from "express";
import Portfolio from "../models/Portfolio.js";


const router = express.Router();

router.get("/portfolio", async (req,res) => {
    try{
        const portfolio = await Portfolio.find();

        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}


        res.status(200).json(portfolio);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;