import VolumeChart from "../components/VolumeChart/VolumeChart";

async function getData() {
    const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-03-25');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
}

export default async function Volume() {
    const data = await getData();

    return (
        <main>
            {data && <VolumeChart data={data} />}
        </main>
    );
}
