import React, { FC, useContext } from 'react';
import { AppContext } from '../context/globalState';
import { ExchangesTable } from '../components';

type Props = {
  filteredExchanges?: Exchange[];
};

type Exchange = {
  id?: string,
  name?: string,
  year_established?: number,
  country?: string,
  description?: string,
  url?: string,
  image?: string,
  has_trading_incentive?: boolean,
  trust_score?: number,
  trust_score_rank?: number,
  trade_volume_24h_btc?: number,
  trade_volume_24h_btc_normalized?: number
}

const Home: FC = () => {
  const { filteredExchanges }: Props = useContext(AppContext);

  return (
    <div className="home-wrapper">
      <ExchangesTable exchanges={filteredExchanges} />
    </div>
  );
};

export default Home;
