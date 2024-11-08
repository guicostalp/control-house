import express from "express";
import KPI from "../models/KPI.js";


const router = express.Router();

router.get("/kpis", async (req,res) => {
    try{
        const kpis = await KPI.find();


        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}


        res.status(200).json(kpis);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;