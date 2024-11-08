import express from "express";
import Stock from "../models/Stock.js";
import { exec } from "child_process";


// Function to execute Python script and return the output
function executePythonScript() {
    return new Promise((resolve, reject) => {
        exec("python3 ./python/price_data.py", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                reject(new Error(stderr));
                return;
            }
            
            console.log(`Script output: ${stdout}`);
            resolve(stdout);
        });
    });
}




const router = express.Router();

router.get("/stocks", async (req,res) => {
    try{


        {/* DO THE DATA TRANSFORMATION AND MANIPULATIONS HERE */}
        // const data = await executePythonScript();
        // console.log('Data from python:', data);
    

        const stocks = await Stock.find();
        const count = await Stock.countDocuments();
        //console.log("Dividends:", {stocks});        
        console.log("Total documents in Stocks:", count);

        res.status(200).json(stocks);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
})

export default router;