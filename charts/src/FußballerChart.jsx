import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import Papa from 'papaparse';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#32CD32", "#FFD700"];

const CarCharts = () => {
  const [data, setData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    // CSV-Datei einlesen
    fetch('path/to/your/file.csv')
      .then(response => response.text())
      .then(text => {
        const results = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        // Dynamische Umwandlung in das gewünschte Format
        const formattedData = results.data.map(row => {
          const item = {
            name: row[Object.keys(row)[0]],  // Erster Header als 'name'
            models: Number(row[Object.keys(row)[1]]), // Zweiter Header als 'models'
            details: {},
          };

          // Alle weiteren Spalten als Details hinzufügen
          Object.keys(row).slice(2).forEach(key => {
            item.details[key] = Number(row[key]); // Tore in den Jahren
          });

          return item;
        });

        setData(formattedData);
      });
  }, []);

  // Event-Handler, wenn ein Pie-Segment geklickt wird
  const onPieClick = (brand) => {
    setSelectedBrands((prevBrands) =>
      prevBrands.find((b) => b.name === brand.name)
        ? prevBrands.filter((b) => b.name !== brand.name)
        : [...prevBrands, brand]
    );
  };

  // Dynamisch alle Jahre (Details) aus den ausgewählten Marken extrahieren
  const allKeys = [...new Set(selectedBrands.flatMap(brand => Object.keys(brand.details)))];

  // Formatierung der Daten für den Stacked Bar Chart
  const chartData = selectedBrands.map((brand) => ({
    name: brand.name, 
    ...brand.details, 
  }));

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h3>Pie Chart (Total Models)</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="models"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
            onClick={onPieClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {selectedBrands.length > 0 && (
        <div style={{ marginLeft: 50 }}>
          <h3>Selected Brands Details (Stacked)</h3>
          <BarChart width={400} height={300} data={chartData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Dynamisch die Bars für alle gefundenen Jahre (Details) erstellen */}
            {allKeys.map((key, index) => (
              <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
            ))}
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default CarCharts;
