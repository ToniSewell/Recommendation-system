import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './LikesPage.css';

export default function PaidPromotionPage() {
  const location = useLocation();

  const likesScore = location.state?.likesScore || 0;
  const followScore = location.state?.followScore || 0;
  const hashtagScore = location.state?.hashtagScore || 0;
  const followerLikeScore = location.state?.followerLikeScore || 0;
  const recencyScore = location.state?.recencyScore || 0;

  const [paidScore, setPaidScore] = useState(0);
  const [isPromoted, setIsPromoted] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  const finalScore =
    likesScore + followScore + hashtagScore + followerLikeScore + recencyScore + paidScore;

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  useEffect(() => {
    if (isPromoted === null) return;
    setPaidScore(isPromoted === 'yes' ? 10 : 0);
    setShowToast(true);
  }, [isPromoted]);

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
            <p><strong>Bio:</strong> Mo enjoys drawing and painting in his free time. He plays the flute in the school band and is a massive fan of Selena Swift!</p>
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

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Algorithm Builder</h2>

        <div className="input-block">
          <h3>1. Has the content paid to be promoted?</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paid"
                value="yes"
                checked={isPromoted === 'yes'}
                onChange={() => setIsPromoted('yes')}
              />
              Yes (+10 points)
            </label>
            <label>
              <input
                type="radio"
                name="paid"
                value="no"
                checked={isPromoted === 'no'}
                onChange={() => setIsPromoted('no')}
              />
              No (0 points)
            </label>
          </div>
        </div>

        <div className="score-display">
          <h3>2. Calculated Score:</h3>
          <div className="score-breakdown">
            <strong>{paidScore} points</strong>
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
        <p>4. Followed users liked = <strong>{followerLikeScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>5. Recency = <strong>{recencyScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>6. Paid promotion = <strong>{paidScore.toFixed(2)}</strong></p>

        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the final score! 🎉<br />
            You can now use this to rank content.
          </p>
          <button
            className="next-button"
            onClick={() => setShowToast(false)}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
