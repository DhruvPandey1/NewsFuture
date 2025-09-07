import { useState, useEffect } from 'react';
export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);

    try {
      let url = `${process.env.REACT_APP_API_URL}/api/news`; // adjust to your backend route
      if (query) {
        url += `?q=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setArticles(data.articles || data); // depending on backend format
    } catch (err) {
      setError(err.message || 'Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchNews,
  };
};

export default useNews;