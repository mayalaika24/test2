import { useState, useEffect } from 'react';

function useFetch(obj: { getData: Function }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchData() {
    try {
      const res = await obj['getData']();
      setData(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
}

export default useFetch;
