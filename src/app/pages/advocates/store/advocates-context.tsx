"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { Action } from "./types";

type AdvocatesState = typeof initialState;

interface AdvocatesContextType {
  state: AdvocatesState;
  dispatch(action: Action): void;
}

const AdvocatesContext = createContext<AdvocatesContextType | null>({
  state: initialState,
  dispatch: () => {},
});

export const AdvocatesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdvocatesContext.Provider value={{ state, dispatch }}>
      {children}
    </AdvocatesContext.Provider>
  );
};

export const useAdvocatesContext = () => {
  const context = useContext(AdvocatesContext);
  if (!context) {
    throw new Error(
      "useAdvocatesContext must be used within AdvocatesProvider"
    );
  }
  return context;
};
