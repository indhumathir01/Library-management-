import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import BookCard from '../components/BookCard';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBooks = (query = '') => {
    api.get(`/books/?search=${query}`).then((res) => setBooks(res.data)).catch(() => {});
  };

  useEffect(() => { fetchBooks(); }, []);

  return (
    <div>
      <h2>Books</h2>
      <input
        placeholder="Search by title, author, ISBN..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); fetchBooks(e.target.value); }}
      />
      <div className="book-grid">
        {books.map((b) => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}
