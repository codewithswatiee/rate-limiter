import { useState, useCallback } from 'react';

export default function useFetchDashboardData(setErrorMessage) {
  const [exceedingUsers, setExceedingUsers] = useState([]);
  const [requestCounts, setRequestCounts] = useState({});

  const fetchDashboardData = useCallback(async () => {
    try {
        // ---for exceeding req users
        //exceeding logs lekr aao
        //json mein convert kro
        // exceeding set krdo


        // for count
        // count lekr aao
        // json mein convert kro
        // req count set krdo
      const exceedingsResponse = await fetch('http://localhost:4000/dashboard/get-exceedings');
      const exceedingsData = await exceedingsResponse.json();
      setExceedingUsers(exceedingsData);

      const countsResponse = await fetch('http://localhost:4000/dashboard/get-count');
      const countsData = await countsResponse.json();
      setRequestCounts(countsData);
    } catch (error) {

        // error aaye toh send kro..and all set!!
      setErrorMessage(`Error fetching dashboard data: ${error.message}`);
    }
  }, [setErrorMessage]);

  return { exceedingUsers, requestCounts, fetchDashboardData };
}
