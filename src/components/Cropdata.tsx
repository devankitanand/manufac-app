
import React, { useEffect, useState } from 'react';
import { Table, Text, useMantineTheme } from '@mantine/core';

// Interface for the CropData type
interface CropData {
  Year: string;
  "Crop Name": string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string | null;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string | null;
}

// Interface for the AverageData type
interface AverageData {
  cropName: string;
  avgYield: number;
}

const CropAverages: React.FC = () => {
  // State to hold the processed data
  const [data, setData] = useState<AverageData[]>([]);
  const theme = useMantineTheme();

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetch('/cropData.json') 
      .then(response => response.json())
      .then((data: CropData[]) => {
        const averageData = calculateAverages(data);
        setData(averageData);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  // Function to calculate the average yield for each crop
  const calculateAverages = (data: CropData[]): AverageData[] => {
    const cropMap: { [key: string]: { totalYield: number; count: number } } = {};

    // Process each crop data entry
    data.forEach((crop) => {
      const year = parseInt(crop.Year.match(/\d{4}/)?.[0] || '0');
      if (year >= 1950 && year <= 2020) {
        if (!cropMap[crop["Crop Name"]]) {
          cropMap[crop["Crop Name"]] = { totalYield: 0, count: 0 };
        }
        // Parse yield values, treating empty strings as 0
        const yieldValue = parseFloat((crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || '0').toString().trim()) || 0;
        cropMap[crop["Crop Name"]].totalYield += yieldValue;
        cropMap[crop["Crop Name"]].count += 1;
      }
    });

    // Calculate the average yield for each crop
    return Object.keys(cropMap).map(cropName => ({
      cropName,
      avgYield: parseFloat((cropMap[cropName].totalYield / cropMap[cropName].count).toFixed(3)),
    }));
  };

  // Display a loading message while data is being fetched
  if (!data.length) {
    return <Text>Loading...</Text>;
  }

  // Render the table with the calculated averages
  return (
    <Table striped highlightOnHover style={{ borderCollapse: 'collapse', width: '100%', height: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '50%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, background: theme.colors.gray[0], textAlign: 'center', verticalAlign: 'middle' }}>Crop</th>
          <th style={{ width: '50%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, background: theme.colors.gray[0], textAlign: 'center', verticalAlign: 'middle' }}>Average Yield of the Crop between 1950-2020 (Kg/Ha)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.cropName}>
            <td style={{ width: '50%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, textAlign: 'center', verticalAlign: 'middle' }}>{row.cropName}</td>
            <td style={{ width: '50%', border: `1px solid ${theme.colors.gray[5]}`, padding: theme.spacing.xs, textAlign: 'center', verticalAlign: 'middle' }}>{row.avgYield.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CropAverages;
