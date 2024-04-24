"use client"

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
function transformData(data) {
  const result = [];
  data.forEach(item => {
    let entry = result.find(entry => entry.transfer_date === item.transfer_date);
    if (!entry) {
      entry = { transfer_date: item.transfer_date };
      result.push(entry);
    }
    entry[item.origin_chain] = (entry[item.origin_chain] || 0) + item.transfer_count;
  });
  return result;
}
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function VolumeChart({ data }) {
  const transformedData = transformData(data);

  // Dynamically collect all unique origin chains
  const originChains = Array.from(data.reduce((acc, item) => acc.add(item.origin_chain), new Set()));

  // Assign colors dynamically if not predefined
  const chainColors = originChains.reduce((acc, chain) => {
    acc[chain] = acc[chain] || generateRandomColor(); // Assign a random color if not already assigned
    return acc;
  }, {});

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h1>Daily Transfer Metrics</h1>
      <ResponsiveContainer>
        <BarChart
          data={transformedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="transfer_date" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [
            `Chain: ${name}`,
            `Count: ${value}`,
            `Date: ${props.payload.transfer_date}`
          ]}/>
          <Legend />
          {originChains.map(chain => (
            <Bar key={chain} dataKey={chain} stackId="a" fill={chainColors[chain]} name={chain} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
