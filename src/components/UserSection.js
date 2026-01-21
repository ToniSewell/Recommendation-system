import React from 'react';
import ColumnCard from './ColumnCard';
import ProfileCard from './ProfileCard';

export default function UserSection({
  title = 'User',
  name = 'Mo',
  imgSrc = process.env.PUBLIC_URL + '/profile_pic.png',
  meta = [],
  bio = '',
  className = '',
}) {
  return (
    <ColumnCard title={title} className={`profile-section ${className}`.trim()}>
      <ProfileCard name={name} imgSrc={imgSrc} meta={meta} bio={bio} />
    </ColumnCard>
  );
}