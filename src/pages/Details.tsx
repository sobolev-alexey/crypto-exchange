import { useContext } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { Markets, ExchangeData } from '../components';
import { AppContext } from '../context/globalState';

const Details = () => {
  const { priceBTC }: { priceBTC: number } = useContext(AppContext);
  const { id } = useParams();
  const { data: exchange } = useSWR(`${import.meta.env.VITE_API_BASE}/exchanges/${id}`);

  return (
    <div className='details-wrapper'>
      <ExchangeData exchange={exchange} price={priceBTC} />
      <h3 className='markets-label'>Markets</h3>
      <Markets tickers={exchange?.tickers} />
    </div>
  );
};

export default Details;
