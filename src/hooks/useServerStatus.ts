import { useEffect, useState } from "react";
import { GameDig, QueryResult } from 'gamedig';

export default function useServerStatus() {
  const [serverStatus, setServerStatus] = useState<QueryResult | null>(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      const response = await GameDig.query({ type: 'minecraft', host: 'mc.hypixel.net' });
      setServerStatus(response);
    };

    const interval = setInterval(() => {
      fetchServerStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return serverStatus;
}

// export default function useServerStatus() {
//   const [serverStatus, setServerStatus] = useState<GameDig | null>(null);

//   useEffect(() => {
//     const fetchServerStatus = async () => {
//       const response = await GameDig.query({ type: 'minecraft', host: 'mc.hypixel.net' });
//       // Store data and expiry in session storage
//       sessionStorage.setItem('serverStatus', JSON.stringify(response));
//       setServerStatus(response);
//     };

//     const checkAndFetchServerStatus = () => {
//       const now = new Date();
//       const storedExpiryTime = sessionStorage.getItem('expiryTime');
//       const parsedExpiryTime = storedExpiryTime ? new Date(storedExpiryTime) : null;
//       if (!parsedExpiryTime || now > parsedExpiryTime) {
//         fetchServerStatus();
//       } else {
//         // Use stored data if not expired
//         const storedData = sessionStorage.getItem('serverStatus');
//         if (storedData) setServerStatus(JSON.parse(storedData));
//       }
//     };

//     // Initial fetch or load from session storage
//     checkAndFetchServerStatus();

//     // Set up an interval to check and fetch as needed, independent of expiryTime state
//     const interval = setInterval(() => {
//       checkAndFetchServerStatus();
//     }, 10000); // Check every 10 seconds

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, []); // Removed expiryTime from dependency array

//   return serverStatus;
// }