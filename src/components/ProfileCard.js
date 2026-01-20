import React from 'react';

export default function ProfileCard({ name = 'Mo', imgSrc, meta = [], bio }) {
  return (
    <div className="profile-card">
      {imgSrc && <img src={imgSrc} alt={name} width={120} height={120} className="profile-img" />}
      <h3>{name}</h3>
      {meta.map((m, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: m }} />
      ))}
      {bio && <p><strong>Bio:</strong> {bio}</p>}
    </div>
  );
}