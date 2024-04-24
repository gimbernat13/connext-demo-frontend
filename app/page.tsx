import VolumeChart from "./components/VolumeChart/VolumeChart";

async function getData() {
  const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2023-03-25');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  console.log('data', data);

  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <VolumeChart data={data} />
    </main>
  );
}
