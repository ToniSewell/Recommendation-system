import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LikesCalculator } from './LikesCalculator';
import './LikesPage.css';
import PostsSidebar from './PostsSidebar';
import ColumnCard from './components/ColumnCard';
import ProfileCard from './components/ProfileCard';

export default function LikesPage() {
  const [likesScore, setLikesScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const finalScore = likesScore + score2 + score3 + score4;

  const [currentView, setCurrentView] = useState('bio'); // 'bio' or 'post'

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  return (
    <div className="likes-page" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <PostsSidebar />

      <ColumnCard title="User" className="profile-section">
        <ProfileCard
          name="Mo"
          imgSrc={process.env.PUBLIC_URL + '/profile_pic.png'}
          meta={[
            '<strong>Followed users:</strong> @selena_swift',
            '<strong>Followed hashtags:</strong> #music, #art'
          ]}
          bio="Mo enjoys doing drawing and painting in his free time. He plays the flute in the school band and is a massive fan of Selena Swift!"
        />
      </ColumnCard>

      <ColumnCard title="Algorithm Builder: Likes" className="builder-section">
        <LikesCalculator
          onScoreChange={(score) => {
            setLikesScore(score);
            setShowToast(true);
          }}
        />
      </ColumnCard>

      <ColumnCard title="Final Score Breakdown" className="score-section">
        <p>1. Number of likes = <strong>{likesScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>2. ... = <strong>{score2.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>3. ... = <strong>{score3.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>4. ... = <strong>{score4.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>5. ... = <strong>{score4.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>6. ... = <strong>{score4.toFixed(2)}</strong></p>
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </ColumnCard>

      {/* Toast Popup */}
      {showToast && finalScore > 0 && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the likes score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/follow-poster', { state: { likesScore } })
            }
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
