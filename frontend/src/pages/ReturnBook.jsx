import React, { useState } from 'react';
import api from '../api/axiosConfig';

export default function ReturnBook() {
  const [issueId, setIssueId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/transactions/issues/${issueId}/return_book/`);
      setMessage(`Returned. Status: ${res.data.status}`);
    } catch (err) {
      setMessage('Error returning book');
    }
  };

  return (
    <div>
      <h2>Return Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <input placeholder="Issue Record ID" value={issueId} onChange={(e) => setIssueId(e.target.value)} required />
        <button type="submit">Return Book</button>
      </form>
    </div>
  );
}
