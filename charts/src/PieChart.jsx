import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const App = () => {
  const [selectedIndices, setSelectedIndices] = useState(new Set()); 

  const data = [
    { name: 'Mercedes', students: 400, details: {
        sKlasse: 150,
        cKlasse: 75,
        gKlasse: 25,
        vKlasse: 50,
        aKlasse: 100
    }},
    { name: 'BMW', students: 700, details: {
        einser: 400,
        vierer: 200,
        siebener: 100
    }},
    { name: 'Volvo', students: 200, details: {
        xc60: 100,
        xc90: 50,
        xc40: 50
    } },
    { name: 'VW', students: 1000, details: {
        golf: 500,
        polo: 300,
        tiguan: 100,
        tuareq: 100
    } },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const onPieClick = (index) => {
    const newIndices = new Set(selectedIndices);
    if (newIndices.has(index)) {
      newIndices.delete(index);
    } else {
      newIndices.add(index);
    }
    setSelectedIndices(newIndices);
  };

  const getStackedBarChartData = () => {
    const chartData = {};


    Array.from(selectedIndices).forEach(index => {
      const brandData = data[index].details;
      Object.keys(brandData).forEach(key => {
        if (!chartData[key]) {
          chartData[key] = { name: key };
        }
        chartData[key][data[index].name] = brandData[key]; 
      });
    });

    return Object.values(chartData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="students"
          outerRadius={150}
          fill="green"
          onClick={(e, index) => onPieClick(index)} 
          style={{ cursor: 'pointer', outline: 'none' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>

      {selectedIndices.size > 0 && ( 
        <BarChart
          width={600}
          height={400}
          data={getStackedBarChartData()} 
          style={{ marginTop: '20px' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {Array.from(selectedIndices).map((index) => (
            <Bar
              key={`bar-${index}`}
              dataKey={data[index].name} 
              stackId="a" 
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </BarChart>
      )}
    </div>
  );
};

export default App;
