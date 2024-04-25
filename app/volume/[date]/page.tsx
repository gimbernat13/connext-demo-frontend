import { Suspense } from "react";
import Volume from "./volume";
import Link from "next/link";

export default function Page({ params }: { params: { date: string } }) {
  // Helper function to format the date as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  }

  // Calculate dates for 7, 15, 30, and 90 days back
  const getDateDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatDate(date);
  };

  return (
    <>
      <h1 className='p-4 text-xl text-center'>Connext Daily Transfers</h1>

      <div className="flex gap-2 my-4">
        <Link href={`/volume/${getDateDaysAgo(7)}`}>
          <div className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer">
            7 Days
          </div>
        </Link>
        <Link href={`/volume/${getDateDaysAgo(15)}`}>
          <div className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer">
            15 Days
          </div>
        </Link>
        <Link href={`/volume/${getDateDaysAgo(30)}`}>
          <div className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer">
            30 Days
          </div>
        </Link>
        <Link href={`/volume/${getDateDaysAgo(90)}`}>
          <div className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer">
            90 Days
          </div>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Volume date={params.date} />
      </Suspense>
    </>
  );
}
