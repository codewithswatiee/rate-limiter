import { useState, useCallback } from 'react';

export default function useFetchDashboardData(setErrorMessage) {
  const [exceedingUsers, setExceedingUsers] = useState([]);
  const [requestCounts, setRequestCounts] = useState({});

  const fetchDashboardData = useCallback(async () => {
    try {
      const exceedingsResponse = await fetch('http://localhost:4000/dashboard/get-exceedings');
      const exceedingsData = await exceedingsResponse.json();
      setExceedingUsers(exceedingsData);

      const countsResponse = await fetch('http://localhost:4000/dashboard/get-count');
      const countsData = await countsResponse.json();
      setRequestCounts(countsData);
    } catch (error) {
      setErrorMessage(`Error fetching dashboard data: ${error.message}`);
    }
  }, [setErrorMessage]);

  return { exceedingUsers, requestCounts, fetchDashboardData };
}
