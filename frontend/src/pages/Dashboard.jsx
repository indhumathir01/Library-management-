import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, members: 0, issued: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/books/'),
      api.get('/members/'),
      api.get('/transactions/issues/'),
    ]).then(([books, members, issues]) => {
      setStats({
        books: books.data.length ?? books.data.count ?? 0,
        members: members.data.length ?? members.data.count ?? 0,
        issued: (issues.data.filter ? issues.data.filter(i => i.status === 'ISSUED').length : 0),
      });
    }).catch(() => {});
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card"><h3>{stats.books}</h3><p>Total Books</p></div>
        <div className="stat-card"><h3>{stats.members}</h3><p>Total Members</p></div>
        <div className="stat-card"><h3>{stats.issued}</h3><p>Books Issued</p></div>
      </div>
    </div>
  );
}
