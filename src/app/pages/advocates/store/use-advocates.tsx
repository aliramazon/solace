import { useEffect, useReducer, useState } from "react";
import { advocatesService } from "../../../../services/advocates";
import { Pagination } from "../../../../types/pagination";
import { initialState, reducer } from "./reducer";
import { AdvocateActions } from "./types";

export const useAdvocates = () => {
    const [searchText, setSearchText] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);

    const LIMIT = 20;

    useEffect(() => {
        fetchAdvocates({
            cursor: state.pagination.nextCursor,
            direction: "next",
        });
    }, []);

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
            } else if (!searchText && state.filters.search) {
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

    useEffect(() => {
        fetchAdvocates({
            cursor: state.pagination.nextCursor,
            direction: "next",
        });
    }, [state.filters.search]);

    const fetchAdvocates = (pagination: Pagination) => {
        dispatch({ type: AdvocateActions.FETCH_START });
        advocatesService
            .getAdvocates(
                {
                    cursor: pagination.cursor,
                    limit: LIMIT,
                    direction: pagination.direction,
                },
                { ...state.filters }
            )
            .then((data) => {
                dispatch({
                    type: AdvocateActions.FETCH_SUCCESS,
                    payload: {
                        nextCursor: data.nextCursor,
                        activeCursor: pagination.cursor,
                        advocates: data.advocates,
                        direction: pagination.direction,
                        hasNextData: data.hasNextData,
                    },
                });
            })
            .catch(() => {
                dispatch({ type: AdvocateActions.FETCH_ERROR });
            });
    };

    const onNextClick = () => {
        console.log(state.pagination.nextCursor);
        fetchAdvocates({
            cursor: state.pagination.nextCursor,
            direction: "next",
        });
    };

    const onPrevClick = () => {
        const activeCursor =
            state.pagination.cursorStack[
                state.pagination.cursorStack.length - 1
            ];
        fetchAdvocates({ cursor: activeCursor, direction: "prev" });
    };

    const onTextSearch = (value: string) => {
        setSearchText(value);
    };

    return {
        advocates: state.advocates,
        filteredAdvocates: state.filteredAdvocates,
        isError: state.isError,
        isFetching: state.isFetching,
        hasNextData: state.pagination.hasNextData,
        hasPrevData: state.pagination.cursorStack.length > 1,
        searchedText: searchText,
        onTextSearch,
        onNextClick,
        onPrevClick,
    };
};
