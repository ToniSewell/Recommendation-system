import React from 'react';
import './PostsSidebar.css';

function importAll(r) {
  return r.keys().map(r);
}

let images = [];
try {
  // import images from src/posts (png/jpg/svg/gif)
  images = importAll(require.context('./posts', false, /\.(png|jpe?g|svg|gif)$/));
} catch (err) {
  images = [];
}

export default function PostsSidebar() {
  return (
    <aside className="posts-sidebar" aria-label="Posts list">
      <div className="posts-header">Posts</div>

      {images.length === 0 ? (
        <div className="posts-empty">No posts found in src/posts</div>
      ) : (
        <div className="posts-list">
          {images.map((src, idx) => (
            <div className="post-item" key={idx}>
              <img src={src} alt={`post-${idx}`} />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}