import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';

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

const CropBarChart: React.FC = () => {
  // State to hold the processed data
  const [data, setData] = useState<AverageData[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

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

  // Function to render the chart
  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const myChart = echarts.init(chartRef.current);
      const chartOptions = {
        title: {
          text: 'Average Yield of Crops (1950-2020)',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: data.map(item => item.cropName),
          axisLabel: {
            rotate: 45,
            interval: 0,
            
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: data.map(item => item.avgYield),
          },
        ],
      };
      myChart.setOption(chartOptions);
    }
  }, [data]);

  // Display a loading message while data is being fetched
  if (!data.length) {
    return <div>Loading...</div>;
  }

  // Render the chart container
  return <div ref={chartRef} style={{ width: '481px', height: '400px' }}></div>;
};

export default CropBarChart;
