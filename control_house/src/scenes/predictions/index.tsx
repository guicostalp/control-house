import { Box, useMediaQuery } from '@mui/material';
import Button from '@/components/Button'
import { useGetStocksQuery } from '@/state/home_api';



// RESPOSIVENESS
const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`;
const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"    
`;

// RETURN
const Predictions = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")

    const { data, refetch } = useGetStocksQuery();  
  
    const handleClick = async () => {
      try {
        // Trigger refetching of the data
        await refetch();
        if (data && data.length > 0) {
          // Assuming data[0] is an object with a 'price' property
          const tickers = data[0];
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
     

  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
        sx={
            isAboveMediumScreens ? {
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateRows: "repeat(10, minmax(60px,1fr))",
            gridTemplateAreas: gridTemplateLargeScreens,
        } : {
            gridAutoColumns: "1fr",
            gridAutoRows: "80px",
            gridTemplateAreas: gridTemplateSmallScreens,
        }
    }
    >

    <Button onClick={handleClick} label="Click Me" />
 
    </Box>
  )
};

export default Predictions;