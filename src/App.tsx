import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      App
    </ErrorBoundary>
  );
}

export default App;