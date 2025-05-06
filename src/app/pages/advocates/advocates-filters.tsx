import { useEffect, useState } from "react";
import { Input } from "../../../components/input/input";
import { useAdvocatesContext } from "./store/advocates-context";
import { AdvocateActions } from "./store/types";

export const AdvocatesFilters = () => {
  const [searchText, setSearchText] = useState("");
  const { state, dispatch } = useAdvocatesContext();
  const { pagination, filters } = state;
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
