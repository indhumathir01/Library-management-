import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import MemberList from './pages/MemberList';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page-content">{children}</div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/books" element={<PrivateRoute><Layout><BookList /></Layout></PrivateRoute>} />
          <Route path="/books/add" element={<PrivateRoute><Layout><AddBook /></Layout></PrivateRoute>} />
          <Route path="/members" element={<PrivateRoute><Layout><MemberList /></Layout></PrivateRoute>} />
          <Route path="/issue" element={<PrivateRoute><Layout><IssueBook /></Layout></PrivateRoute>} />
          <Route path="/return" element={<PrivateRoute><Layout><ReturnBook /></Layout></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
