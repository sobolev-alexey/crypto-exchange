import React, { ReactNode, createContext } from 'react';
export const AppContext = createContext({});

function GlobalState({ children }: { children: ReactNode }) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default GlobalState;
