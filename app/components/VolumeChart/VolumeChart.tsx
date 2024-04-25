"use client"

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps
} from 'recharts';

const chainDetails = {
  '6648936': { color: '#ff6384', name: 'Ethereum Mainnet' },
  '1886350457': { color: '#36a2eb', name: 'Polygon' },
  '1869640809': { color: '#cc65fe', name: 'Optimism' },
  '1634886255': { color: '#ffce56', name: 'Arbitrum One' },
  '6778479': { color: '#4bc0c0', name: 'Gnosis Chain' },
  '6450786': { color: '#7e57c2', name: 'BNB Chain' },
  '1818848877': { color: '#42a5f5', name: 'Linea' },
  '1835365481': { color: '#26a69a', name: 'Metis' },
  '1650553709': { color: '#ec407a', name: 'Base' }
};

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 bg-opacity-75 text-white text-xs p-2 rounded">
        <p>{`Date: ${label}`}</p>
        <p>{`Chain: ${payload[0].name || 'Unknown Chain'}`}</p>
        <p>{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

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

function VolumeChart({ data }) {
  const transformedData = transformData(data);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h1>Daily Transfer Metrics</h1>
      <ResponsiveContainer>
        <BarChart
          data={transformedData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
