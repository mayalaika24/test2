import { useState } from 'react';
import { Book } from '../types/books';

export const useAddBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedBook, setAddedBook] = useState(null);

  const addBook = async (book: Book) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAddedBook(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addBook, loading, error, addedBook };
};
