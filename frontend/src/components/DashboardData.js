import React from 'react';
import ExceedingUsers from './ExceedingUsers';
import RequestCounts from './RequestCounts';

export default function DashboardData({ exceedingUsers, requestCounts }) {
  return (


    // dashboard components
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ExceedingUsers exceedingUsers={exceedingUsers} />
      <RequestCounts requestCounts={requestCounts} />
    </div>
  );
}
