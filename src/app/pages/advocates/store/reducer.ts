import { Advocate } from "../../../../types/advocate";
import { isIncluded } from "../../../../utils";
import { Action, AdvocateActions } from "./types";

const FIRST_PAGE_KEY = "firstPage";

export const initialState = {
  advocates: [] as Advocate[],
  filteredAdvocates: [] as Advocate[],
  isFetching: true,
  isError: false,
  cursor: null as number | null,
  activeCursorsStack: [] as (number | null)[],
  advocatesCache: {} as Record<"firstPage" | number, Advocate[]>,
};

type State = typeof initialState;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AdvocateActions.FETCH_START:
      return { ...state, isFetching: true, isError: false };

    case AdvocateActions.FETCH_SUCCESS: {
      const { cursor, advocates, isInitialFetch } = action.payload;

      const cacheKey = isInitialFetch ? FIRST_PAGE_KEY : state.cursor;
      const updatedStack =
        cursor === null && state.activeCursorsStack.includes(null)
          ? [...state.activeCursorsStack]
          : [...state.activeCursorsStack, state.cursor];

      return {
        ...state,
        isFetching: false,
        isError: false,
        cursor,
        advocates,
        filteredAdvocates: advocates,
        advocatesCache: {
          ...state.advocatesCache,
          [cacheKey!]: advocates,
        },
        activeCursorsStack: updatedStack,
      };
    }

    case AdvocateActions.CLICK_NEXT: {
      const { data } = action.payload;

      if (data.length === 0) {
        return state;
      }

      const nextCursor = data[data.length - 1].id;
      const updatedStack = [...state.activeCursorsStack, state.cursor];

      return {
        ...state,
        cursor: nextCursor,
        advocates: [...data],
        filteredAdvocates: [...data],
        activeCursorsStack: updatedStack,
      };
    }

    case AdvocateActions.FETCH_ERROR:
      return { ...state, isFetching: false, isError: true };

    case AdvocateActions.CLICK_PREV: {
      if (state.activeCursorsStack.length === 1) return state;

      const copy = [...state.activeCursorsStack];
      const nextCursor = copy.pop()!;
      const activeCursor = copy[copy.length - 1];
      const cacheKey = activeCursor ?? FIRST_PAGE_KEY;
      const cachedData = state.advocatesCache[cacheKey];

      return {
        ...state,
        cursor: nextCursor,
        advocates: [...cachedData],
        filteredAdvocates: [...cachedData],
        activeCursorsStack: copy,
      };
    }

    case AdvocateActions.SEARCH_TEXT: {
      const { value } = action.payload;
      const filteredAdvocates = state.advocates.filter((advocate) => {
        return (
          isIncluded(advocate.firstName, value) ||
          isIncluded(advocate.lastName, value) ||
          isIncluded(advocate.city, value) ||
          isIncluded(advocate.degree, value) ||
          isIncluded(advocate.yearsOfExperience, value) ||
          advocate.specialties.some((speciality) =>
            isIncluded(speciality, value)
          )
        );
      });
      return {
        ...state,
        filteredAdvocates,
      };
    }

    default:
      return state;
  }
};
