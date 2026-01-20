import React from 'react';

export default function ColumnCard({ title, children, className = '' }) {
  return (
    <div className={`column card ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}