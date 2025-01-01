
import React, { useEffect, useState } from 'react';
import { Table, Text, useMantineTheme } from '@mantine/core';

// Interface for the CropData type
interface CropData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
}

// Interface for the ProcessedData type
interface ProcessedData {
  Year: string;
  maxProductionCrop: string;
  minProductionCrop: string;
}

const Yeardata: React.FC = () => {
  // State to hold the processed data
  const [data, setData] = useState<ProcessedData[]>([]);
  const theme = useMantineTheme();

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetch('/cropData.json') 
      .then(response => response.json())
      .then((data: CropData[]) => {
        const processedData = processData(data);
        setData(processedData);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  // Function to process the raw data into the format needed for the table
  const processData = (data: CropData[]): ProcessedData[] => {
    const yearMap: { [key: string]: CropData[] } = {};

    // Organize data by year
    data.forEach((crop) => {
      if (!yearMap[crop.Year]) {
        yearMap[crop.Year] = [];
      }
      yearMap[crop.Year].push(crop);
    });

    // Calculate the crop with maximum and minimum production for each year
    const processedData: ProcessedData[] = Object.keys(yearMap).map((year) => {
      const crops = yearMap[year];
      const maxProductionCrop = crops.reduce((max, crop) => crop["Crop Production (UOM:t(Tonnes))"] > max["Crop Production (UOM:t(Tonnes))"] ? crop : max);
      const minProductionCrop = crops.reduce((min, crop) => crop["Crop Production (UOM:t(Tonnes))"] < min["Crop Production (UOM:t(Tonnes))"] ? crop : min);

      // Extract just the year from the full string
      const yearNumber = year.match(/\d{4}/)?.[0] || year;

      return {
        Year: yearNumber,
        maxProductionCrop: maxProductionCrop["Crop Name"],
        minProductionCrop: minProductionCrop["Crop Name"],
      };
    });

    return processedData;
  };

  // Display a loading message while data is being fetched
  if (!data.length) {
    return <Text>Loading...</Text>;
  }

  // Render the table with the processed data
  return (
    <Table striped highlightOnHover style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, background: theme.colors.gray[0] }}>Year</th>
          <th style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, background: theme.colors.gray[0] }}>Crop with Maximum Production</th>
          <th style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, background: theme.colors.gray[0] }}>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.Year}>
            <td style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, textAlign: 'center', verticalAlign: 'middle' }}>{row.Year}</td>
            <td style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, textAlign: 'center', verticalAlign: 'middle' }}>{row.maxProductionCrop}</td>
            <td style={{ width: '33%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, textAlign: 'center', verticalAlign: 'middle' }}>{row.minProductionCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Yeardata;
