import React, { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalState from './context/globalState';
import { fetcher } from './utils/fetcher';
import { Loading, ErrorFallback, Header, Footer } from './components';
import { Home, Details } from './pages';

import 'antd/dist/antd.min.css';
import './styles/index.scss';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <React.StrictMode>
          <SWRConfig value={{ fetcher, suspense: true, refreshInterval: 1000 * 60 * 60 }}>
            <GlobalState>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path={'/exchange/:id'} element={<Details />} />
                  <Route index element={<Home />} />
                  <Route path='*' element={<Home />} />
                </Routes>
                <Footer />
              </BrowserRouter>
            </GlobalState>
          </SWRConfig>
        </React.StrictMode>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
