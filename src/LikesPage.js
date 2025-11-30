import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LikesCalculator } from './LikesCalculator';
import './LikesPage.css';

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
    <div className="likes-page">

      {/* Left Column */}
      <div className="column card profile-section">
        <h2>Pic & Post</h2>

        {currentView === 'bio' ? (
          <div className="profile-card">
            <img
              src={process.env.PUBLIC_URL + '/profile_pic.png'}
              alt="Mo"
              width={120}
              height={120}
              className="profile-img"
            />
            <h3>Mo</h3>
            <p><strong>Followed users:</strong> @selena_swift</p>
            <p><strong>Followed hashtags:</strong> #music, #art</p>
            <p><strong>Bio:</strong> Mo enjoys doing drawing and painting in his free time. He plays the flute in the school band and is a massive fan of Selena Swift!</p>
          </div>
        ) : (
          <div className="post-preview">
            <img
              src={process.env.PUBLIC_URL + '/post.png'}
              alt="Post visual"
              width={300}
              height={500}
            />
          </div>
        )}

        {/* Arrows + Dots */}
        <div className="carousel-controls">
          <img
            src={process.env.PUBLIC_URL + '/back_arrow.png'}
            alt="Back"
            onClick={toggleView}
            className="nav-arrow"
          />
          <div className="dots">
            <span className={currentView === 'bio' ? 'dot active' : 'dot'}></span>
            <span className={currentView === 'post' ? 'dot active' : 'dot'}></span>
          </div>
          <img
            src={process.env.PUBLIC_URL + '/forward_arrow.png'}
            alt="Forward"
            onClick={toggleView}
            className="nav-arrow"
          />
        </div>
      </div>

      {/* Builder Section */}
      <div className="column card builder-section">
        <h2>Algorithm Builder: Likes</h2>
        <LikesCalculator
          onScoreChange={(score) => {
            setLikesScore(score);
            setShowToast(true); // Keep toast visible
          }}
        />
      </div>

      {/* Final Score Section */}
      <div className="column card score-section">
        <h2>Final Score Breakdown</h2>
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
      </div>

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
