import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import NewsCard from '@/components/NewsCard'
import { useGetNewsQuery, useGetTransactionsInputQuery } from '@/state/home_api';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useEffect, useMemo } from 'react';




interface Section3_ActualProps {
  selected: string;
}

const Section3_Actual: React.FC<Section3_ActualProps> = ({selected}) => {

  //
  //         TO DO
  // Use props to send all data 
  // retrieved from the API calls
  // via props to react components
  //
  const { palette } = useTheme();
  const { data: newsData} = useGetNewsQuery();
  const { data: transactionsData} = useGetTransactionsInputQuery();

  // Get ticker PORTFOLIO data based on Selection (State)
  const tickerTransactions = useMemo(() => {
    return transactionsData ? transactionsData.find(item => item.ticker === selected) : undefined;
  }, [transactionsData, selected]);

  // Get ticker PORTFOLIO data based on Selection (State)
  const tickerNews = useMemo(() => {
    return newsData ? newsData.find(item => item.ticker === selected) : undefined;
  }, [newsData, selected]);


  const newsCard = useMemo(() => {
    if (!tickerNews || !tickerNews.news) {
      return [];
    }
    // Slice the first 15 elements
    const filteredNews = tickerNews.news.slice(0, 6);
    return filteredNews
  },[tickerNews])

  // Define columns
  const transactionsColumns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "date", headerName: "Date", flex: 1, renderCell: (params: GridCellParams) => `${String(params.value).substring(8, 10)
                                                                                              +String(params.value).substring(7, 8)
                                                                                              +String(params.value).substring(5, 7)
                                                                                              +String(params.value).substring(7, 8)
                                                                                              +String(params.value).substring(2, 4)}` },
    { field: "nzdInput", headerName: "NZD Input", flex: 1, renderCell: (params: GridCellParams) => `$${Number(params.value).toFixed(2)}` },
    { field: "grossAmount", headerName: "Gross Amount", flex: 1, renderCell: (params: GridCellParams) => `$${Number(params.value).toFixed(2)}` },
    { field: "costs", headerName: "Costs", flex: 1, renderCell: (params: GridCellParams) => `$${Number(params.value).toFixed(2)}` },
    { field: "qty", headerName: "Quantity", flex: 1, renderCell: (params: GridCellParams) => `${Number(params.value).toFixed(2)}` },
    { field: "price", headerName: "Price", flex: 1, renderCell: (params: GridCellParams) => `$${Number(params.value).toFixed(2)}` },
    { field: "dy", headerName: "DY", flex: 1, renderCell: (params: GridCellParams) => `${Number(params.value)}%` }
  ];

  // Memoize rows
  const rows = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return [];
    }
    return tickerTransactions.transaction.map((item) => ({
      id: item.type,  // DataGrid requires a unique 'id' field for each row
      ...item
    })).reverse();
  }, [tickerTransactions]);

  const transactionsTable = useMemo(() => {
    if (!tickerTransactions || !tickerTransactions.transaction) {
      return [];
    }
    
    const data = tickerTransactions.transaction;
    return data
  },[tickerTransactions])

   // useEffect to capture changes and interactions on the frontend
   useEffect(() => {
    console.log('Section3: Current selected state:', selected);

    console.log({transactionsTable});
    console.log({tickerNews});
    console.log({newsCard});
  }, [selected, tickerNews, newsCard, transactionsTable]); // This will log the state whenever 'selected' changes

  return (
    <>

      {/* PRODUCTS TABLE */}    
      <DashboardBox gridArea="g">
        <BoxHeader
                title="Transactions"
                subtitle="Build transactions table here"
                sideText='4%'
              />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={rows || []}
            columns={transactionsColumns}
          />
        </Box> 
      </DashboardBox>

      {/* RECENT ORDER TABLE */}
      <DashboardBox gridArea="h" style={{ overflow: 'hidden' }}> 
        <BoxHeader
              title="News"
              subtitle="Build news box element"
              sideText='4%'
            />
        <NewsCard />  
      </DashboardBox>

      {/* PIER CHARTS */}     
      <DashboardBox gridArea="i">
        <BoxHeader
                  title="Segment Analysis"
                  subtitle="Transform data"
                  sideText='4%'
                />
      </DashboardBox>


      {/* OVERALL SUMMARY */}
      <DashboardBox gridArea="j">
        <BoxHeader
                title="AI Comment - Possible chat in the future"
                subtitle="Generate with python script on server and on demands"
                sideText='4%'
              />

      </DashboardBox> 

    </>
  )
}

export default Section3_Actual