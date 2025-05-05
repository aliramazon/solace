import { Advocate } from "../../../../types/advocate";

export enum AdvocateActions {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  SEARCH_TEXT = "SEARCH_TEXT",
  ADD_FILTER = "SET_FILTER",
  DELETE_FILTER = "DELETE_FILTER",
  CHANGE_OFFSET = "CHANGE_OFFSET",
}

interface FetchStartAction {
  type: AdvocateActions.FETCH_START;
}

interface FetchSuccessAction {
  type: AdvocateActions.FETCH_SUCCESS;
  payload: {
    advocates: Advocate[];
    hasNextData: boolean;
  };
}

interface FetchErrorAction {
  type: AdvocateActions.FETCH_ERROR;
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

export interface ChangeOffset {
  type: AdvocateActions.CHANGE_OFFSET;
  payload: {
    changeAction: "increment" | "decrement";
    amount: number;
  };
}

export type Action =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | SearchTextAction
  | AddFilterValue
  | DeleteFilterValue
  | ChangeOffset;
