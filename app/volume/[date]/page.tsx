"use client"

import { Suspense } from "react"
import Volume from "./volume"

export default function Page({ params }: { params: { date: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Volume date={params.date} />
    </Suspense>

  )
} 