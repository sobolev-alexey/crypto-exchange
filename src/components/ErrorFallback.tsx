const ErrorFallback = ({ error, resetErrorBoundary }) => {  // { error, resetErrorBoundary } : FallbackProps
  console.error(error);

  return (
    <div>
      Error
    </div>
  );
};

export default ErrorFallback;
