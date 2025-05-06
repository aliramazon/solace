"use client";

import { AdvocatesHeader } from "./advocates-header";
import { AdvocatesList } from "./advocates-list";
import { AdvocatesTopFilters } from "./advocates-top-filters";
import { useAdvocatesContext } from "./store/advocates-context";
import "./styles.css";
import { useFetchAdvocates } from "./use-fetch-advocates";

export const AdvocatesContainer = () => {
  useFetchAdvocates();
  const { state } = useAdvocatesContext();

  if (state.isError) return <p>Error</p>;

  return (
    <>
      <AdvocatesHeader />
      <AdvocatesTopFilters />
      <AdvocatesList />
    </>
  );
};
