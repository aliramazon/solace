"use client";

import { AdvocatesFilters } from "./advocates-filters";
import { AdvocatesHeader } from "./advocates-header";
import { AdvocatesList } from "./advocates-list";
import { useAdvocates } from "./store/use-advocates";
import "./styles.css";

export const AdvocatesContainer = () => {
  const {
    filteredAdvocates,
    isError,
    isFetching,
    onNextClick,
    onPrevClick,
    onTextSearch,
    searchedText,
    isPrevDataExist,
  } = useAdvocates();

  if (isError) return <p>Error</p>;

  return (
    <>
      <AdvocatesHeader />
      <AdvocatesFilters
        onTextSearch={onTextSearch}
        searchedText={searchedText}
        onNext={onNextClick}
        onPrev={onPrevClick}
        isPrevDataExist={isPrevDataExist}
      />
      {isFetching ? null : <AdvocatesList data={filteredAdvocates} />}
    </>
  );
};
