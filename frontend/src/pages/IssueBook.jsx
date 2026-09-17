import React, { useState } from 'react';
import api from '../api/axiosConfig';

export default function IssueBook() {
  const [form, setForm] = useState({ book: '', member: '', due_date: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions/issues/', form);
      setMessage('Book issued successfully!');
    } catch (err) {
      setMessage('Error issuing book');
    }
  };

  return (
    <div>
      <h2>Issue Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input name="book" placeholder="Book ID" value={form.book} onChange={handleChange} required />
        <input name="member" placeholder="Member ID" value={form.member} onChange={handleChange} required />
        <input name="due_date" type="date" value={form.due_date} onChange={handleChange} required />
        <button type="submit">Issue Book</button>
      </form>
    </div>
  );
}
