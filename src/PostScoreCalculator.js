// Simple CSV parser + scoring calculator for fake_posts.csv
// Usage (Node): node src/PostScoreCalculator.js
import fs from 'fs';
import path from 'path';

/**
 * Parse the project's fake_posts.csv into records.
 * Handles captions that may contain commas by using field positions:
 * user, caption..., image link, hashtags, liked by, number of likes
 */
export function parseFakePostsCsv(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // header -> discard if present
  const header = lines[0].toLowerCase().startsWith('user,') ? lines.shift() : null;

  const rows = lines.map((line) => {
    const parts = line.split(',');
    // image link is at index len - 4
    if (parts.length < 6) return null;
    const imageIdx = parts.length - 4;
    const user = parts[0].trim();
    const caption = parts.slice(1, imageIdx).join(',').trim();
    const image = parts[imageIdx].trim();
    const hashtags = parts[imageIdx + 1].trim();
    const likedBy = parts[imageIdx + 2].trim();
    const likesRaw = parts[imageIdx + 3].trim();
    const numberOfLikes = Number(likesRaw) || 0;

    const hashtagsList = hashtags ? hashtags.split(/[;|]/).map((s) => s.trim().toLowerCase()).filter(Boolean) : [];
    const likedByList = likedBy ? likedBy.split(/[;|]/).map((s) => s.trim()).filter(Boolean) : [];

    return {
      user,
      caption,
      image,
      hashtags: hashtagsList,
      likedBy: likedByList,
      numberOfLikes,
    };
  }).filter(Boolean);

  return rows;
}

/**
 * Calculate scores for an array of post records.
 *
 * posts: [{ user, caption, image, hashtags:[], likedBy:[], numberOfLikes }]
 * options:
 *   currentUser: string
 *   followedUsers: string[] // users current user follows
 *   followedHashtags: string[] // lowercase
 *   weights: { likes, followsPoster, hashtags, followerLikes, recency, paid } each 0-10
 *   recencyDaysMap: { [postIndexOrId]: daysAgo } optional
 *   promotedSet: Set of usernames or post indices that are promoted (optional)
 *
 * Returns posts with breakdown and finalScore.
 */
export function calculateScores(posts, options = {}) {
  const {
    currentUser = 'Mo',
    followedUsers = [],
    followedHashtags = [],
    weights = { likes: 5, followsPoster: 5, hashtags: 5, followerLikes: 5, recency: 0, paid: 0 },
    recencyDaysMap = {},
    promotedSet = new Set(),
  } = options;

  // helper normalizers
  const likesNormalizer = (n) => Math.log10(1 + n); // compress large like counts
  const clampWeight = (w) => Math.max(0, Math.min(10, Number(w) || 0));

  const wLikes = clampWeight(weights.likes) / 10;
  const wFollowsPoster = clampWeight(weights.followsPoster) / 10;
  const wHashtags = clampWeight(weights.hashtags) / 10;
  const wFollowerLikes = clampWeight(weights.followerLikes) / 10;
  const wRecency = clampWeight(weights.recency) / 10;
  const wPaid = clampWeight(weights.paid) / 10;

  return posts.map((post, idx) => {
    const likesScore = wLikes * likesNormalizer(post.numberOfLikes);

    const followsPoster = followedUsers.includes(post.user) ? 1 : 0;
    const followsPosterScore = wFollowsPoster * followsPoster;

    const matchingHashtags = post.hashtags.filter((h) => followedHashtags.includes(h)).length;
    const hashtagsScore = wHashtags * matchingHashtags;

    const matchingFollowerLikes = post.likedBy.filter((u) => followedUsers.includes(u)).length;
    const followerLikeScore = wFollowerLikes * matchingFollowerLikes;

    const daysAgo = recencyDaysMap[idx] ?? recencyDaysMap[post.user] ?? null;
    // recency score: more recent -> higher. If daysAgo not provided, recencyScore = 0
    const recencyScore = daysAgo == null ? 0 : wRecency * Math.max(0, (30 - Number(daysAgo)) / 30);

    const isPromoted = promotedSet.has(post.user) || promotedSet.has(idx);
    const paidScore = wPaid * (isPromoted ? 10 : 0);

    const finalScore = likesScore + followsPosterScore + hashtagsScore + followerLikeScore + recencyScore + paidScore;

    return {
      ...post,
      index: idx,
      breakdown: {
        likesScore,
        followsPosterScore,
        hashtagsScore,
        followerLikeScore,
        recencyScore,
        paidScore,
      },
      finalScore,
    };
  }).sort((a, b) => b.finalScore - a.finalScore);
}

/* If invoked directly, parse fake_posts.csv and run an example calculation */
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].endsWith('PostScoreCalculator.js')) {
  const csvPath = path.resolve(process.cwd(), 'fake_posts.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('fake_posts.csv not found at project root:', csvPath);
    process.exit(1);
  }
  const csvText = fs.readFileSync(csvPath, 'utf8');
  const posts = parseFakePostsCsv(csvText);

  // example options — adjust to match the app's current user choices
  const options = {
    currentUser: 'Mo',
    followedUsers: ['selena_swift', 'footy_is_my_lyfe', 'fit_fiona', 'art_amy'],
    followedHashtags: ['music', 'art', 'fitness'],
    weights: { likes: 7, followsPoster: 8, hashtags: 5, followerLikes: 6, recency: 4, paid: 0 },
    recencyDaysMap: {}, // leave empty if not available
    promotedSet: new Set(), // add usernames or indices of promoted posts
  };

  const scored = calculateScores(posts, options);
  console.log('Top 10 scored posts:');
  console.table(scored.slice(0, 10).map((p) => ({
    index: p.index,
    user: p.user,
    caption: p.caption.slice(0, 60) + (p.caption.length > 60 ? '...' : ''),
    likes: p.numberOfLikes,
    finalScore: Number(p.finalScore.toFixed(4)),
  })));
}
