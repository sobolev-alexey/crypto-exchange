import { FC, useContext } from 'react';
import { AppContext } from '../context/globalState';
import { ExchangesTable } from '../components';
import { Exchange } from '../types';

const Home: FC = () => {
  const {
    filteredExchanges,
  }: {
    filteredExchanges: Exchange[];
  } = useContext(AppContext);

  return (
    <div className='home-wrapper'>
      <ExchangesTable exchanges={filteredExchanges} />
    </div>
  );
};

export default Home;
