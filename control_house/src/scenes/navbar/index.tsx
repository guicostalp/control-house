import { useState } from 'react';
import { Link } from 'react-router-dom';
import PixIcon from '@mui/icons-material/Pix';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';




const NavBar =  () => {
  const { palette } = useTheme();


  const [selected, setSelected] = useState<string>("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
        {/*LEFT SIDE*/}
        <FlexBetween gap="0.75rem">
            <PixIcon sx={{fontSize: "28px"}} /> 
            <Typography variant="h4" fontSize="16px">
                Finanseer
            </Typography> 
        </FlexBetween>

        {/*RIGHT SIDE*/}
        <FlexBetween gap="2rem">

            {/*DASHBOARD LINK*/}
            <Box sx={{"&:hover": {color: palette.primary[100]}}}>
                <Link
                    to="/"
                    onClick={() => setSelected("dashboard")}
                    style={{
                        color: selected === "dashboard" ? "inherit" : palette.grey[700],
                        textDecoration: "inherit"
                    }}>
                        Dashboard
                </Link>
            </Box>

            {/*DASHBOARD ACTUAL LINK*/}
            <Box sx={{"&:hover": {color: palette.primary[100]}}}>
                <Link
                    to="/dashboard"
                    onClick={() => setSelected("dashboardActual")}
                    style={{
                        color: selected === "dashboardActual" ? "inherit" : palette.grey[700],
                        textDecoration: "inherit"
                    }}>
                        Dashboard Actual
                </Link>
            </Box>

            {/*PREDICTIONS*/}
            <Box sx={{"&:hover": {color: palette.primary[100]}}}>
                <Link
                    to="/predictions"
                    onClick={() => setSelected("predictions")}
                    style={{
                        color: selected === "predictions" ? "inherit" : palette.grey[700],
                        textDecoration: "inherit"
                    }}>
                        Predictions
                </Link>
            </Box>

        </FlexBetween>

    </FlexBetween>);
};
export default NavBar