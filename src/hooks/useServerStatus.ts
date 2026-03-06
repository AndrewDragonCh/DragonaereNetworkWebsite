// import { useEffect, useState } from "react";

// export default function useServerStatus() {
//   const [serverStatus, setServerStatus] = useState<QueryResult | null>(null);

//   useEffect(() => {
//     const fetchServerStatus = async () => {
//       const response = await GameDig.query({ type: 'minecraft', host: 'mc.hypixel.net' });
//       setServerStatus(response);
//     };

//     const interval = setInterval(() => {
//       fetchServerStatus();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return serverStatus;
// }