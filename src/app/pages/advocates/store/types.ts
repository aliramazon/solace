import { Advocate } from "../../../../types/advocate";

export enum AdvocateActions {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  GET_PREV_DATA_FROM_CACHE = "GET_PREV_DATA_FROM_CACHE",
  GET_NEXT_DATA_FROM_CACHE = "GET_NEXT_DATA_FROM_CACHE",
  SEARCH_TEXT = "SEARCH_TEXT",
  ADD_FILTER = "SET_FILTER",
  DELETE_FILTER = "DELETE_FILTER",
}

interface FetchStartAction {
  type: AdvocateActions.FETCH_START;
}

interface FetchSuccessAction {
  type: AdvocateActions.FETCH_SUCCESS;
  payload: {
    nextCursor: number | null;
    activeCursor: number | null;
    advocates: Advocate[];
    direction: "next" | "prev" | null;
    hasNextData: boolean;
  };
}

interface FetchErrorAction {
  type: AdvocateActions.FETCH_ERROR;
}

interface ClickPrevAction {
  type: AdvocateActions.GET_PREV_DATA_FROM_CACHE;
}

interface ClickNextAction {
  type: AdvocateActions.GET_NEXT_DATA_FROM_CACHE;
  payload: {
    data: Advocate[];
  };
}

interface SearchTextAction {
  type: AdvocateActions.SEARCH_TEXT;
  payload: {
    value: string;
  };
}

interface AddFilterValue {
  type: AdvocateActions.ADD_FILTER;
  payload: {
    name: string;
    value: string;
  };
}

interface DeleteFilterValue {
  type: AdvocateActions.DELETE_FILTER;
  payload: {
    name: string;
    value?: string;
  };
}

export type Action =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | ClickPrevAction
  | ClickNextAction
  | SearchTextAction
  | AddFilterValue
  | DeleteFilterValue;
