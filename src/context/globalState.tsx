import React, { ReactNode, createContext, useState, useEffect } from 'react';
import useSWR from 'swr';
import { notification } from 'antd';
import * as JsSearch from 'js-search';

export const AppContext = createContext({});

function GlobalState({ children }: { children: ReactNode }) {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [search, setSearch] = useState(null);

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
    if (data.length) {
      setExchanges(data);
      setFilteredExchanges(data);
      localStorage.setItem('exchanges', JSON.stringify(data));
      const search = new JsSearch.Search('name');
      search.addIndex('id');
      search.addIndex(['name']);
      search.addIndex('description');
      search.addIndex('country');
      search.addIndex('year_established');
      search.addIndex('url');
      search.addDocuments(data);
      setSearch(search);
    }
  }, [data]); // eslint-disable-line

  return <AppContext.Provider value={{ 
    exchanges,
    filteredExchanges, 
    setFilteredExchanges,
    search,
  }}>{children}</AppContext.Provider>;
};

export default GlobalState;
