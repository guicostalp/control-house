import React, { useState, useEffect } from 'react';
import { useGetStocksQuery } from '@/state/home_api'; 

// Define the type for the dropdown options
type Option = {
  value: string;
  label: string;
};

// Define the props for the Dropdown component
interface DropdownProps {
  onChange: (value: string) => void;
  selectedValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange, selectedValue }) => {
  const { data, isLoading, error } = useGetStocksQuery(); // Fetch stock data
  const [selectedOption, setSelectedOption] = useState<string | undefined>(selectedValue);
  const [options, setOptions] = useState<Option[]>([]);

  // Update options when data is fetched
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const mappedOptions = data.map((item: { ticker: string }) => ({
        value: item.ticker,
        label: item.ticker,
      }));
      setOptions(mappedOptions);
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stock data</div>;

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="" disabled>Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
