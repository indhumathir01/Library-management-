import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

export default function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get('/members/').then((res) => setMembers(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <table>
        <thead>
          <tr><th>Username</th><th>Email</th><th>Type</th><th>Joined</th></tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.username}</td>
              <td>{m.email}</td>
              <td>{m.membership_type}</td>
              <td>{m.join_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
