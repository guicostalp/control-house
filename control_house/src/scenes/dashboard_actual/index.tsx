
import { Box, useMediaQuery } from '@mui/material';
import Section1_Actual from './Section1_Actual';
import Section2_Actual from './Section2_Actual';
import Section3_Actual from './Section3_Actual';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';


// RESPOSIVENESS
const gridTemplateLargeScreens = `
    "header header header"
    "a b c"    
    "a b c"
    "a b c"
    "a e f"
    "d e f"
    "d h f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`;
const gridTemplateSmallScreens = `
    
    "header"
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
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"    
`;

// RETURN
const DashboardActual = () => {
    // Manage Responsiveness
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
    
    // Manage States from Header selections
    const [selected, setSelected] = useState<string>('VOO'); // Set Default State to 'VOO'

    // Callback function to update state
    const handleSelectedChange = (newSelected: string) => {
        setSelected(newSelected);
    };
    useEffect(() => {
        console.log('Dashboard: Current selected state:', selected);
      }, [selected]); // This will log the state whenever 'selected' changes


  return (
    <>
  
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
            {/* Any new object should be mapped on the Grid Template area */}
            <Header gridArea="header" selected={selected} onSelectedChange={handleSelectedChange}/>
            <Section1_Actual selected={selected}/>
            <Section2_Actual selected={selected}/>
            <Section3_Actual selected={selected}/>  

        
        </Box>
    </>
  )
};

export default DashboardActual;