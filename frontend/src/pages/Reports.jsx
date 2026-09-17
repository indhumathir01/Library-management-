import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function Reports() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get('/transactions/issues/').then((res) => setIssues(res.data)).catch(() => {});
  }, []);

  const overdue = issues.filter((i) => i.status === 'ISSUED' && new Date(i.due_date) < new Date());

  return (
    <div>
      <h2>Reports</h2>
      <h3>Overdue Books ({overdue.length})</h3>
      <table>
        <thead><tr><th>Book</th><th>Member</th><th>Due Date</th></tr></thead>
        <tbody>
          {overdue.map((i) => (
            <tr key={i.id}><td>{i.book_title}</td><td>{i.member_name}</td><td>{i.due_date}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>All Transactions ({issues.length})</h3>
      <table>
        <thead><tr><th>Book</th><th>Member</th><th>Issue Date</th><th>Due Date</th><th>Status</th></tr></thead>
        <tbody>
          {issues.map((i) => (
            <tr key={i.id}>
              <td>{i.book_title}</td><td>{i.member_name}</td><td>{i.issue_date}</td><td>{i.due_date}</td><td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
