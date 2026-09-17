import React from 'react';

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <h4>{book.title}</h4>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Category: {book.category_name || 'N/A'}</p>
      <p className={book.available_copies > 0 ? 'available' : 'unavailable'}>
        {book.available_copies > 0 ? `Available (${book.available_copies})` : 'Not Available'}
      </p>
    </div>
  );
}
