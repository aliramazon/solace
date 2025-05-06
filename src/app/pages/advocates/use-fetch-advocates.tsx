import { useEffect } from "react";
import { advocatesService } from "../../../services/advocates";
import { Pagination } from "../../../types/pagination";
import { useAdvocatesContext } from "./store/advocates-context";
import { AdvocateActions } from "./store/types";

export const useFetchAdvocates = () => {
  const { state, dispatch } = useAdvocatesContext();
  const { pagination, filters, sort } = state;

  useEffect(() => {
    fetchAdvocates({
      offset: pagination.offset,
      limit: pagination.limit,
    });
  }, [
    filters,
    pagination.limit,
    pagination.offset,
    sort.column,
    sort.direction,
  ]);

  const fetchAdvocates = (pagination: Pagination) => {
    dispatch({ type: AdvocateActions.FETCH_START });
    advocatesService
      .getAdvocates(
        {
          limit: pagination.limit,
          offset: pagination.offset,
        },
        { ...filters },
        { ...sort }
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
};
