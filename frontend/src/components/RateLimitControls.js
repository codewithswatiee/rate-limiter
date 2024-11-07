import React from 'react';

export default function RateLimitControls({
  userId,
  setUserId,
  rateLimit,
  setRateLimit,
  newRateLimit,
  setNewRateLimit,
  setMessage,
  setErrorMessage,
}) {
  const fetchRateLimit = async () => {
    if (!userId) {
      setErrorMessage('User ID is required');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/rate-limit/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setRateLimit(data.rateLimit);
        setMessage(`Rate limit for user ${userId}: ${data.rateLimit}`);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage(`Error fetching rate limit: ${error.message}`);
    }
  };

  const updateRateLimit = async () => {
    if (!userId) {
      setErrorMessage('User ID is required');
      return;
    }
    if (!newRateLimit || isNaN(newRateLimit)) {
      setErrorMessage('Invalid rate limit');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/rate-limit/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rateLimit: parseInt(newRateLimit) }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Rate limit updated for user ${userId}: ${data.rateLimit}`);
        setRateLimit(data.rateLimit);
        setNewRateLimit('');
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage(`Error updating rate limit: ${error.message}`);
    }
  };

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="p-2 border rounded"
      />
      <button onClick={fetchRateLimit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Get Rate Limit
      </button>
      <input
        type="number"
        value={newRateLimit}
        onChange={(e) => setNewRateLimit(e.target.value)}
        placeholder="New Rate Limit"
        className="p-2 border rounded"
      />
      <button onClick={updateRateLimit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Update Rate Limit
      </button>
    </div>
  );
}
