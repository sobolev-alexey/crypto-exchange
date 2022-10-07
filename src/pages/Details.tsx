import React, { useContext } from 'react';
import useSWR from 'swr';
import { Avatar } from 'antd';
import { useParams } from 'react-router-dom';
import { Markets, ExchangeLinks } from '../components';
import { AppContext } from '../context/globalState';
import { formatPrice, formatVolume, convertColor } from '../utils/format';

const Details = () => {
  const { priceBTC }: { priceBTC: number } = useContext(AppContext);
  const { id } = useParams();
  const { data: exchange, error } = useSWR(`${import.meta.env.VITE_API_BASE}/exchanges/${id}`);
  
  console.log('Exchange data', id, exchange)

  return (
    <div className="details-wrapper">
      <div className="details-main-content-wrapper">
        <div className="exchange-details-wrapper">
          <div className="exchange-name-wrapper">
            <Avatar
              size={40}
              alt={exchange?.name}
              src={exchange?.image}
            />
            {exchange?.name}
          </div>
          <ExchangeLinks exchange={exchange} />
        </div>
        <div className="exchange-stats-wrapper">
          <div className="exchange-volume-wrapper">
            <p className="hint">Volume(24h)</p>
            <h2 className="price">{formatPrice(priceBTC * exchange?.trade_volume_24h_btc || 0)}</h2>
            <p className="hint">{formatVolume(exchange?.trade_volume_24h_btc || 0)} BTC</p>
          </div>
          <div className="exchange-stats">
            <div className="exchange-score">
              <h2 style={{ color: convertColor(exchange?.trust_score) }}>
                {exchange?.trust_score}
              </h2>
              Score
            </div>
          </div>
        </div>
      </div>
      <Markets tickers={exchange?.tickers} />
    </div>
  );
};

export default Details;
