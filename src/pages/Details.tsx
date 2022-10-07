import React from 'react';
import useSWR from 'swr';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: exchange, error } = useSWR(`${import.meta.env.VITE_API_BASE}/exchanges/${id}`);
  return (
    <div>
      Exchange Data {JSON.stringify(exchange)}
      Error {JSON.stringify(error)}
      <Link to='/'>Back</Link>
    </div>
  );
};

export default Details;
