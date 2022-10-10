import { Avatar } from 'antd';
import { ExchangeLinks } from '..';
import { Exchange } from '../../types';
import { formatPrice, formatVolume, convertColor } from '../../utils/format';

const ExchangeData = ({ exchange, price }: { exchange: Exchange; price: number }) => {
  return (
    <div className='details-main-content-wrapper'>
      <div className='exchange-details-wrapper'>
        <div className='exchange-name-wrapper'>
          <Avatar size={45} alt={exchange?.name} src={exchange?.image} />
          <h2>{exchange?.name}</h2>
        </div>
        <ExchangeLinks exchange={exchange} />
      </div>
      <div className='exchange-stats-wrapper'>
        <div className='exchange-volume-wrapper'>
          <p className='hint'>Volume(24h)</p>
          <h1 className='price'>{formatPrice(price * exchange?.trade_volume_24h_btc || 0)}</h1>
          <p className='hint'>{formatVolume(exchange?.trade_volume_24h_btc || 0)} BTC</p>
        </div>
        <div className='exchange-stats'>
          <div className='exchange-score'>
            <h2 style={{ color: convertColor(exchange?.trust_score) }}>{exchange?.trust_score}</h2>
            Trust Score
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeData;
