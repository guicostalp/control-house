import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween';
import KPICard from '@/components/KPICard';
import { useGetDividendsQuery, useGetStocksQuery, useGetTransactionsInputQuery } from '@/state/home_api';
import { Box, useTheme } from '@mui/material'
import { useEffect, useMemo } from 'react';
import { CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer, XAxis, YAxis, Bar, ComposedChart } from 'recharts';

interface Section2_ActualProps {
  selected: string;
}

const Section2_Actual: React.FC<Section2_ActualProps> = ({selected}) => {
  //
  //         TO DO
  // Use props to send all data 
  // retrieved from the API calls
  // via props to react components
  //
  
  const { palette } = useTheme();
  const { data: transactionsData} = useGetTransactionsInputQuery();
  const { data: priceData } = useGetStocksQuery();
  const { data: dividendData } = useGetDividendsQuery();

  // Get ticker PORTFOLIO data based on Selection (State)
  const tickerTransactions = useMemo(() => {
    return transactionsData ? transactionsData.find(item => item.ticker === selected) : undefined;
  }, [transactionsData, selected]);

  const tickerPrice = useMemo(() => {
    const foundTicker = priceData ? priceData.find(item => item.ticker === selected) : undefined;
    if (foundTicker && foundTicker.price.length > 0) {
      const lastPriceRecord = foundTicker.price[foundTicker.price.length - 1];
      const price = lastPriceRecord.c; // Assuming 'c' is the property you need
  
      // Round the number to 2 decimal places
      const roundedPrice = Math.round(price * 100) / 100;
  
      return roundedPrice;
    }
    return undefined;
  }, [priceData, selected]);



  // Calculations
  const nzdInput = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
      
    // Filter the transactions where type is "BUY" and sum their nzdInput
    const sum = tickerTransactions.transaction
      .filter(({ type }) => type === "BUY")
      .reduce((sum, { nzdInput }) => sum + nzdInput, 0);

    // Round the result to two decimal places
    return parseFloat(sum.toFixed(2));      
      
  }, [tickerTransactions]);

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

  const dividendPaid = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
  
    // Calculate sum of grossAmount minus sum of costs
    const { grossAmountSum, costsSum } = tickerTransactions.transaction
      .filter(({ type }) => type === "DIVIDEND")
      .reduce(
        (sums, { grossAmount, costs }) => {
          sums.grossAmountSum += grossAmount || 0;
          sums.costsSum += costs || 0;
          return sums;
        },
        { grossAmountSum: 0, costsSum: 0 }
      );
  
    // Return the result rounded to two decimal places
    return parseFloat((grossAmountSum - costsSum).toFixed(2));
  }, [tickerTransactions]);

  const totalCost = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
  
    // Calculate sum of grossAmount minus sum of costs
    const { costsSum } = tickerTransactions.transaction
      .filter(({ type }) => type === "BUY")
      .reduce(
        (sums, { costs }) => {
          sums.costsSum += costs || 0;
          return sums;
        },
        { costsSum: 0 }
      );
  
    // Return the result rounded to two decimal places
    return parseFloat(costsSum.toFixed(2));
  }, [tickerTransactions]);

  const amountIn = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
  
    // Calculate sum of grossAmount minus sum of costs
    const { grossAmountSum, costsSum } = tickerTransactions.transaction
      .filter(({ type }) => type === "BUY")
      .reduce(
        (sums, { grossAmount, costs }) => {
          sums.grossAmountSum += grossAmount || 0;
          sums.costsSum += costs || 0;
          return sums;
        },
        { grossAmountSum: 0, costsSum: 0}
      );
  
    // Return the result rounded to two decimal places
    return parseFloat((grossAmountSum-costsSum).toFixed(2));
  }, [tickerTransactions]);


  const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100;
  };
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

  const tickerYield = useMemo(() => {

      const foundDividend = dividendData ? dividendData.find(item => item.ticker === selected) : 0;
      if (foundDividend && foundDividend.dividend.length > 0) {
          const lastDividendRecord = foundDividend.dividend[0];
          const dividend = lastDividendRecord.cash_amount;
      


    
        return ((dividend/weightedAveragePrice)*100).toFixed(2)
      
    }
    return 0
  }, [dividendData,weightedAveragePrice, selected]);


  const yieldToDate = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return 0;
    }
      
    // Filter the transactions where type is "BUY" and sum their nzdInput
    const sum = tickerTransactions.transaction
      .filter(({ type }) => type === "DIVIDEND")
      .reduce((sum, { dy }) => sum + dy, 0);

    // Round the result to two decimal places
    return parseFloat(sum.toFixed(2));      
      
  }, [tickerTransactions]);

  const positionGrowth = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return [];
    }
    let accumulatedShares = 0;
    return tickerTransactions.transaction
      .filter((item) => item.type === "BUY")
      .map((item) => {
        accumulatedShares += item.qty;
        return {
          date: item.date,
          Shares: accumulatedShares,
          Price: item.price,
          Qty: item.qty,
        };
      });
  }, [tickerTransactions]);

  const dividendAmountAndYield = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return [];
    }
    let accumulatedAmount = 0;
    let netAmount = 0;
    return tickerTransactions.transaction
      .filter((item) => item.type === "DIVIDEND")
      .map((item) => {
        netAmount = item.grossAmount - item.costs
        accumulatedAmount += netAmount;
        return {
          date: item.date,
          "Net DY": item.dy,
          "Net Amount": netAmount,
          Accumulated: accumulatedAmount,
        };
      });
  }, [tickerTransactions]);

  // useEffect to capture changes and interactions on the frontend
  useEffect(() => {
    console.log('Section2: Current selected state:', selected);

    console.log({tickerTransactions});
    console.log({tickerPrice});
    console.log({dividendAmountAndYield});

  }, [selected, tickerTransactions, dividendAmountAndYield, tickerPrice]); // This will log the state whenever 'selected' changes


  return (
    <>

      {/* OPERATIONAL EXPENSES */}
      <DashboardBox gridArea="d">
      <BoxHeader
                  title="Position Growth at Average Price"
                  subtitle="Scatter plot comparin competitors"
                  sideText='4%'
                />

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={positionGrowth}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 55,
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[
                (dataMin: number) => roundToTwoDecimals(dataMin * 0.9), 
                (dataMax: number) => roundToTwoDecimals(dataMax * 1.1)
              ]} 
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[
                (dataMin: number) => roundToTwoDecimals(dataMin * 0.9), 
                (dataMax: number) => roundToTwoDecimals(dataMax * 1.1)
              ]} 
            />
            {/* Y-axis for Qty (on the left for bars) */}
            <YAxis
              yAxisId="qty"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, (dataMax: number) => roundToTwoDecimals(dataMax * 1.5)]} 
            />
            <Tooltip />
            <Legend

              height={20}
              align="right"
              verticalAlign="top"
              layout="vertical"
              wrapperStyle={{
                margin: "0 -10px 10px 0",
              }}
            />
            {/* Bar for Qty */}
            <Bar
              yAxisId="qty"
              dataKey="Qty"
              name="Quantity"
              fill="url(#colorPrice)"
              barSize={45} // Increase size for testing visibility
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Shares"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Price"
              stroke={palette.primary[700]}
            />


          </ComposedChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* PIE CHART AND TEXTS*/}
      <DashboardBox gridArea="e" >
        <BoxHeader
                    title="Current Price and Indicators"
                    subtitle="Build scrapper to get data like P/VP"
                    sideText='4%'
                  />
        <Box display="flex" flexDirection="column" gap="10px">
          <FlexBetween style={{color:"white", margin:"10px", gap:"10px"}}>
            <KPICard
                title="Current Price"
                value={`$${tickerPrice}`}
                />
            <KPICard
                title="Average Price"
                value={`$${weightedAveragePrice}`}
                />
            <KPICard
                title="Change %"
                value={`${tickerPrice ? (((tickerPrice / weightedAveragePrice) - 1) * 100).toFixed(2) : '0'}%`}
                />

            <KPICard
                title="Market Value"
                value={`${tickerPrice ? `$${parseFloat((holdings*tickerPrice).toFixed(2))}` : '0'}`}/>
            <KPICard
                title="Amount in"
                value={`$${amountIn}`}/>

            <KPICard
                title="NZD Input"
                value={`$${nzdInput}`}/>

          </FlexBetween>

          <FlexBetween style={{color:"white", margin:"10px", gap:"10px"}}>
            <KPICard
                title="Holdings"
                value={holdings}/>
            <KPICard
                title="Yield on Cost"
                value= {`${tickerYield}%`}
                />
            <KPICard
                title="Yield to Date"
                value={`${yieldToDate}%`}/>
            <KPICard
                title="Dividend Paid"
                value={`$${dividendPaid}`}/>
            <KPICard
                title="Costs"
                value={`$${totalCost}`}/>
            <KPICard
                title="ROI"
                value={`${tickerPrice ? ((((tickerPrice / weightedAveragePrice) - 1) * 100) + yieldToDate).toFixed(2) : '0'}%`}/>

          </FlexBetween>
        </Box>
      </DashboardBox>

      {/* SCATTERED CHART */}
      <DashboardBox gridArea="f">
      <BoxHeader
                      title="Dividend Amount and Yield"
                      subtitle="It adjusts the moving average based on how much prices fluctuate"
                      sideText='4%'
                    />

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={dividendAmountAndYield}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 55,
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[
                (dataMin: number) => roundToTwoDecimals(dataMin * 0.9), 
                (dataMax: number) => roundToTwoDecimals(dataMax * 1.1)
              ]} 
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[
                (dataMin: number) => roundToTwoDecimals(dataMin * 0.9), 
                (dataMax: number) => roundToTwoDecimals(dataMax * 1.1)
              ]} 
            />
            {/* Y-axis for Qty (on the left for bars) */}
            <YAxis
              yAxisId="qty"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[0, (dataMax: number) => roundToTwoDecimals( dataMax * 1.5)]} 
            />
            <Tooltip />
            <Legend

              height={20}
              align="right"
              verticalAlign="top"
              layout="vertical"
              wrapperStyle={{
                margin: "0 -10px 10px 0",
              }}
            />
            {/* Bar for Qty */}
            <Bar
              yAxisId="qty"
              dataKey="Net Amount"
              fill="url(#colorPrice)"
              barSize={45} // Increase size for testing visibility
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Net DY"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Accumulated"
              stroke={palette.primary[700]}
            />


          </ComposedChart>
        </ResponsiveContainer>


      </DashboardBox>
      
    </>
  )
}

export default Section2_Actual

