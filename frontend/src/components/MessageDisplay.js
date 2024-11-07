import React from 'react';

export default function MessageDisplay({ message, errorMessage, protectedResponse, resetTimer }) {
  return (
    <>
      {message && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Message:</h2>
          <p className="bg-green-100 text-green-700 p-4 rounded">{message}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Error:</h2>
          <p className="bg-red-100 text-red-700 p-4 rounded">{errorMessage}</p>
        </div>
      )}

      {protectedResponse && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Protected Endpoint Response:</h2>
          <p className="bg-blue-100 text-blue-700 p-4 rounded">{protectedResponse}</p>
        </div>
      )}

      {resetTimer !== null && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Rate Limit Reset Timer:</h2>
          <p className="bg-yellow-100 text-yellow-700 p-4 rounded">
            Time until reset: {resetTimer} seconds
          </p>
        </div>
      )}
    </>
  );
}
