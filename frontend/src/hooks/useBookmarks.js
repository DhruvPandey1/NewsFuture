import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/bookmarks/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setBookmarks(data);
        }
      } catch (err) {
        console.error("Error fetching bookmarks", err);
      }
    };

    fetchBookmarks();
  }, [user]);

  const addBookmark = async (article) => {
    if (!user) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...article, userId: user.id }),
      });

      if (res.ok) {
        const newBookmark = await res.json();
        setBookmarks((prev) => [...prev, newBookmark]);
      }
    } catch (err) {
      console.error("Error adding bookmark", err);
    }
  };

  const removeBookmark = async (bookmarkId) => {
    if (!user) return;
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });
      setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    } catch (err) {
      console.error("Error removing bookmark", err);
    }
  };

  const isBookmarked = (articleUrl) => {
    return bookmarks.some((b) => b.url === articleUrl);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
};
