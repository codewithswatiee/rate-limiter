import React, { useState, useEffect } from 'react';
import RateLimitControls from './components/RateLimitControls';
import ProtectedEndpoint from './components/ProtectedEndpoint';
import DashboardData from './components/DashboardData';
import MessageDisplay from './components/MessageDisplay';
import useFetchDashboardData from './hooks/useFetchDashboardData';

export default function App() {
  const [userId, setUserId] = useState('');
  const [rateLimit, setRateLimit] = useState(null);
  const [newRateLimit, setNewRateLimit] = useState('');
  const [protectedResponse, setProtectedResponse] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetTimer, setResetTimer] = useState(null);

  const { exceedingUsers, requestCounts, fetchDashboardData } = useFetchDashboardData(setErrorMessage);

  useEffect(() => {
    const interval = setInterval(fetchDashboardData, 4000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Rate Limit Dashboard</h1>

      <RateLimitControls
        userId={userId}
        setUserId={setUserId}
        rateLimit={rateLimit}
        setRateLimit={setRateLimit}
        newRateLimit={newRateLimit}
        setNewRateLimit={setNewRateLimit}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />

      <ProtectedEndpoint
        userId={userId}
        setErrorMessage={setErrorMessage}
        setProtectedResponse={setProtectedResponse}
        setResetTimer={setResetTimer}
      />

      <MessageDisplay
        message={message}
        errorMessage={errorMessage}
        protectedResponse={protectedResponse}
        resetTimer={resetTimer}
      />

      <DashboardData exceedingUsers={exceedingUsers} requestCounts={requestCounts} />
    </div>
  );
}
