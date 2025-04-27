import { Advocate } from "../../../../types/advocate";

export enum AdvocateActions {
  FETCH_START = "FETCH_START",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  CLICK_PREV = "CLICK_PREV",
  CLICK_NEXT = "CLICK_NEXT",
  SEARCH_TEXT = "SEARCH_TEXT",
}

interface FetchStartAction {
  type: AdvocateActions.FETCH_START;
}

interface FetchSuccessAction {
  type: AdvocateActions.FETCH_SUCCESS;
  payload: {
    cursor: number;
    advocates: Advocate[];
    isInitialFetch: boolean;
  };
}

interface FetchErrorAction {
  type: AdvocateActions.FETCH_ERROR;
}

interface ClickPrevAction {
  type: AdvocateActions.CLICK_PREV;
}

interface ClickNextAction {
  type: AdvocateActions.CLICK_NEXT;
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

export type Action =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | ClickPrevAction
  | ClickNextAction
  | SearchTextAction;
