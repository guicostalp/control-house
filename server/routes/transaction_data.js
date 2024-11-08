import express from "express";
import Transactions from "../models/Transactions.js"


const router = express.Router();

router.post('/submit', async (req, res) => {
  const transactionData = req.body;
  console.log('Received transaction data:', transactionData);

  try {
    // Check if the ticker already exists in the database
    let existingTransaction = await Transactions.findOne({ ticker: transactionData.ticker });
    if (existingTransaction) {
      console.log("Ticker already exists")
      // If it exists, push the new transaction to the transaction array
      existingTransaction.transaction.push({
        type: transactionData.type,
        date: transactionData.date,
        nzdInput: transactionData.nzdInput,
        grossAmount: transactionData.grossAmount,
        costs: transactionData.costs,
        qty: transactionData.qty,
        price: transactionData.price,
        dy: transactionData.dy,
      });

      await existingTransaction.save();
    } else {
      // Create a new document with the transaction data
      const newTransaction = new Transactions({
        ticker: transactionData.ticker,
        transaction: [{
          type: transactionData.type,
          date: transactionData.date,
          nzdInput: transactionData.nzdInput,
          grossAmount: transactionData.grossAmount,
          costs: transactionData.costs,
          qty: transactionData.qty,
          price: transactionData.price,
          dy: transactionData.dy,
        }]
      });
    // Save the new document in the collection
    await newTransaction.save();      
    }


      res.status(200).json({ message: 'Transaction submitted successfully' });
  } catch (error) {
      console.error('Error saving transaction:', error);
      res.status(500).json({ message: 'Error saving transaction' });
  }
  });

export default router;