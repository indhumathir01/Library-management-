import React, { useState } from 'react';
import api from '../api/axiosConfig';

export default function AddBook() {
  const [form, setForm] = useState({
    title: '', author: '', isbn: '', publisher: '', published_year: '', total_copies: 1, available_copies: 1,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books/', form);
      setMessage('Book added successfully!');
      setForm({ title: '', author: '', isbn: '', publisher: '', published_year: '', total_copies: 1, available_copies: 1 });
    } catch (err) {
      setMessage('Error adding book');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
        <input name="publisher" placeholder="Publisher" value={form.publisher} onChange={handleChange} />
        <input name="published_year" placeholder="Published Year" value={form.published_year} onChange={handleChange} />
        <input name="total_copies" type="number" placeholder="Total Copies" value={form.total_copies} onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
