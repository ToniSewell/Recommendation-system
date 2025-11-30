import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css'; // reuse shared styles

export default function RecencyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likesScore = location.state?.likesScore || 0;
  const followScore = location.state?.followScore || 0;
  const hashtagScore = location.state?.hashtagScore || 0;
  const followerLikeScore = location.state?.followerLikeScore || 0;

  const [recencyScore, setRecencyScore] = useState(0);
  const [weight, setWeight] = useState(0);
  const [minutesAgo, setMinutesAgo] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  // need to check the correctness of this
  // maybe it should instead be -recencyScore.. 
  const finalScore = likesScore + followScore + hashtagScore + followerLikeScore + recencyScore;

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  // let's edit this to be correct
  useEffect(() => {
    const calcScore = -(weight / 10) * minutesAgo;
    setRecencyScore(calcScore);
    if (minutesAgo > 0) setShowToast(true);
  }, [weight, minutesAgo]);

  return (
    <div className="likes-page">
      {/* Left Column */}
      <div className="column card profile-section">
        <h2>Pic & Post</h2>
        {currentView === 'bio' ? (
          <div className="profile-card">
            <img src={process.env.PUBLIC_URL + '/profile_pic.png'} alt="Mo" width={120} height={120} className="profile-img" />
            <h3>Mo</h3>
            <p><strong>Followed users:</strong> @selena_swift</p>
            <p><strong>Followed hashtags:</strong> #music, #art</p>
            <p><strong>Bio:</strong> Mo enjoys doing drawing and painting in his free time. He plays the flute in the school band and is a massive fan of Selena Swift!</p>
          </div>
        ) : (
          <div className="post-preview">
            <img src="/post.png" alt="Post visual" width={300} height={500} />
          </div>
        )}
        <div className="carousel-controls">
          <img src="/back_arrow.png" alt="Back" onClick={toggleView} className="nav-arrow" />
          <div className="dots">
            <span className={currentView === 'bio' ? 'dot active' : 'dot'}></span>
            <span className={currentView === 'post' ? 'dot active' : 'dot'}></span>
          </div>
          <img src={process.env.PUBLIC_URL + '/forward_arrow.png'} alt="Forward" onClick={toggleView} className="nav-arrow" />
        </div>
      </div>

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Algorithm Builder</h2>

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
          <h3>2. How many days ago was the post uploaded?</h3>
          <input
            type="number"
            min="0"
            placeholder="Enter number of days"
            value={minutesAgo}
            onChange={(e) => setMinutesAgo(Number(e.target.value))}
          />
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span>( - </span>
            <span className="fraction">
              <span className="boxed">{weight}</span>
              <span className="line"></span>
              <span>10</span>
            </span>
            <span>) × </span>
            <span className="boxed">{minutesAgo}</span>
            <span className="math-symbol"> = </span>
            <strong>{recencyScore.toFixed(2)}</strong>
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
        <hr />
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the recency score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/paid-promotion', {
                state: {
                  likesScore,
                  followScore,
                  hashtagScore,
                  followerLikeScore,
                  recencyScore
                }
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
