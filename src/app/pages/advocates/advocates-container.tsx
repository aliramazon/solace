"use client";

import { AdvocatesFilters } from "./advocates-filters";
import { AdvocatesHeader } from "./advocates-header";
import { AdvocatesList } from "./advocates-list";
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
      <AdvocatesFilters />
      <AdvocatesList />
    </>
  );
};
