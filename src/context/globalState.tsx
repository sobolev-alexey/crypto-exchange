import React, { ReactNode, createContext, useState, useEffect } from 'react';
import useSWR from 'swr';
import { notification } from 'antd';

export const AppContext = createContext({});

function GlobalState({ children }: { children: ReactNode }) {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);

  const errorCallback = (error = null) => {
    notification['error']({
      key: 'error',
      duration: 10,
      message: 'Error',
      description: error || 'There was an error loading data. Please see console output for details.'
    });
    console.error(error);
  }

  // Options API https://swr.vercel.app/docs/options
  const { data, error } = useSWR(
    `${import.meta.env.VITE_API_BASE}/exchanges?per_page=100`
  );
  if (error) {
    errorCallback(error);
  }
  // const value = React.useMemo(() => ({ exchanges: data }), [data]);
  // return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

  useEffect(() => {
    setExchanges(data);
    setFilteredExchanges(data);
    localStorage.setItem('exchanges', JSON.stringify(data));
  }, [data]); // eslint-disable-line

  return <AppContext.Provider value={{ 
    exchanges,
    filteredExchanges, 
    setFilteredExchanges,
  }}>{children}</AppContext.Provider>;
};

export default GlobalState;
