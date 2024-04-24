// pages/daily-transfers.js
import React from 'react';

export async function getServerSideProps(contex:any) {
  try {
    const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-03-25');
    const data = await res.json();
    console.log(data);
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };  // Provide default data as empty array
  }
}

function VolumeChart({ data }) {
  // Log the data to see what you're actually getting



  const safeData = Array.isArray(data) ? data : [];

  return (
    <div>
      <h1>Daily Transfer Metrics</h1>
      <ul>
        {safeData.map((item, index) => (
          <li key={index}>
            Date: {item.transfer_date}, Transfers: {item.transfer_count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VolumeChart;
