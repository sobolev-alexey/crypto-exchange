import { ReactNode, createContext, useState, useEffect } from 'react';
import useSWR from 'swr';
import { notification } from 'antd';
import * as JsSearch from 'js-search';

export const AppContext = createContext<any>({});

function GlobalState({ children }: { children: ReactNode }) {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [search, setSearch] = useState<any>(null);
  const [priceBTC, setPriceBTC] = useState(1);

  const errorCallback = (error = null) => {
    notification['error']({
      key: 'error',
      duration: 10,
      message: 'Error',
      description:
        error || 'There was an error loading data. Please see console output for details.',
    });
    console.error(error);
  };

  // Options API https://swr.vercel.app/docs/options
  const { data, error } = useSWR(`${import.meta.env.VITE_API_BASE}/exchanges?per_page=100`);
  if (error) {
    errorCallback(error);
  }

  const { data: priceObj, error: priceError } = useSWR(
    `${import.meta.env.VITE_API_BASE}/simple/price?ids=bitcoin&vs_currencies=usd`
  );
  if (priceError) {
    errorCallback(priceError);
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

  useEffect(() => {
    priceObj && setPriceBTC(priceObj?.bitcoin?.usd);
  }, [priceObj]); // eslint-disable-line

  return (
    <AppContext.Provider
      value={{
        exchanges,
        filteredExchanges,
        setFilteredExchanges,
        search,
        priceBTC,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default GlobalState;
