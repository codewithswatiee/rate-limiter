import React from 'react';

export default function ExceedingUsers({ exceedingUsers }) {
  return (

    // this component will take exceedingUsers as prop and display them
    <div>
      <h2 className="text-xl font-semibold mb-2">Users Exceeding Rate Limit</h2>
      <ul className="bg-gray-100 rounded h-64 overflow-y-auto">
        {exceedingUsers.map((user, index) => (
          <li key={index} className="p-2 border-b">
            User {user.userId} exceeded at {new Date(user.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
