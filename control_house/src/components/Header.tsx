//import {  useState, useEffect } from 'react';
import { useEffect } from 'react';
import Dropdown from './Dropdown';
import FlexBetween from './FlexBetween'
import { Box, useTheme  } from '@mui/material'
import AddTransaction from './AddTransaction';

interface HeaderProps {
  selected: string;
  onSelectedChange: (newSelected: string) => void; // Callback function type
  gridArea?: string;
}


const Header: React.FC<HeaderProps> = ({ selected, onSelectedChange }) => {
    const { palette } = useTheme();

    useEffect(() => {
      console.log('Header: Current selected state:', selected);
    }, [selected]); // This will log the state whenever 'selected' changes

    // Handle dropdown change and notify parent
    const handleDropdownChange = (value: string) => {
      onSelectedChange(value); // Notify the parent component about the change
    };


  return (
    <FlexBetween
        color={palette.grey[400]}
        margin="1.5rem 1rem 0 1rem"
    >
        <Box>
            <p>Choose Ticker: {selected}</p>
            <Dropdown
                onChange={handleDropdownChange}
                selectedValue={selected}
      />
        </Box>


      <AddTransaction />
    </FlexBetween>


  )
}

export default Header