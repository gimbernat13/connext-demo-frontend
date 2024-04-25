import { Suspense } from "react";
import Volume from "./volume";
import Link from "next/link";
import Image from "next/image";
import pepe from "../../../public/download.gif";

export default function Page({ params }: { params: { date: string } }) {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  }

  const getDateDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatDate(date);
  };

  const isActive = (days: number) => {
    return params.date === getDateDaysAgo(days);
  };

  return (
<div className="container mx-auto max-w-6xl p-4 my-8 bg-[rgba(0,255,0,0.08)] border-2 border-green-700 rounded-md">
      <div className="flex justify-between items-top">
        <div>
          <h1 className='text-lg font-bold text-white'>Volume</h1>
          <p className="text-sm text-gray-400">Transfer volume by day</p>
          <br />
        </div>
        <div className="flex gap-2">
          {[7, 15, 30, 90, 365, 600].map((days) => (
            <Link href={`/volume/${getDateDaysAgo(days)}`} key={days}>
              <div className={`text-xs bg-gray-800 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded cursor-pointer ${isActive(days) ? "ring-2 ring-green-500" : ""}`}>
                {days} Days
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Suspense fallback={
        <div style={{ height: "500px" }} className="flex flex-col justify-center items-center ">
          <Image height={300} width={300} src={pepe} alt="Loading..." />
          <p className="text-sm text-white">Loading...</p>

        </div>}>
        <Volume date={params.date} />
      </Suspense>
    </div>
  );
}
