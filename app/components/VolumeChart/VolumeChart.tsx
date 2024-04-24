"use client"
import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import createApolloClient from '@/lib/apolloClient';


export const GET_ALL_TRANSFERS = gql`
query GetAllTransfers {
  originTransfers(first: 100, orderBy: timestamp, orderDirection: asc, where: {}) {
    timestamp
    originDomain
    bridgedAmt
  }
  destinationTransfers(
    first: 100
    orderBy: executedTimestamp
    orderDirection: asc
  ) {
    executedTimestamp
    destinationDomain
    amount
  }
}
`;

const client = createApolloClient();

export function TransfersDisplay() {
  const { loading, error, data } = useQuery(GET_ALL_TRANSFERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("data", data)
  return (
    <h1>hoal</h1>
  );
}

export default TransfersDisplay;
