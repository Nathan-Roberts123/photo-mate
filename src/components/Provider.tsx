"use client";

import { ReactNode } from "react";
import { useReducer } from "react";
import { createContext } from "react";

interface TState {
  status: "closed" | "opened";
}

export const modalContext = createContext<any>(null);

const reducer = (state: TState) => {
  return {
    status: state.status == "closed" ? "opened" : "closed",
  };
};

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<any>(reducer, { status: "closed" });

  const contexValue = { state, dispatch };
  return (
    <modalContext.Provider value={contexValue}>
      {children}
    </modalContext.Provider>
  );
};

export default Provider;
