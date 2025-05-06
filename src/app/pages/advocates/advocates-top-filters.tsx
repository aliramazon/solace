import { useEffect, useState } from "react";
import { Select } from "../../../components";
import { Input } from "../../../components/input/input";
import { usCities } from "../../../const";
import { SortDirection } from "../../../types/sort";
import { useAdvocatesContext } from "./store/advocates-context";
import { AdvocateActions } from "./store/types";

const buildCitiesOptions = (cities: string[]) => {
  return cities.map((city) => {
    return { label: city, value: city };
  });
};

const experienceSortOptions = [
  {
    label: "Experience: Low to High",
    value: "asc",
  },
  {
    label: "Experience: High to Low",
    value: "desc",
  },
];

export const AdvocatesTopFilters = () => {
  const [searchText, setSearchText] = useState("");
  const { state, dispatch } = useAdvocatesContext();
  const { pagination, filters, sort } = state;
  const hasPrevData = state.pagination.offset >= state.pagination.limit;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText) {
        dispatch({
          type: AdvocateActions.ADD_FILTER,
          payload: {
            name: "search",
            value: searchText,
          },
        });
      } else if (!searchText && filters.search) {
        dispatch({
          type: AdvocateActions.DELETE_FILTER,
          payload: {
            name: "search",
            value: searchText,
          },
        });
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const onPrevClick = () => {
    dispatch({
      type: AdvocateActions.CHANGE_OFFSET,
      payload: {
        amount: pagination.limit,
        changeAction: "decrement",
      },
    });
  };

  const onNextClick = () => {
    dispatch({
      type: AdvocateActions.CHANGE_OFFSET,
      payload: {
        amount: pagination.limit,
        changeAction: "increment",
      },
    });
  };

  const onChangeCity = (value: string) => {
    dispatch({
      type: AdvocateActions.ADD_FILTER,
      payload: {
        name: "city",
        value: value,
      },
    });
  };

  const onChangeSort = (value: string) => {
    dispatch({
      type: AdvocateActions.SORT,
      payload: {
        column: "yearsOfExperience",
        direction: value as SortDirection,
      },
    });
  };

  const onSearch = (value: string) => {
    setSearchText(value);
  };
  return (
    <div className="container">
      <div className="advocates__filters">
        <div className="advocates__search-box">
          <Input
            onChange={onSearch}
            placeholder="Search for your advocate"
            value={searchText}
            clearable
          />
        </div>
        <div className="advocates__city-filter">
          <Select
            options={buildCitiesOptions(usCities)}
            value={filters.city || ""}
            placeholder="Select City"
            onChange={onChangeCity}
          />
        </div>
        <div className="advocates__experience-sort">
          <Select
            options={experienceSortOptions}
            placeholder="Sort Experience"
            value={sort.direction}
            onChange={onChangeSort}
          />
        </div>

        <div className="advocates__pagination">
          <span
            onClick={onPrevClick}
            className={`advocates__pagination-control ${
              !hasPrevData ? "advocates__pagination-control--disabled" : ""
            }`}
          >
            Prev
          </span>
          <span
            onClick={onNextClick}
            className={`advocates__pagination-control ${
              !pagination.hasNextData
                ? "advocates__pagination-control--disabled"
                : ""
            }`}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};
