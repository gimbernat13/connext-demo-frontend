
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
type Repo = {
  name: string
  stargazers_count: number
}
console.log("i love assssssss ")
export const getStaticProps = (async (context) => {
    const res = await fetch('https://postgrest.mainnet.connext.ninja/daily_transfer_metrics?transfer_date=gt.2024-03-25')
    const repo = await res.json()
    console.log("res" , res)
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>
 
export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count
}