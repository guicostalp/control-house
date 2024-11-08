import {  useGetTransactionsInputQuery, useSubmitTransactionMutation } from '@/state/home_api';
import React, { useEffect, useMemo, useState } from 'react';

// Define the prop types
interface TransactionFormProps {
  closeModal: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({closeModal}) => {
  const { data: transactionsData} = useGetTransactionsInputQuery();
  const [triggerGetTransactions] = useSubmitTransactionMutation();

  // Set States
  const [netAmount, setNetAmount] = useState(0);
  const [dividendYield, setDividendYield] = useState(0);  
  const [ticker, setTicker] = useState('');
  const [formValues, setFormValues] = useState({
    ticker: '',
    type: 'BUY',
    date: '',
    nzdInput: 0,
    grossAmount: 0,
    costs: 0,
    qty: 0,
    price: 0,
    dy: 0,
  });  

  // Get ticker data based on Selection (State)
  const tickerTransactions = useMemo(() => {
    return transactionsData ? transactionsData.find(item => item.ticker === ticker) : undefined;
  }, [transactionsData, ticker]);


  const holdings = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
      
    // Sum Qty
    const sum = tickerTransactions.transaction
      .filter(({ type }) => type === "BUY")
      .reduce((sum, { qty }) => sum + qty, 0);

    // Round the result to two decimal places
    return parseFloat(sum.toFixed(2));      
      
  }, [tickerTransactions]);
     
  // Memoized calculation of weighted average price
  const weightedAveragePrice = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
    const transactions = tickerTransactions.transaction;

    // Calculate the weighted sum and total quantity
    const weightedSum = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'BUY') {  // Only consider 'BUY' transactions
        return acc + (transaction.price * transaction.qty);
      }
      return acc;
    }, 0);

    const totalQty = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'BUY') {  // Only consider 'BUY' transactions
        return acc + transaction.qty;
      }
      return acc;
    }, 0);

    // Calculate and return the weighted average price
    return totalQty > 0 ? parseFloat((weightedSum / totalQty).toFixed(2)) : 0;
  }, [tickerTransactions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Only update the state if the input name is 'ticker'
    if (name === 'ticker') {
      setTicker(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use the trigger function to send the form data
      await triggerGetTransactions(formValues).unwrap();
        console.log('Form submitted successfully');
    } catch (error) {
        console.error('Error submitting form:', error);
    }

    // Close the modal after a successful form submission
    closeModal();

    // Refresh the webpage
    window.location.reload();

  };
  
  useEffect(() => {
    
    if (formValues.type === 'DIVIDEND') {
      // Update formValues with the updated dividend yield
      setFormValues(prevValues => ({
        ...prevValues,
        dy: parseFloat((dividendYield).toFixed(3)),  // Set dy to the current dividendYield
      }));
    }
  }, [dividendYield, formValues.type]); // This will run whenever dividendYield is updated
  

  // Calculate values based on form inputs and selection
  useEffect(() => {
    const { type, qty, price, grossAmount, costs } = formValues;

    console.log({dividendYield});

    console.log({formValues});


    
    if (type === 'BUY') {
      // Net Amount for BUY
      setNetAmount(Number(qty) * Number(price));
    } else {
      // Net Amount for BUY
      if (formValues.type === 'DIVIDEND' && formValues.qty !== holdings) {
        setFormValues(prevValues => ({
          ...prevValues,
          qty: holdings,
          price: weightedAveragePrice,
          //dy: dividendYield
        }));
      }

      // Net Dividend for DIVIDEND
      const netDividend = Number(grossAmount) - Number(costs);
      setNetAmount(netDividend);

      // Net Dividend per Share
      if (Number(qty) > 0) {
        setDividendYield((netDividend / (Number(qty)*Number(weightedAveragePrice)))*100);
      } else {
        setDividendYield(0);
      }
      
    }

    
  }, [formValues,holdings,weightedAveragePrice, dividendYield]);



  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="ticker">Ticker:</label>
        <input
          type="text"
          id="ticker"
          name="ticker"
          value={formValues.ticker}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formValues.type}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="BUY">BUY</option>
          <option value="DIVIDEND">DIVIDEND</option>
        </select>
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="nzdInput">NZD Input:</label>
        <input
          type="number"
          id="nzdInput"
          name="nzdInput"
          value={formValues.nzdInput}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="grossAmount">Gross Amount:</label>
        <input
          type="number"
          id="grossAmount"
          name="grossAmount"
          value={formValues.grossAmount}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="costs">Costs:</label>
        <input
          type="number"
          id="costs"
          name="costs"
          value={formValues.costs}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>


      {/* Qty*/}
      {formValues.type === 'DIVIDEND' ? (
          <div style={inputGroupStyle}>
            <label htmlFor="quantity">Qty:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={holdings} 
              readOnly
              style={inputStyle}
            />
          </div>
        ) : (
          <div style={inputGroupStyle}>
          <label htmlFor="qty">Qty:</label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={formValues.qty}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        ) }

        {/* Price*/}        
        {formValues.type === 'DIVIDEND' ? (
          <div style={inputGroupStyle}>
            <label htmlFor="averagePrice">Avg Price:</label>
            <input
              type="number"
              id="averagePrice"
              name="averagePrice"
              value={weightedAveragePrice}
              readOnly
              style={inputStyle}
            />
          </div>
        ) : (
          <div style={inputGroupStyle}>
            <label htmlFor="price">Price:</label>
            
            <input
              type="number"
              id="price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        ) }


      {/* Calculated fields */}
      <div style={inputGroupStyle}>
        <label htmlFor="netAmount">
          {formValues.type === 'BUY' ? 'Net Amount:' : 'Net Dividend:'}
        </label>
        <input
          type="text"
          id="netAmount"
          name="netAmount"
          value={netAmount.toFixed(2)}
          readOnly
          style={inputStyle}
        />
      </div>
      {/* Dividend Yield */}
      {formValues.type === 'DIVIDEND' && (
        <div style={inputGroupStyle}>
          <label htmlFor="dividendYield">Dividend Yield</label>
          <input
            type="number"
            id="dividendYield"
            name="dividendYield"
            value={dividendYield.toFixed(2)}
            readOnly
            style={inputStyle}
          />
        </div>
      )}




      <button type="submit" style={submitButtonStyle}>Submit</button>
    </form>
  );
};

// Styles
const formStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '10px',
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const submitButtonStyle: React.CSSProperties = {
  gridColumn: 'span 2',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

export default TransactionForm;
