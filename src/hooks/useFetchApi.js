import axios from "axios";
import { useEffect, useState } from "react";

function useFetchApi(endPoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/${endPoint}`);
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
       if (endPoint) fetchData();
  }, [endPoint,baseURL]);

  return { data, isLoading, error };
}

export default useFetchApi;
