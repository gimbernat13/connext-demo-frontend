import { useChart } from "../components/VolumeChart/ChartContext";
import VolumeChart from "../components/VolumeChart/VolumeChart";

async function getData(date: string) {
    const res = await fetch(`https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.${date}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  }
  
export default async function Volume() {
    const { selectedDate } = useChart();
    const data = await getData(selectedDate);

    return (
        <main>
            {data && <VolumeChart data={data} />}
        </main>
    );
}
