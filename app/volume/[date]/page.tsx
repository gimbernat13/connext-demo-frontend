import { Suspense } from "react";
import Volume from "./volume";
import Link from "next/link";
import pepe from "../../../public/download.gif"
import Image from "next/image";
export default function Page({ params }: { params: { date: string } }) {
  const formatDate = (date : Date) => {
    return date.toISOString().split('T')[0];
  }

  const getDateDaysAgo = (days : number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatDate(date);
  };

  return (
    <>
      <h1 className='p-4 text-4xl text-center'>Connext Daily Transfers</h1>

      <div className="flex gap-2 my-4 justify-center">
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
        <Link href={`/volume/${getDateDaysAgo(365)}`}>
          <div className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm cursor-pointer">
            1 year 
          </div>
        </Link>
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
