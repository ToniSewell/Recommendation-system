//
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css'; // Reuse styles from LikesPage
import postImg from './assets/post.png'; // added import
import profilePic from './assets/profile_pic.png';
import backArrow from './assets/back_arrow.png';
import forwardArrow from './assets/forward_arrow.png';


export default function FollowPosterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get score from Likes page
  const likesScore = location.state?.likesScore || 0;

  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);

  const finalScore = likesScore + score2 + score3 + score4;

  const [weight, setWeight] = useState(0);
  const [followsPoster, setFollowsPoster] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  useEffect(() => {
    const binary = followsPoster === 'yes' ? 1 : 0;
    const calcScore = (weight / 10) * binary;
    setScore2(calcScore);
    if (followsPoster !== null) setShowToast(true);
  }, [weight, followsPoster]);

  return (
    <div className="likes-page">
      {/* Left Column */}
      <div className="column card profile-section">
        <h2>Pic & Post</h2>
        {currentView === 'bio' ? (
          <div className="profile-card">
            <img src={profilePic} alt="Mo" width={120} height={120} className="profile-img" />
            <h3>Mo</h3>
            <p><strong>Followed users:</strong> @selena_swift</p>
            <p><strong>Followed hashtags:</strong> #music, #art</p>
            <p><strong>Bio:</strong> Mo enjoys doing drawing and painting in his free time. He plays the flute in the school band and is a massive fan of Selena Swift!</p>
          </div>
        ) : (
          <div className="post-preview">
            <img src={postImg} alt="Post visual" width={300} height={500} />
          </div>
        )}
        <div className="carousel-controls">
          <img src={backArrow} alt="Back" onClick={toggleView} className="nav-arrow" />
          <div className="dots">
            <span className={currentView === 'bio' ? 'dot active' : 'dot'}></span>
            <span className={currentView === 'post' ? 'dot active' : 'dot'}></span>
          </div>
          <img src={forwardArrow} alt="Forward" onClick={toggleView} className="nav-arrow" />
        </div>
      </div>

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Algorithm Builder: Follow Poster</h2>

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
          <h3>2. Does the user follow the poster?</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="follow"
                value="yes"
                checked={followsPoster === 'yes'}
                onChange={() => setFollowsPoster('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="follow"
                value="no"
                checked={followsPoster === 'no'}
                onChange={() => setFollowsPoster('no')}
              />
              No
            </label>
          </div>
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
            <span className="boxed">{followsPoster === 'yes' ? 1 : 0}</span>
            <span className="math-symbol">=</span>
            <strong>{score2.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="column card score-section">
        <h2>Final Score Breakdown</h2>
        <p>1. Number of likes = <strong>{likesScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>2. Follows poster = <strong>{score2.toFixed(2)}</strong></p>
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

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the follow poster score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/hashtags', {
                state: { likesScore, followScore: score2 },
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
