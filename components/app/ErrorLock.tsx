import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const Fallback = styled.div`
  height: 100%;
  color: #fff;
  background-color: #000;
`;

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <Fallback role="alert">
      <div
        style={{
          color: "#fff",
          background: "#000",
        }}
      >
        <p
          style={{
            marginBottom: "0px",
            color: "#fff",
            background: "#000",
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          Unfortunately something went wrong. Please try again later!
        </p>
        {error?.message && (
          <pre
            style={{
              fontSize: "8px",
              color: "#fff",
              background: "#000",
              marginLeft: "20px",
            }}
          >
            {error?.message}
          </pre>
        )}
      </div>
    </Fallback>
  );
};

// the error boundary only stops propagating errors if an error handler is set.
// hence if no onError is passed to the component we'll use this no action error handler
const skipErrorHandler = (error: Error, info: { componentStack: string }) => {};

export const ErrorLock = ({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError?:
    | undefined
    | ((error: Error, info: { componentStack: string }) => void);
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError ?? skipErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
