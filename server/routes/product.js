import express from "express";
import Product from "../models/Product.js";


const router = express.Router();

router.get("/products", async (req,res) => {
    try{
        const products = await Product.find();

        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}


        res.status(200).json(products);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;