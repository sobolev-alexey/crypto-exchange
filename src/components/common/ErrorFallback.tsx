import { Result } from 'antd';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error(error);

  const Home = () => (
    <a href='/' className='primary'>
      <button onClick={resetErrorBoundary} className='primary'>
        Back Home
      </button>
    </a>
  );

  return (
    <Result status='500' title='500' subTitle='Sorry, something went wrong.' extra={<Home />} />
  );
};

export default ErrorFallback;
