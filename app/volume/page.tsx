import { Suspense } from "react";
import Volume from "./volume";
import { ChartProvider } from "../components/VolumeChart/ChartContext";


export default async function Page() {
    return (
        <main>
            <ChartProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Volume />
                </Suspense>
            </ChartProvider>
        </main>
    );
}
