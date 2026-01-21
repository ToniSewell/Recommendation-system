import React from 'react';
import PostsSidebar from '../PostsSidebar';
import './PageLayout.css'; // optional: small layout-specific overrides

// children: the main content (columns) rendered to the right of the sidebar
export default function PageLayout({ children, sidebar = <PostsSidebar />, className = '' }) {
  return (
    <div className={`page-layout ${className}`.trim()}>
      {sidebar}
      <div className="page-main">
        {children}
      </div>
    </div>
  );
}