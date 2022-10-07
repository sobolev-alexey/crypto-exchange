import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalState from './context/globalState';
import { ErrorFallback } from './components';
import { fetcher } from './utils/fetcher';
import { Home, Details } from './pages';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SWRConfig value={{ fetcher, suspense: true, refreshInterval: 1000 * 60 * 60 }}>
        <GlobalState>
          <BrowserRouter>
            <Routes>
              <Route path={'/exchange/:id'} element={<Details />} />
              <Route index element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </GlobalState>
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;