import { useEffect, useState } from "react";
import baseURL from "../Api/baseURL";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const res = await baseURL.get(url, config);
        setData(res.data);
        setIsPending(false);
        setError(null);
      } catch (e) {
        setIsPending(false);
        setError(e.response);
      }
    };
    setTimeout(() => {
      getData();
    }, 1500);

  }, [url]);
  // console.log(data)

  return { data, isPending, error };
};

export default useFetchData;
