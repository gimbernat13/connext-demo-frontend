"use client"

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps
} from 'recharts';

const chainDetails = {
  '6648936': { color: '#ff6384', name: 'Ethereum' },
  '1886350457': { color: '#36a2eb', name: 'Polygon' },
  '1869640809': { color: '#cc65fe', name: 'Optimism' },
  '1634886255': { color: '#ffce56', name: 'Arbitrum ' },
  '6778479': { color: '#4bc0c0', name: 'Gnosis' },
  '6450786': { color: '#7e57c2', name: 'BNB' },
  '1818848877': { color: '#42a5f5', name: 'Linea' },
  '1835365481': { color: '#26a69a', name: 'Metis' },
  '1650553709': { color: '#ec407a', name: 'Base' }
};



function transformData(data) {
  const result = [];
  data.forEach(item => {
    let entry = result.find(entry => entry.transfer_date === item.transfer_date);
    if (!entry) {
      entry = { transfer_date: item.transfer_date, chains: {} };
      Object.keys(chainDetails).forEach(chainId => {
        entry.chains[chainId] = { count: 0, color: chainDetails[chainId].color, name: chainDetails[chainId].name };
      });
      result.push(entry);
    }
    if (!entry.chains[item.origin_chain]) {
      const chainInfo = chainDetails[item.origin_chain] || { color: '#d3d3d3', name: 'Unknown' };
      entry.chains[item.origin_chain] = { count: 0, color: chainInfo.color, name: chainInfo.name };
    }
    entry.chains[item.origin_chain].count += item.transfer_count;
  });
  return result;
}
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 bg-opacity-75 text-white p-2 rounded-lg shadow-lg relative text-sm">
        <div className="after:content-[''] after:absolute after:bg-gray-700 after:bg-opacity-75 after:w-3 after:h-3 after:rotate-45 after:-bottom-1.5 after:left-3">
          <p className="label mb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between">
              <span>{entry.name}:</span>
              <span className="font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

function VolumeChart({ data }) {
  const transformedData = transformData(data);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h1>Daily Transfers</h1>
      <ResponsiveContainer>
        <BarChart
          data={transformedData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="transfer_date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {Object.keys(chainDetails).map(chainId => (
            transformedData.some(data => data.chains[chainId].count > 0) &&
            <Bar key={chainId} dataKey={`chains.${chainId}.count`} stackId="a" fill={chainDetails[chainId].color} name={chainDetails[chainId].name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
