import React from 'react';

export default function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <ul>
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
    </aside>
  );
}
