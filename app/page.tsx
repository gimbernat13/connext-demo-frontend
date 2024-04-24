import Image from "next/image";
import {TransfersDisplay} from "./components/VolumeChart/VolumeChart"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TransfersDisplay />
    </main>
  );
}
