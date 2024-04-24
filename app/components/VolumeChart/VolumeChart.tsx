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

function VolumeChart({ data }) {
 
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h1>Daily Transfer Metrics</h1>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="transfer_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="transfer_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
