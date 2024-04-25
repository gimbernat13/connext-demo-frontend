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
    <>
      <h1 className='p-4 text-4xl text-center'>Connext Daily Transfers</h1>

      <div className="flex gap-2 my-4 justify-center">
        {[7, 15, 30, 90, 365, 600].map((days) => (
          <Link href={`/volume/${getDateDaysAgo(days)}`} key={days}>
            <div className={`bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer ${isActive(days) ? "ring-2 ring-white" : ""}`}>
              {days} Days
            </div>
          </Link>
        ))}
      </div>

      <Suspense fallback={
      <div className="flex flex-col items-center">
        <p>Fetching Data...</p>
        <Image src={pepe} alt="Loading..." />
      </div>}>
        <Volume date={params.date} />
      </Suspense>
    </>
  );
}
