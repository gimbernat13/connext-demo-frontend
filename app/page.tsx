// This is a server component in Next.js
async function getData() {
  const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-03-25');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  console.log('data', data); // Log the JSON data here

  return data;
}

export default async function Page() {
  const data = await getData();

  // Render your data within the component
  return (
    <main>
      {/* Render your data here */}
      {data.map((item, index) => (
        <div key={index}>
          {/* Render the item properties you want to display */}
        </div>
      ))}
    </main>
  );
}
