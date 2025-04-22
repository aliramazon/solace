import { useEffect, useReducer, useRef, useState } from "react";
import { advocatesService } from "../../../../services/advocates";
import { initialState, reducer } from "./reducer";
import { AdvocateActions } from "./types";

export const useAdvocates = () => {
  const [searchText, setSearchText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const hasFetched = useRef(false);
  const LIMIT = 9;

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchAdvocates(null, { isInitialFetch: true });
  }, []);

  useEffect(() => {
    if (state.advocates) {
      dispatch({
        type: AdvocateActions.SEARCH_TEXT,
        payload: { value: searchText },
      });
    }
  }, [searchText, state.advocates]);

  const fetchAdvocates = (
    cursor: number | null,
    options: { isInitialFetch: boolean }
  ) => {
    dispatch({ type: AdvocateActions.FETCH_START });

    advocatesService
      .getAdvocates({ pagination: { cursor, limit: LIMIT } })
      .then((data) => {
        dispatch({
          type: AdvocateActions.FETCH_SUCCESS,
          payload: {
            cursor: data.cursor,
            advocates: data.advocates,
            isInitialFetch: options.isInitialFetch,
          },
        });
      })
      .catch(() => {
        dispatch({ type: AdvocateActions.FETCH_ERROR });
      });
  };

  const onNextClick = () => {
    const cacheKey = state.cursor;

    if (cacheKey) {
      const cachedData = state.advocatesCache[cacheKey];

      if (cachedData) {
        dispatch({
          type: AdvocateActions.CLICK_NEXT,
          payload: {
            data: cachedData,
          },
        });
        return;
      }
    }

    fetchAdvocates(state.cursor, { isInitialFetch: false });
  };

  const onPrevClick = () => {
    dispatch({ type: AdvocateActions.CLICK_PREV });
  };

  const onTextSearch = (value: string) => {
    setSearchText(value);
  };
  console.log(state.activeCursorsStack);
  console.log(state.activeCursorsStack.length > 1);

  return {
    advocates: state.advocates,
    filteredAdvocates: state.filteredAdvocates,
    isError: state.isError,
    isFetching: state.isFetching,
    searchedText: searchText,
    isPrevDataExist: state.activeCursorsStack.length > 1,
    onTextSearch,
    onNextClick,
    onPrevClick,
  };
};
