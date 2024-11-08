import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import Button from '@/components/Button'
import {  ResponsiveContainer, Line, LineChart, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Bar, BarChart } from 'recharts';
import { useGetDividendsQuery, useGetStocksQuery } from '@/state/home_api';
import { useEffect, useMemo  } from 'react';
import { useTheme } from '@mui/material';


interface Section1_ActualProps {
  selected: string;
}

const Section1_Actual: React.FC<Section1_ActualProps> = ({selected}) => {

  //
  //         TO DO
  // Use props to send all data 
  // retrieved from the API calls
  // via props to react components
  //
  const { palette } = useTheme();
  const { data: priceData, refetch } = useGetStocksQuery();
  const { data: dividendData } = useGetDividendsQuery(); // Rename store 'data' received to dividendData
  
  const handleClick = async () => {
    try {
      // Trigger refetching of the data
      await refetch();
      if (priceData && priceData.length > 0) {
        // Assuming data[0] is an object with a 'price' property
        const tickers = priceData[0];
        const formattedData = JSON.stringify(tickers, null, 2);
        alert(`Tickers: ${formattedData}`);
      } else {
        alert('No data available');
      }
    } catch (error) {
      console.error('Error refetching data:', error);
      alert('Failed to fetch data');
    }
  };


  // Get ticker PRICE data based on Selection (State)
  const tickerPrice = useMemo(() => {
    return priceData ? priceData.find(item => item.ticker === selected) : undefined;
  }, [priceData, selected]);

  // Get ticker DIVIDEND data based on Selection (State)
  const tickerDividend = useMemo(() => {
    return dividendData ? dividendData.find(item => item.ticker === selected) : undefined;
  }, [dividendData, selected]);


  // Calculate min and max for line chart domain
  const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100;
  };

  const openClosePrice = useMemo(() => {
    if (!tickerPrice || !tickerPrice.price) {
      return [];
    }

    // Slice the last 12 elements
    const priceData = tickerPrice.price.slice(-15);  

    // Map data from tickerPrice
    return priceData.map(({ date, c, l, h }) => {
      return {
        date: date.substring(8, 10) + date.substring(7, 8) + date.substring(5, 7),
        low: l.toFixed(2),
        close: c.toFixed(2),
        high: h.toFixed(2),
      };
    }); // Sort Descending
    

    return priceData
    
    
  }, [tickerPrice])

  
  const dividends = useMemo(() => {
    if (!tickerDividend || !tickerDividend.dividend) {
      return [];
    }
    // Slice the first 15 elements
    const limitedDividends = tickerDividend.dividend.slice(0, 12);
    return limitedDividends.map(({ pay_date, cash_amount }) => {
        return {
          date: pay_date.substring(8, 10)+pay_date.substring(7, 8)+pay_date.substring(5, 7)+pay_date.substring(7, 8)+pay_date.substring(2, 4),
          dividend: cash_amount,
        };
      }).reverse(); // Sort Descending

  }, [tickerDividend]);



  // useEffect to capture changes and interactions on the frontend
  useEffect(() => {
    console.log('Section1: Current selected state:', selected);

    console.log({tickerDividend});
    
    console.log({tickerPrice})
  }, [selected, tickerPrice, tickerDividend]); // This will log the state whenever 'selected' changes

  return (
    <>

      {/* PRICE VS COMPETITORS */}
      <DashboardBox gridArea="a">
        <BoxHeader
                      title="Price vs Competitors"
                      subtitle="Companies from same segment"

                      sideText={`Current: `}
                    />
      </DashboardBox>

      {/* STOCK HIGH LOW CLOSE */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Stock Price - High, Low and Close"
          subtitle="Stock price high, low and close change over the time"
          hotKey={<Button onClick={handleClick} label="Click Me" />}
        />

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={openClosePrice}
            margin={{
              top: 20,
              right: 70,
              left: -10,
              bottom: 55,
            }}
          >
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
                (dataMin: number) => roundToTwoDecimals(dataMin * 0.99), 
                (dataMax: number) => roundToTwoDecimals(dataMax * 1.015)
              ]} 
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="high"
              stroke={palette.primary[700]}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="close"
              stroke={palette.tertiary[500]}
              
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="low"
              stroke={palette.primary[700]}
            />

          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* DIVIDEND YIELD */}
      <DashboardBox gridArea="c">
      <BoxHeader
          title="Dividend Yield"
          subtitle="Stock dividend Yield overtime"
          hotKey={<Button onClick={handleClick} label="Click Me" />}
        />      

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dividends}
            margin={{
              top: 17,
              right: 35,
              left: -5,
              bottom: 58,
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
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="dividend" fill="url(#colorPrice)" />
          </BarChart>
        </ResponsiveContainer>      
      </DashboardBox>
        
    </>
  )
}

export default Section1_Actual