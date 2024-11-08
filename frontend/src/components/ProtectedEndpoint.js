import React from 'react';

export default function ProtectedEndpoint({  userId, setErrorMessage, setProtectedResponse, setResetTimer,}) {
  const accessProtectedEndpoint = async () => {
    if (!userId) {
      setErrorMessage('User ID is required');
      return;
    }
    try {

      const response = await fetch(`http://localhost:4000/protected?userId=${userId}`);
      const data = await response.json();
      if (response.status === 429) {
        setErrorMessage(`Rate limit exceeded. Try again in 60 seconds.`);
        setProtectedResponse('');
        startResetTimer();
      } else if (response.ok) {
        setProtectedResponse(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.error);
        setProtectedResponse('');
      }
    } catch (error) {
      setErrorMessage(`Error accessing protected endpoint: ${error.message}`);
      setProtectedResponse('');
    }
  };


//   timer for 60 seconds
  const startResetTimer = () => {
    setResetTimer(60);
    const timerId = setInterval(() => {
      setResetTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timerId);
        return null;
      });
    }, 1000);
  };

  return (
    <button
      onClick={accessProtectedEndpoint}
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
    >
      Access Protected Endpoint
    </button>
  );
}
