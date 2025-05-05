import { useEffect, useReducer, useState } from "react";
import { advocatesService } from "../../../../services/advocates";
import { Pagination } from "../../../../types/pagination";
import { initialState, reducer } from "./reducer";
import { AdvocateActions } from "./types";

export const useAdvocates = () => {
  const [searchText, setSearchText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    pagination,
    filters,
    isFetching,
    isError,
    advocates,
    filteredAdvocates,
  } = state;

  useEffect(() => {
    fetchAdvocates({
      offset: pagination.offset,
      limit: pagination.limit,
    });
  }, [filters, pagination.limit, pagination.offset]);

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

  const fetchAdvocates = (pagination: Pagination) => {
    dispatch({ type: AdvocateActions.FETCH_START });
    advocatesService
      .getAdvocates(
        {
          limit: pagination.limit,
          offset: pagination.offset,
        },
        { ...filters }
      )
      .then((data) => {
        dispatch({
          type: AdvocateActions.FETCH_SUCCESS,
          payload: {
            advocates: data.advocates,
            hasNextData: data.hasNextData,
          },
        });
      })
      .catch(() => {
        dispatch({ type: AdvocateActions.FETCH_ERROR });
      });
  };

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

  const onTextSearch = (value: string) => {
    setSearchText(value);
  };

  return {
    advocates: advocates,
    filteredAdvocates: filteredAdvocates,
    isError: isError,
    isFetching: isFetching,
    hasNextData: pagination.hasNextData,
    hasPrevData: pagination.offset >= pagination.limit,
    searchedText: searchText,
    onTextSearch,
    onNextClick,
    onPrevClick,
  };
};
