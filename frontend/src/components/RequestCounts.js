import React from 'react';

export default function RequestCounts({ requestCounts }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Request Counts</h2>
      <ul className="bg-gray-100 rounded h-64 overflow-y-auto">
        {Object.entries(requestCounts).map(([userId, count]) => (
          <li key={userId} className="p-2 border-b">
            User {userId}: {count} requests
          </li>
        ))}
      </ul>
    </div>
  );
}
