import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css';

export default function FollowHashtagsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likesScore = location.state?.likesScore || 0;
  const followScore = location.state?.followScore || 0;

  const [hashtagScore, setHashtagScore] = useState(0);
  const [score4, setScore4] = useState(0); // Placeholder for future use
  const [numHashtagsFollowed, setNumHashtagsFollowed] = useState(0);
  const [weight, setWeight] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  const finalScore = likesScore + followScore + hashtagScore + score4;

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  useEffect(() => {
    const calcScore = (weight / 10) * numHashtagsFollowed;
    setHashtagScore(calcScore);
    if (numHashtagsFollowed > 0) setShowToast(true);
  }, [weight, numHashtagsFollowed]);

  return (
    <div className="likes-page">
      {/* Left Column */}
      <div className="column card profile-section">
        <h2>Pic & Post</h2>
        {currentView === 'bio' ? (
          <img
            src={process.env.PUBLIC_URL + "/profile_pic.png"}
            alt="Mo"
            width={120}
            height={120}
            className="profile-img"
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/post.png"}
            alt="Post visual"
            width={300}
            height={500}
          />
        )}
        <div className="carousel-controls">
          <img
            src={process.env.PUBLIC_URL + "/back_arrow.png"}
            alt="Back"
            onClick={toggleView}
            className="nav-arrow"
          />
          <div className="dots">
            <span className={currentView === 'bio' ? 'dot active' : 'dot'}></span>
            <span className={currentView === 'post' ? 'dot active' : 'dot'}></span>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/forward_arrow.png"}
            alt="Forward"
            onClick={toggleView}
            className="nav-arrow"
          />        
          </div>
      </div>

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Algorithm Builder: Hashtags</h2>

        <div className="input-block">
          <h3>1. Choose a weight (0–10):</h3>
          <input
            type="range"
            min="0"
            max="10"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <div>Importance: {weight}/10</div>
        </div>

        <div className="input-block">
          <h3>2. How many hashtags does the user follow from the post?</h3>
          <input
            type="number"
            min="0"
            max="10"
            value={numHashtagsFollowed}
            onChange={(e) => setNumHashtagsFollowed(Number(e.target.value))}
          />
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span className="fraction">
              <span className="boxed">{weight}</span>
              <span className="line"></span>
              <span>10</span>
            </span>
            <span className="math-symbol">×</span>
            <span className="boxed">{numHashtagsFollowed}</span>
            <span className="math-symbol">=</span>
            <strong>{hashtagScore.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="column card score-section">
        <h2>Final Score Breakdown</h2>
        <p>1. Number of likes = <strong>{likesScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>2. Follows poster = <strong>{followScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>3. Follows hashtags = <strong>{hashtagScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>4. ... = <strong>{score4.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>5. ... = <strong>{score4.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>6. ... = <strong>{score4.toFixed(2)}</strong></p>
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the hashtag follow score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/liked-by-followed-users', {
                state: { likesScore, followScore, hashtagScore },
              })
            }
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}