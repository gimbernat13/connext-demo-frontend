import VolumeChart from "../../components/VolumeChart/VolumeChart";

async function getData(date: string) {
const res = await fetch(`https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.${date}`);
// const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-04-19');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

export default async function Volume({ date }) {
  const data = await getData(date);

  console.log("date" , date)
  console.log("dataa" , data)


  return (
    <main>
      {data && <VolumeChart data={data} />}
    </main>
  );
}
// const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-04-19');
// const res = await fetch(`https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.${date}`);
