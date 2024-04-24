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

function VolumeChart({ data }) {
  const transformedData = transformData(data);

  // Find all unique origin chains to create dynamic bars
  const originChains = new Set();
  data.forEach(item => originChains.add(item.origin_chain));

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
            `Count: ${value}`,
            `Date: ${props.payload.transfer_date}`
          ]}/>
          <Legend />
          {[...originChains].map(chain => (
            <Bar key={chain} dataKey={chain} stackId="a" fill="#8884d8" name={chain} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;