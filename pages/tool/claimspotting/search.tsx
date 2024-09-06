import React from "react";

const loadDataFromAPI = async (
  queryText: string,
) => {
  const params = {
    query: queryText,
  };

  // Convert the parameters object to a query string
  const url = new URL(process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_SEARCH as string);
  const queryString = new URLSearchParams(params).toString();

  console.log(
    "Fetching data from url: ",
    queryString,
    "with those params",
    params
  );