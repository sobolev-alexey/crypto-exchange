import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';
import { ErrorFallback } from './components';
import { fetcher } from './utils/fetcher';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SWRConfig value={{ fetcher, suspense: true, refreshInterval: 1000 * 60 * 60 }}>
        App
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;