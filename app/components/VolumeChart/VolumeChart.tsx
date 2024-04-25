"use client"

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const chainDetails = {
  '6648936': { color: "blue", name: 'Ethereum' },
  '1886350457': { color: '#8247e5', name: 'Polygon' },
  '1869640809': { color: '#ff0420', name: 'Optimism' },
  '1634886255': { color: '#28a0f0', name: 'Arbitrum' },
  '6778479': { color: '#00d395', name: 'Gnosis' },
  '6450786': { color: '#f3ba2f', name: 'BNB' },
  '1818848877': { color: 'green', name: 'Linea' },
  '1835365481': { color: '#0f3057', name: 'Metis' },
  '1650553709': { color: '#c1d72e', name: 'Base' }
};




function transformData(data) {
  const result: any[] = [];
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
      <div className="bg-gray-700  bg-opacity-75 text-white p-10 rounded-lg shadow-lg relative text-sm">
        <div>
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
      <h1 className='p-4 text-lg text-center'>Connext Daily Transfers</h1>
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
