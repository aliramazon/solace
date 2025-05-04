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
        nextCursor: null as string | null,
        cursorStack: [] as (null | string)[],
        hasNextData: false as boolean,
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
                        ...((state.filters[
                            name as keyof Filters
                        ] as string[]) ?? []),
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
                    nextCursor: null,
                    cursorStack: [],
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
                    nextCursor: null,
                    cursorStack: [],
                },
            };
        }

        case AdvocateActions.FETCH_SUCCESS: {
            const {
                advocates,
                nextCursor,
                direction,
                activeCursor,
                hasNextData,
            } = action.payload;
            const clonedCursorStack = [...state.pagination.cursorStack];

            if (direction === "prev") {
                clonedCursorStack.pop();
            } else if (direction === "next") {
                const lastCursor =
                    clonedCursorStack[clonedCursorStack.length - 1];
                if (lastCursor !== activeCursor) {
                    clonedCursorStack.push(activeCursor);
                }
            }

            return {
                ...state,
                filteredAdvocates: advocates,
                isFetching: false,
                isError: false,
                pagination: {
                    ...state.pagination,
                    nextCursor,
                    cursorStack: clonedCursorStack,
                    hasNextData,
                },
                advocates,
            };
        }

        default:
            return state;
    }
};
