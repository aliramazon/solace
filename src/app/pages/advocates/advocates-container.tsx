"use client";

import { useEffect, useState } from "react";
import { advocatesService } from "../../../services/advocates";
import { Advocate } from "../../../types/advocate";
import { isIncluded } from "../../../utils";
import { AdvocatesFilters } from "./advocates-filters";
import { AdvocatesHeader } from "./advocates-header";
import { AdvocatesList } from "./advocates-list";
import "./styles.css";

export const AdvocatesContainer = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    advocatesService
      .getAdvocates()
      .then((data) => {
        setAdvocates(data);
        setFilteredAdvocates(data);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    if (advocates) {
      const filteredAdvocates = advocates.filter((advocate) => {
        return (
          isIncluded(advocate.firstName, searchText) ||
          isIncluded(advocate.lastName, searchText) ||
          isIncluded(advocate.city, searchText) ||
          isIncluded(advocate.degree, searchText) ||
          isIncluded(advocate.yearsOfExperience, searchText) ||
          advocate.specialties.some((speciality) =>
            isIncluded(speciality, searchText)
          )
        );
      });
      setFilteredAdvocates(filteredAdvocates);
    }
  }, [searchText]);

  const onTextSearch = (value: string) => {
    setSearchText(value);
  };

  if (isError) return <p>Error</p>;

  return (
    <>
      <AdvocatesHeader />
      <AdvocatesFilters
        onTextSearch={onTextSearch}
        textSearchValue={searchText}
      />
      <AdvocatesList data={filteredAdvocates} />
    </>
  );
};
