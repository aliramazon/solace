import { Advocate } from "../../../../types/advocate";
import { Filters } from "../../../../types/filters";
import { isMultiSelectFilter } from "../../../../utils";
import { Action, AdvocateActions } from "./types";

export const initialState = {
  advocates: [] as Advocate[],
  filteredAdvocates: [] as Advocate[],
  isFetching: true,
  isError: false,
  pagination: {
    offset: 0,
    hasNextData: false,
    limit: 15,
  },
  filters: { search: "", city: "", specialty: [], degree: "" } as Filters,
};

type State = typeof initialState;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AdvocateActions.FETCH_START:
      return { ...state, isFetching: true, isError: false };

    case AdvocateActions.FETCH_ERROR:
      return { ...state, isFetching: false, isError: true };

    case AdvocateActions.ADD_FILTER: {
      const { name, value } = action.payload;
      let filters = {};
      if (isMultiSelectFilter(name)) {
        filters = {
          ...state.filters,
          [name]: [
            ...((state.filters[name as keyof Filters] as string[]) ?? []),
            value,
          ],
        };
      } else {
        filters = { ...state.filters, [name]: value };
      }

      return {
        ...state,
        filters,
        pagination: {
          ...state.pagination,
          offset: 0,
          hasNextData: false,
        },
      };
    }

    case AdvocateActions.DELETE_FILTER: {
      const { name, value } = action.payload;
      let filters = {};

      if (isMultiSelectFilter(name)) {
        filters = {
          ...state.filters,
          [name]: (
            (state.filters[name as keyof Filters] as string[]) ?? []
          ).filter((filterValue) => filterValue !== value),
        };
      } else {
        filters = {
          ...state.filters,
          [name]: "",
        };
      }

      return {
        ...state,
        filters,
        pagination: {
          ...state.pagination,
          offset: 0,
          hasNextData: false,
        },
      };
    }

    case AdvocateActions.FETCH_SUCCESS: {
      const { advocates, hasNextData } = action.payload;

      return {
        ...state,
        filteredAdvocates: advocates,
        isFetching: false,
        isError: false,
        pagination: {
          ...state.pagination,
          hasNextData,
        },
        advocates,
      };
    }

    case AdvocateActions.CHANGE_OFFSET: {
      const { amount, changeAction } = action.payload;
      let updatedOffset =
        changeAction === "increment"
          ? state.pagination.offset + amount
          : state.pagination.offset - amount;

      if (updatedOffset < 0) {
        updatedOffset = 0;
      }

      return {
        ...state,
        pagination: {
          ...state.pagination,
          offset: updatedOffset,
        },
      };
    }

    default:
      return state;
  }
};
