import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>📚 Library Management System</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/members">Members</Link>
        <Link to="/issue">Issue Book</Link>
        <Link to="/return">Return Book</Link>
        <Link to="/reports">Reports</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
