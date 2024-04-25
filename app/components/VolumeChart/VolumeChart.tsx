// VolumeChart.js
"use client"
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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

function getChainDetail(chainId, property) {
  const detail = chainDetails[chainId] || { color: '#d3d3d3', name: 'Unknown' }; // Default color for unknown chains
  return detail[property];
}

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

  // Collect all unique origin chains from the data
  const originChains = Array.from(data.reduce((acc, item) => acc.add(item.origin_chain), new Set()));

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
          <Tooltip  formatter={(value, name, props) => [
            `Chain: ${getChainDetail(name, 'name')}`,
            `Count: ${value}`,
            `Date: ${props.payload.transfer_date}`
          ]}/>
          <Legend formatter={(value) => `${getChainDetail(value, 'name')}`} />
          {originChains.map(chain => (
            <Bar key={chain} dataKey={chain} stackId="a" fill={getChainDetail(chain, 'color')} name={getChainDetail(chain, 'name')} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
