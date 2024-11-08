import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "@/theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import DashboardActual from "./scenes/dashboard_actual";
import Predictions from "./scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<DashboardActual />}  />
              <Route
                path="/predictions"
                element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;
