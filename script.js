/* ═══════════════════════════════════════════════
   WISDOM PATHS — Script v1.1
   New: Speaker Collection · Quote of the Day
   ═══════════════════════════════════════════════ */
'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// QUOTES DATA
// ══════════════════════════════════════════════════════════════════════════════
const CATEGORY_ACCENT = {
  philosophy:     "var(--col-philosophy)",
  spirituality:   "var(--col-spirituality)",
  anime:          "var(--col-anime)",
  manga:          "var(--col-manga)",
  proverb:        "var(--col-proverb)",
  "martial arts": "var(--col-martial)",
};

const RANKS = [
  { min: 0,    label: "Wandering Soul",     emoji: "🌑" },
  { min: 50,   label: "Seeker of Truth",    emoji: "🌒" },
  { min: 150,  label: "Awakened Mind",      emoji: "🌓" },
  { min: 300,  label: "Scholar of Paths",   emoji: "🌔" },
  { min: 500,  label: "Sage in Training",   emoji: "🌕" },
  { min: 750,  label: "Keeper of Wisdom",   emoji: "⭐" },
  { min: 1000, label: "Enlightened Master", emoji: "✨" },
];

const COMBO_MSGS = { 3:"🔥 ON FIRE", 5:"⚡ UNSTOPPABLE", 7:"🌟 LEGENDARY", 10:"💫 OMNISCIENT" };
const LEGENDARY_CHANCE = 0.1;
const DIFF_TIMES = { easy: 15, normal: 10, hard: 6 };

// ══════════════════════════════════════════════════════════════════════════════
// SPEAKER BIOS  (covers every unique realAuthor in QUOTES_DATA)
// ══════════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════════
// DATA — loaded from quotes.json at startup
// ══════════════════════════════════════════════════════════════════════════════
let QUOTES_DATA = [];
let ALL_SPEAKERS = [];
let AUTHOR_GROUPS = {};
let SPEAKER_BIOS = {};

const CAT_ICONS = {
  philosophy: "⚖️", spirituality: "☯️", anime: "⚔️",
  manga: "📖", proverb: "🌿", "martial arts": "🥋",
};

async function loadQuotesData() {
  const res = await fetch('quotes.json');
  if (!res.ok) throw new Error('Failed to load quotes.json');
  const data = await res.json();
  QUOTES_DATA   = data.quotes;
  ALL_SPEAKERS  = data.speakers;
  AUTHOR_GROUPS = data.authorGroups;
  SPEAKER_BIOS  = data.speakerBios || {};
}

// ══════════════════════════════════════════════════════════════════════════════
// SOUND  (single shared AudioContext — required for reliable mobile audio)
// ══════════════════════════════════════════════════════════════════════════════
const SFX = { enabled: true };
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Mobile suspends the context automatically — resume it on every call
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume();
  }
  return _audioCtx;
}

// Unlock audio on very first user interaction (critical for mobile)
function unlockAudio() {
  if (_audioCtx) return;
  _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // Play a silent buffer to fully unlock
  const buf = _audioCtx.createBuffer(1, 1, 22050);
  const src = _audioCtx.createBufferSource();
  src.buffer = buf;
  src.connect(_audioCtx.destination);
  src.start(0);
  document.removeEventListener('touchstart', unlockAudio);
  document.removeEventListener('touchend',   unlockAudio);
  document.removeEventListener('click',      unlockAudio);
}
document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('touchend',   unlockAudio, { once: true });
document.addEventListener('click',      unlockAudio, { once: true });

function tone(freq, dur, type='sine', vol=0.12) {
  if (!SFX.enabled) return;
  try {
    const ctx = getAudioCtx();
    const play = () => {
      try {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur);
      } catch(e) {}
    };
    // If context is already running, play immediately
    // If suspended, wait for resume() to complete first
    if (ctx.state === 'running') {
      play();
    } else {
      ctx.resume().then(play);
    }
  } catch(e) {}
}
const playCorrect   = () => { tone(523,.15,'triangle',.35); setTimeout(()=>tone(659,.2,'triangle',.3),100); setTimeout(()=>tone(784,.3,'triangle',.25),200); };
const playWrong     = () => { tone(200,.3,'sawtooth',.08); setTimeout(()=>tone(160,.3,'sawtooth',.06),150); };
const playPageTurn  = () => { tone(800,.08,'sine',.04); setTimeout(()=>tone(1000,.06,'sine',.03),60); };
const playClick     = () => tone(440,.05,'sine',.06);
const playTick      = () => tone(1200,.05,'sine',.04);
const playUrgent    = () => tone(880,.08,'square',.06);
const playLegendary = () => { tone(523,.15,'sine',.1); setTimeout(()=>tone(659,.15,'sine',.1),150); setTimeout(()=>tone(784,.15,'sine',.1),300); setTimeout(()=>tone(1046,.4,'sine',.12),450); };

// ══════════════════════════════════════════════════════════════════════════════
// STORAGE KEYS
// ══════════════════════════════════════════════════════════════════════════════
const K = {
  name:           'wp_player_name',
  onboarded:      'wp_onboarded',
  best:           'wp_best_score',
  streak:         'wp_daily_streak',
  lastPlay:       'wp_last_play_date',
  leaderboard:    'wp_leaderboard',
  unlocked:       'wp_unlocked',
  achievements:   'wp_achievements',
  legendaryCount: 'wp_legendary_count',
  memberSince:    'wp_member_since',     // ISO date string of first launch
  stats:          'wp_stats',            // { gamesPlayed, totalCorrect, totalWrong, bestAnswerStreak, bestDayStreak, totalQuestions, catCounts:{} }
};

// ══════════════════════════════════════════════════════════════════════════════
// COLLECTION STORAGE
// ══════════════════════════════════════════════════════════════════════════════
function loadUnlocked() {
  try { return JSON.parse(localStorage.getItem(K.unlocked) || '{}'); }
  catch { return {}; }
}
function saveUnlocked(data) {
  localStorage.setItem(K.unlocked, JSON.stringify(data));
}
function unlockQuote(author, quoteText) {
  const data = loadUnlocked();
  if (!data[author]) data[author] = [];
  if (!data[author].includes(quoteText)) {
    data[author].push(quoteText);
    saveUnlocked(data);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PLAYER PROFILE STORAGE
// ══════════════════════════════════════════════════════════════════════════════
function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(K.stats) || '{}');
  } catch { return {}; }
}
function saveStats(s) {
  localStorage.setItem(K.stats, JSON.stringify(s));
}

// Called at end of every game — updates cumulative stats
function updateStats(correct, wrong, answerStreak, mode) {
  const s = loadStats();
  s.gamesPlayed    = (s.gamesPlayed    || 0) + 1;
  s.totalCorrect   = (s.totalCorrect   || 0) + correct;
  s.totalWrong     = (s.totalWrong     || 0) + wrong;
  s.totalQuestions = (s.totalQuestions || 0) + correct + wrong;
  s.bestAnswerStreak = Math.max(s.bestAnswerStreak || 0, answerStreak);
  s.bestDayStreak    = Math.max(s.bestDayStreak    || 0, getCurrentStreak());
  // Track category play counts for favourite category
  if (!s.catCounts) s.catCounts = {};
  const cat = mode === 'endless' ? 'all' : mode;
  s.catCounts[cat] = (s.catCounts[cat] || 0) + 1;
  saveStats(s);
}

// Record first-launch date
function ensureMemberSince() {
  if (!localStorage.getItem(K.memberSince)) {
    localStorage.setItem(K.memberSince, new Date().toISOString());
  }
}
function getMemberSince() {
  const iso = localStorage.getItem(K.memberSince);
  if (!iso) return 'Today';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

// Derive favourite category from catCounts
function getFavouriteCategory(catCounts) {
  if (!catCounts) return null;
  const entries = Object.entries(catCounts).filter(([k]) => k !== 'all');
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  const cat = entries[0][0];
  const icons = { philosophy:'⚖️', spirituality:'☯️', anime:'⚔️', manga:'📖', proverb:'🌿', 'martial arts':'🥋' };
  return (icons[cat] || '') + ' ' + cat.charAt(0).toUpperCase() + cat.slice(1);
}

// ── Render the profile screen ─────────────────────────────────────────────────
function renderProfile() {
  const name     = localStorage.getItem(K.name) || 'Seeker';
  const stats    = loadStats();
  const unlocked = loadUnlocked();
  const earned   = loadEarnedAchievements();
  const best     = getBest();
  const rank     = getRank(best);

  // Header
  $('profileName').textContent  = name;
  $('profileSince').textContent = 'Member since ' + getMemberSince();
  const fav = getFavouriteCategory(stats.catCounts);
  const favEl = $('profileFavCat');
  if (fav) { favEl.textContent = 'Favourite: ' + fav; favEl.style.display = ''; }
  else      { favEl.style.display = 'none'; }

  // Rank banner with progress to next rank
  $('profileRankEmoji').textContent = rank.emoji;
  $('profileRankName').textContent  = rank.label;
  const rankIdx  = RANKS.indexOf(rank);
  const nextRank = RANKS[rankIdx + 1];
  if (nextRank) {
    const needed = nextRank.min - rank.min;
    const have   = best - rank.min;
    const pct    = Math.min(100, Math.round((have / needed) * 100));
    $('profileRankFill').style.width = pct + '%';
    $('profileRankNext').textContent = (nextRank.min - best) + ' pts to ' + nextRank.label;
  } else {
    $('profileRankFill').style.width = '100%';
    $('profileRankNext').textContent = 'Maximum rank reached ✨';
  }

  // Core stats
  const totalCorrect = stats.totalCorrect   || 0;
  const totalWrong   = stats.totalWrong     || 0;
  const totalQ       = totalCorrect + totalWrong;
  const accuracy     = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
  $('pStatGames').textContent       = stats.gamesPlayed    || 0;
  $('pStatBest').textContent        = best;
  $('pStatCorrect').textContent     = totalCorrect;
  $('pStatAccuracy').textContent    = accuracy + '%';
  $('pStatStreak').textContent      = getCurrentStreak();
  $('pStatBestStreak').textContent  = stats.bestDayStreak    || 0;
  $('pStatAnswerStreak').textContent= stats.bestAnswerStreak || 0;
  $('pStatQuestions').textContent   = stats.totalQuestions   || 0;

  // Collection
  const allAuthors       = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  const speakersUnlocked = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  const quotesUnlocked   = Object.values(unlocked).reduce((n, arr) => n + arr.length, 0);
  const collPct          = Math.round((speakersUnlocked / allAuthors.length) * 100);
  $('pCollSpeakers').textContent = speakersUnlocked + ' / ' + allAuthors.length + ' speakers';
  $('pCollQuotes').textContent   = quotesUnlocked + ' / ' + QUOTES_DATA.length + ' quotes';
  $('pCollBar').style.width      = collPct + '%';
  $('pCollPct').textContent      = collPct + '%';

  // Best category (most quotes unlocked)
  const catTotals = {};
  QUOTES_DATA.forEach(q => { catTotals[q.category] = (catTotals[q.category] || 0) + 1; });
  const catProgress = Object.entries(catTotals).map(([cat, total]) => {
    const done = QUOTES_DATA.filter(q => q.category === cat && (unlocked[q.realAuthor] || []).includes(q.text)).length;
    return { cat, done, total, pct: Math.round((done / total) * 100) };
  }).sort((a, b) => b.pct - a.pct);
  const bestCat = catProgress[0];
  const catIcons = { philosophy:'⚖️', spirituality:'☯️', anime:'⚔️', manga:'📖', proverb:'🌿', 'martial arts':'🥋' };
  $('pBestCat').textContent = bestCat && bestCat.done > 0
    ? 'Best: ' + (catIcons[bestCat.cat] || '') + ' ' + bestCat.cat + ' (' + bestCat.pct + '% complete)'
    : '';

  // Recent achievements (last 3 earned, shown as chips)
  const ACHIEVEMENT_MAP = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]));
  const earnedArr = [...earned].map(id => ACHIEVEMENT_MAP[id]).filter(Boolean);
  const recent = earnedArr.slice(-3).reverse();
  const achRow   = $('profileAchRow');
  const achEmpty = $('profileAchEmpty');
  if (recent.length === 0) {
    achRow.innerHTML = '';
    achEmpty.classList.remove('hidden');
  } else {
    achEmpty.classList.add('hidden');
    achRow.innerHTML = recent.map(a =>
      `<div class="profile-ach-chip">
        <span class="profile-ach-chip-icon">${a.icon}</span>${a.title}
      </div>`
    ).join('');
  }

  // Pre-fill edit input
  $('profileNameInput').value = name;
}
const ACHIEVEMENTS = [
  // Score milestones — normal mode only
  { id:'score_50',     icon:'🌱', title:'First Steps',      desc:'Score 50 pts in one normal game',           mode:'normal', check:(s,ds,x) => s.score >= 50 },
  { id:'score_100',    icon:'📜', title:'Century',          desc:'Score 100 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 100 },
  { id:'score_300',    icon:'🔮', title:'Scholar',          desc:'Score 300 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 300 },
  { id:'score_500',    icon:'⚡', title:'Sage',             desc:'Score 500 pts in one normal game',          mode:'normal', check:(s,ds,x) => s.score >= 500 },
  { id:'score_1000',   icon:'🌟', title:'Enlightened',      desc:'Score 1000 pts in one normal game',         mode:'normal', check:(s,ds,x) => s.score >= 1000 },
  { id:'score_2000',   icon:'✨', title:'Transcendent',     desc:'Score 2000 pts in one normal game',         mode:'normal', check:(s,ds,x) => s.score >= 2000 },
  // Answer streak — normal mode only
  { id:'streak_3',     icon:'🔥', title:'On Fire',          desc:'Reach a 3× streak in normal mode',          mode:'normal', check:(s,ds,x) => s.streak >= 3 },
  { id:'streak_7',     icon:'💥', title:'Unstoppable',      desc:'Reach a 7× streak in normal mode',          mode:'normal', check:(s,ds,x) => s.streak >= 7 },
  { id:'streak_15',    icon:'🌠', title:'Legendary Streak', desc:'Reach a 15× streak in normal mode',         mode:'normal', check:(s,ds,x) => s.streak >= 15 },
  { id:'streak_25',    icon:'💫', title:'Omniscient',       desc:'Reach a 25× streak in normal mode',         mode:'normal', check:(s,ds,x) => s.streak >= 25 },
  // Daily comeback — both modes
  { id:'daily_3',      icon:'📅', title:'Devoted',          desc:'Play 3 days in a row',                      mode:'any',    check:(s,ds,x) => ds >= 3 },
  { id:'daily_7',      icon:'🗓️', title:'Faithful',         desc:'Play 7 days in a row',                      mode:'any',    check:(s,ds,x) => ds >= 7 },
  { id:'daily_30',     icon:'🏆', title:'Obsessed',         desc:'Play 30 days in a row',                     mode:'any',    check:(s,ds,x) => ds >= 30 },
  // Legendary quotes — normal mode only
  { id:'legendary_1',  icon:'⭐', title:'First Legend',     desc:'Answer a Legendary quote correctly',         mode:'normal', check:(s,ds,x) => x.legendaryCorrect >= 1 },
  { id:'legendary_10', icon:'🌠', title:'Golden',           desc:'Answer 10 Legendary quotes correctly',       mode:'normal', check:(s,ds,x) => x.legendaryCorrect >= 10 },
  // Collection — both modes (speaker unlocking is fair in either)
  { id:'unlock_1',     icon:'🔓', title:'First Unlock',     desc:'Unlock your first speaker quote',            mode:'any',    check:(s,ds,x) => x.totalUnlocked >= 1 },
  { id:'unlock_25',    icon:'📚', title:'Halfway There',    desc:'Unlock quotes from 25 speakers',             mode:'any',    check:(s,ds,x) => x.speakersUnlocked >= 25 },
  { id:'unlock_all',   icon:'🏛️', title:'Master Collector', desc:'Unlock all 97 speakers',                     mode:'any',    check:(s,ds,x) => x.speakersUnlocked >= 97 },
  // Endless only
  { id:'endless_50',   icon:'♾️', title:'Marathoner',       desc:'Answer 50 questions in one Endless run',     mode:'endless',check:(s,ds,x) => x.isEndless && s.questionNum >= 50 },
  { id:'endless_100',  icon:'🎯', title:'Centurion',        desc:'Answer 100 questions in one Endless run',    mode:'endless',check:(s,ds,x) => x.isEndless && s.questionNum >= 100 },
];

// ── Achievement storage ───────────────────────────────────────────────────────
function loadEarnedAchievements() {
  try { return new Set(JSON.parse(localStorage.getItem(K.achievements) || '[]')); }
  catch { return new Set(); }
}
function saveEarnedAchievements(set) {
  localStorage.setItem(K.achievements, JSON.stringify([...set]));
}
function getLegendaryCount() {
  return parseInt(localStorage.getItem(K.legendaryCount) || '0', 10);
}
function incrementLegendaryCount() {
  localStorage.setItem(K.legendaryCount, String(getLegendaryCount() + 1));
}

// ── Build extra context for achievement checks ────────────────────────────────
function buildAchievementContext(isEndless) {
  const unlocked     = loadUnlocked();
  const allAuthors   = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  const totalUnlocked  = Object.values(unlocked).reduce((n, arr) => n + arr.length, 0);
  const speakersUnlocked = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  return {
    legendaryCorrect: getLegendaryCount(),
    totalUnlocked,
    speakersUnlocked,
    isEndless: !!isEndless,
  };
}

// ── Check and award new achievements — returns array of newly earned ──────────
function checkAchievements(state, dailyStreak, isEndless) {
  const earned    = loadEarnedAchievements();
  const ctx       = buildAchievementContext(isEndless);
  const newlyEarned = [];
  ACHIEVEMENTS.forEach(ach => {
    if (earned.has(ach.id)) return;
    // Enforce mode restriction
    if (ach.mode === 'normal'  &&  isEndless) return;
    if (ach.mode === 'endless' && !isEndless) return;
    // 'any' passes through always
    try {
      if (ach.check(state, dailyStreak, ctx)) {
        earned.add(ach.id);
        newlyEarned.push(ach);
      }
    } catch(e) {}
  });
  if (newlyEarned.length > 0) saveEarnedAchievements(earned);
  return newlyEarned;
}

// ── Show achievement banner (queued so multiple don't overlap) ────────────────
let _achQueue = [], _achShowing = false;
function queueAchievementBanner(ach) {
  _achQueue.push(ach);
  if (!_achShowing) showNextAchievement();
}
function showNextAchievement() {
  if (_achQueue.length === 0) { _achShowing = false; return; }
  _achShowing = true;
  const ach = _achQueue.shift();
  const banner = $('achievementBanner');
  if (!banner) { showNextAchievement(); return; }
  $('achBannerIcon').textContent  = ach.icon;
  $('achBannerTitle').textContent = ach.title;
  banner.classList.remove('hidden');
  void banner.offsetWidth;
  banner.classList.add('show');
  setTimeout(() => {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.classList.add('hidden');
      setTimeout(showNextAchievement, 200);
    }, 400);
  }, 2800);
}

// ── Render achievements screen ────────────────────────────────────────────────
function renderAchievements() {
  const earned = loadEarnedAchievements();
  const total  = ACHIEVEMENTS.length;
  const count  = earned.size;
  $('achSubtitle').textContent = `${count} / ${total} unlocked`;
  const list = $('achList');
  list.innerHTML = ACHIEVEMENTS.map(ach => {
    const isEarned  = earned.has(ach.id);
    const rowClass  = isEarned ? 'ach-row earned' : 'ach-row locked';
    const icon      = isEarned ? ach.icon : '🔒';
    return `<div class="${rowClass}">
      <div class="ach-row-icon">${icon}</div>
      <div class="ach-row-info">
        <div class="ach-row-title">${ach.title}</div>
        <div class="ach-row-desc">${ach.desc}</div>
      </div>
      <div class="ach-row-check">✓</div>
    </div>`;
  }).join('');
}
function getQuoteOfTheDay() {
  const d = new Date();
  const dateKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) - hash) + dateKey.charCodeAt(i);
    hash |= 0;
  }
  return QUOTES_DATA[Math.abs(hash) % QUOTES_DATA.length];
}
function renderQOTD() {
  const q = getQuoteOfTheDay();
  const textEl   = document.getElementById('qotdText');
  const authorEl = document.getElementById('qotdAuthor');
  if (textEl)   textEl.textContent   = '\u201C' + q.text + '\u201D';
  if (authorEl) authorEl.textContent = '\u2014 ' + q.realAuthor;
}

// ══════════════════════════════════════════════════════════════════════════════
// DAILY STREAK
// ══════════════════════════════════════════════════════════════════════════════
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function loadStreak() {
  return {
    streak:   parseInt(localStorage.getItem(K.streak)   || '0', 10),
    lastPlay: localStorage.getItem(K.lastPlay) || '',
  };
}
function updateDailyStreak() {
  const today = todayStr();
  const { streak, lastPlay } = loadStreak();
  const prev = new Date(); prev.setDate(prev.getDate() - 1);
  const yesterdayStr = `${prev.getFullYear()}-${String(prev.getMonth()+1).padStart(2,'0')}-${String(prev.getDate()).padStart(2,'0')}`;
  let next;
  if (lastPlay === today)                        next = streak;
  else if (!lastPlay || lastPlay === yesterdayStr) next = streak + 1;
  else                                           next = 1;
  localStorage.setItem(K.streak,   String(next));
  localStorage.setItem(K.lastPlay, today);
  return next;
}
const getCurrentStreak = () => loadStreak().streak;

// ══════════════════════════════════════════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════════════════════════════════════════
function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(K.leaderboard) || '[]'); }
  catch { return []; }
}
function saveRun(entry) {
  const lb = loadLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  const top = lb.slice(0, 10);
  localStorage.setItem(K.leaderboard, JSON.stringify(top));
  return top;
}
function getBest() { return parseInt(localStorage.getItem(K.best) || '0', 10); }
function saveBest(score) {
  const prev = getBest();
  if (score > prev) { localStorage.setItem(K.best, String(score)); return true; }
  return false;
}

// ══════════════════════════════════════════════════════════════════════════════
// TIMER
// ══════════════════════════════════════════════════════════════════════════════
const Timer = {
  _iv: null, _onExpire: null, _start: null, _dur: 10,
  start(seconds, onExpire) {
    this.stop();
    this._dur = seconds; this._onExpire = onExpire; this._start = performance.now();
    this._render(seconds);
    this._iv = setInterval(() => {
      const remaining = Math.max(0, seconds - (performance.now() - this._start) / 1000);
      this._render(remaining);
      if (remaining <= 0) { this.stop(); if (this._onExpire) this._onExpire(); }
    }, 100);
  },
  stop() { if (this._iv) { clearInterval(this._iv); this._iv = null; } },
  _render(rem) {
    const fill  = $('timerFill');
    const label = $('timerLabel');
    if (!fill || !label) return;
    fill.style.width = `${(rem / this._dur) * 100}%`;
    label.textContent = Math.ceil(rem);
    fill.classList.remove('warn','danger'); label.classList.remove('warn','danger');
    if (rem <= 3) {
      fill.classList.add('danger'); label.classList.add('danger');
      if (Math.abs(rem - Math.round(rem)) < 0.15) playUrgent();
    } else if (rem <= 5) {
      fill.classList.add('warn'); label.classList.add('warn');
    } else if (Math.abs(rem - Math.round(rem)) < 0.12 && rem < this._dur - 0.5) {
      playTick();
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// SHARE CARD
// ══════════════════════════════════════════════════════════════════════════════
function buildShareCard(score, correct, wrong, rankEmoji, rankLabel, dailyStreak, mode, diff) {
  const canvas = $('shareCanvas');
  const W = 800, H = 420;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#0d0d1a'); bg.addColorStop(.5,'#13101f'); bg.addColorStop(1,'#0a0a12');
  ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
  for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  const barG = ctx.createLinearGradient(0,0,W,0);
  barG.addColorStop(0,'transparent'); barG.addColorStop(.3,'#c9a84c');
  barG.addColorStop(.7,'#f0d080');    barG.addColorStop(1,'transparent');
  ctx.fillStyle = barG; ctx.fillRect(0,0,W,4); ctx.fillRect(0,H-4,W,4);
  const glow = ctx.createRadialGradient(0,H/2,0,0,H/2,200);
  glow.addColorStop(0,'rgba(201,168,76,0.08)'); glow.addColorStop(1,'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0,0,W,H);
  ctx.font = '48px serif'; ctx.fillText('☽', 52, 80);
  ctx.font = 'bold 26px "Cinzel","Georgia",serif';
  ctx.fillStyle = '#c9a84c'; ctx.fillText('WISDOM PATHS', 52, 128);
  const pName = localStorage.getItem(K.name) || 'Seeker';
  ctx.font = '700 14px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(232,224,208,0.55)';
  ctx.fillText(pName.toUpperCase(), 54, 155);
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.5)';
  ctx.fillText(`${(mode||'ALL').toUpperCase()} · ${(diff||'NORMAL').toUpperCase()}`, 54, 176);
  ctx.strokeStyle = 'rgba(201,168,76,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(52,192); ctx.lineTo(320,192); ctx.stroke();
  ctx.font = 'bold 90px "Cinzel","Georgia",serif';
  const sg = ctx.createLinearGradient(52,200,52,310);
  sg.addColorStop(0,'#f0d080'); sg.addColorStop(1,'#8a6520');
  ctx.fillStyle = sg; ctx.fillText(String(score), 52, 298);
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.6)';
  ctx.fillText('INSIGHT POINTS', 56, 326);
  if (dailyStreak > 1) {
    ctx.font = '700 14px "Rajdhani","Arial",sans-serif';
    ctx.fillStyle = 'rgba(232,224,208,0.7)';
    ctx.fillText(`🔥  DAY ${dailyStreak} STREAK`, 54, 362);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(370,30); ctx.lineTo(370,H-30); ctx.stroke();
  ctx.font = '52px serif'; ctx.fillText(rankEmoji, 420, 88);
  ctx.font = 'bold 17px "Cinzel","Georgia",serif';
  ctx.fillStyle = '#f0d080';
  ctx.fillText(rankLabel.toUpperCase(), 480, 76);
  ctx.font = 'italic 13px "Crimson Pro","Georgia",serif';
  ctx.fillStyle = 'rgba(232,224,208,0.4)';
  ctx.fillText('Rank achieved', 482, 96);
  const accuracy = correct+wrong>0 ? Math.round((correct/(correct+wrong))*100) : 0;
  const stats = [
    {label:'CORRECT',  value:correct,       color:'#4caf7d'},
    {label:'WRONG',    value:wrong,          color:'#e05555'},
    {label:'ACCURACY', value:accuracy+'%',   color:'#c9a84c'},
    {label:'BEST',     value:getBest(),      color:'#9b7fd4'},
  ];
  stats.forEach((s,i) => {
    const col = i%2, row = Math.floor(i/2);
    const x = 420+col*190, y = 152+row*100;
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    roundRect(ctx,x,y,170,75,8); ctx.fill();
    ctx.fillStyle = s.color; roundRect(ctx,x,y,4,75,[8,0,0,8]); ctx.fill();
    ctx.font = 'bold 32px "Cinzel","Georgia",serif';
    ctx.fillStyle = s.color; ctx.fillText(String(s.value), x+18, y+46);
    ctx.font = '700 10px "Rajdhani","Arial",sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillText(s.label, x+18, y+64);
  });
  ctx.font = '700 11px "Rajdhani","Arial",sans-serif';
  ctx.fillStyle = 'rgba(201,168,76,0.4)';
  ctx.fillText('wisdomPaths.app  ·  Can you beat me?', 420, H-25);
}
function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r,r,r,r];
  ctx.beginPath();
  ctx.moveTo(x+r[0],y);
  ctx.lineTo(x+w-r[1],y); ctx.quadraticCurveTo(x+w,y,x+w,y+r[1]);
  ctx.lineTo(x+w,y+h-r[2]); ctx.quadraticCurveTo(x+w,y+h,x+w-r[2],y+h);
  ctx.lineTo(x+r[3],y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r[3]);
  ctx.lineTo(x,y+r[0]); ctx.quadraticCurveTo(x,y,x+r[0],y);
  ctx.closePath();
}

// ══════════════════════════════════════════════════════════════════════════════
// GAME STATE
// ══════════════════════════════════════════════════════════════════════════════
const State = {
  score:0, lives:3, streak:0, correctCount:0, wrongCount:0,
  pool:[], currentQuote:null, answered:false,
  dailyStreak:0, questionNum:0,
  isLegendary:false,
  selectedMode:'all', selectedDiff:'normal',
  isEndless:false,
};

function resetState() {
  State.score=0; State.lives=3; State.streak=0;
  State.correctCount=0; State.wrongCount=0;
  State.currentQuote=null; State.answered=false;
  State.questionNum=0; State.isLegendary=false;
  const mode = State.selectedMode;
  const source = mode === 'all'
    ? [...QUOTES_DATA]
    : QUOTES_DATA.filter(q => q.category === mode || q.category === mode.replace('-',' '));
  State.pool = shuffle(source.length >= 4 ? source : [...QUOTES_DATA]);
}

// Tracks all pending round timeouts so they can be cancelled
const _pendingTimeouts = new Set();
function safeTimeout(fn, ms) {
  const id = setTimeout(() => { _pendingTimeouts.delete(id); fn(); }, ms);
  _pendingTimeouts.add(id);
  return id;
}
function cancelAllTimeouts() {
  _pendingTimeouts.forEach(id => clearTimeout(id));
  _pendingTimeouts.clear();
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════
function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function pickQuote() {
  if (State.pool.length===0) {
    const mode = State.selectedMode;
    const src  = mode==='all' ? [...QUOTES_DATA] : QUOTES_DATA.filter(q=>q.category===mode||q.category===mode.replace('-',' '));
    State.pool = shuffle(src.length>=4?src:[...QUOTES_DATA]);
  }
  return State.pool.pop();
}
function getFakeOptions(realAuthor, category) {
  const used=new Set([realAuthor]); const fakes=[];
  const myGroups=Object.entries(AUTHOR_GROUPS).filter(([,a])=>a.includes(realAuthor)).map(([g])=>g);
  for (const g of myGroups) {
    const pool=shuffle(AUTHOR_GROUPS[g].filter(a=>!used.has(a)));
    for (const a of pool){if(fakes.length>=2)break;fakes.push(a);used.add(a);}
    if(fakes.length>=2)break;
  }
  if(fakes.length<3){
    const sameCat=shuffle([...new Set(QUOTES_DATA.filter(q=>q.category===category&&!used.has(q.realAuthor)).map(q=>q.realAuthor))]);
    for(const a of sameCat){if(fakes.length>=3)break;fakes.push(a);used.add(a);}
  }
  if(fakes.length<3){
    const rem=shuffle(ALL_SPEAKERS.filter(a=>!used.has(a)));
    for(const a of rem){if(fakes.length>=3)break;fakes.push(a);}
  }
  return fakes.slice(0,3);
}
function getRank(score) {
  let rank=RANKS[0];
  for(const r of RANKS){if(score>=r.min)rank=r;}
  return rank;
}
const $ = id => document.getElementById(id);

function showScreen(id) {
  const all = ['screenOnboard','screenIntro','screenHowTo','screenMode',
               'screenLeaderboard','screenCollection','screenAchievements',
               'screenProfile','screenGame','screenGameOver'];
  all.forEach(s => {
    const el = $(s);
    if (el) { s===id ? el.classList.remove('hidden') : el.classList.add('hidden'); }
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// HUD
// ══════════════════════════════════════════════════════════════════════════════
function popEl(id) {
  const el=$(id); el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
}
function updateHUDHearts() {
  $('hearts').querySelectorAll('.heart').forEach((h,i)=>{
    if(i>=State.lives){h.classList.add('lost');if(i===State.lives)h.classList.add('shake');}
    else h.classList.remove('lost','shake');
  });
}
function applyCategoryStyle(category) {
  const accent=CATEGORY_ACCENT[category]||CATEGORY_ACCENT.philosophy;
  $('quoteCard').style.setProperty('--card-accent',accent);
  const badge=$('categoryBadge');
  badge.textContent=category.toUpperCase().replace(' ','');
  badge.className='category-badge badge-'+category.replace(' ','');

  // Atmospheric fog tint per category
  const fogMap = {
    'philosophy':   { bottom:'rgba(60,90,180,.14)',  top:'rgba(40,70,160,.09)'  },
    'spirituality': { bottom:'rgba(110,60,180,.14)', top:'rgba(80,40,150,.09)'  },
    'anime':        { bottom:'rgba(180,50,60,.12)',  top:'rgba(140,30,50,.08)'  },
    'manga':        { bottom:'rgba(160,100,30,.12)', top:'rgba(130,70,20,.08)'  },
    'proverb':      { bottom:'rgba(40,130,80,.12)',  top:'rgba(30,100,60,.08)'  },
    'martial arts': { bottom:'rgba(140,140,30,.12)', top:'rgba(110,110,20,.08)' },
  };
  const fog = fogMap[category] || fogMap['philosophy'];
  document.body.style.setProperty('--fog-bottom', fog.bottom);
  document.body.style.setProperty('--fog-top',    fog.top);
}

let comboTimer=null;
function showCombo(streak) {
  const msg=COMBO_MSGS[streak]||(streak>=10?COMBO_MSGS[10]:null);
  if(!msg)return;
  const b=$('comboBanner');
  b.textContent=msg+' ×'+streak;
  b.classList.remove('hidden'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(comboTimer);
  comboTimer=setTimeout(()=>{b.classList.remove('show');setTimeout(()=>b.classList.add('hidden'),400);},1800);
}

let resultTimer=null;
function showResult(isCorrect,pts) {
  const o=$('overlayResult');
  const ring=$('resultRing');
  o.classList.remove('hidden');
  if(isCorrect){
    ring.classList.remove('wrong-ring');$('resultIcon').textContent='✓';
    $('resultLabel').textContent=State.isLegendary?'LEGENDARY WISDOM!':'WISDOM GAINED';
    $('resultPoints').textContent='+'+pts;$('resultPoints').style.color='var(--correct)';
  } else {
    ring.classList.add('wrong-ring');$('resultIcon').textContent='✕';
    $('resultLabel').textContent='MISUNDERSTOOD';
    $('resultPoints').textContent='−1 ❤️';$('resultPoints').style.color='var(--wrong)';
  }
  clearTimeout(resultTimer);
  resultTimer=setTimeout(()=>o.classList.add('hidden'),1100);
}

// ══════════════════════════════════════════════════════════════════════════════
// LEGENDARY
// ══════════════════════════════════════════════════════════════════════════════
function triggerLegendaryReveal(cb) {
  const o=$('overlayLegendary');
  o.classList.remove('hidden');
  playLegendary();
  setTimeout(()=>{o.classList.add('hidden');cb();},2200);
}

// ══════════════════════════════════════════════════════════════════════════════
// CORE ROUND
// ══════════════════════════════════════════════════════════════════════════════
function startRound() {
  State.answered=false;
  State.questionNum++;
  State.currentQuote=pickQuote();
  const {text,realAuthor,meaning,category,dyk}=State.currentQuote;
  State.isLegendary=Math.random()<LEGENDARY_CHANCE;

  const doRender = () => {
    applyCategoryStyle(category);
    $('qCounter').textContent=`Q ${State.questionNum}`;
    const card=$('quoteCard');
    const legBadge=$('legendaryBadge');
    const legGlow=$('legendaryGlow');
    if(State.isLegendary){
      card.classList.add('legendary-card');
      legBadge.classList.remove('hidden');
      legGlow.classList.remove('hidden');
    } else {
      card.classList.remove('legendary-card');
      legBadge.classList.add('hidden');
      legGlow.classList.add('hidden');
    }
    const qText=$('quoteText');
    $('answerReveal').classList.add('hidden');
    qText.classList.add('fade');
    setTimeout(()=>{
      qText.textContent=text;
      qText.classList.remove('fade');
      $('meaningText').textContent=meaning;
      if(dyk){$('dykText').textContent=dyk;$('dykStrip').classList.remove('hidden');}
      else $('dykStrip').classList.add('hidden');
    },200);
    const fakes=getFakeOptions(realAuthor,category);
    const options=shuffle([realAuthor,...fakes]);
    const grid=$('optionsGrid'); grid.innerHTML='';
    options.forEach((spk,i)=>{
      const btn=document.createElement('button');
      btn.className='opt-btn slide-in';
      btn.style.animationDelay=`${i*80}ms`;
      btn.textContent=spk;
      btn.addEventListener('click',()=>handleAnswer(btn,spk===realAuthor));
      grid.appendChild(btn);
    });
    const pct=((State.questionNum-1)/Math.max(QUOTES_DATA.length,1))*100;
    $('progressFill').style.width=`${Math.min(pct,100)}%`;
    $('progressGlow').style.right=`${Math.max(100-pct,0)}%`;
    playPageTurn();
    const timerSecs=DIFF_TIMES[State.selectedDiff]||10;
    Timer.start(timerSecs, ()=>{ if(!State.answered) timeOut(); });
  };

  if(State.isLegendary && State.questionNum>1) {
    triggerLegendaryReveal(doRender);
  } else {
    doRender();
  }
}

function timeOut() {
  State.answered=true;
  Timer.stop(); playWrong();
  $('optionsGrid').querySelectorAll('.opt-btn').forEach(b=>{
    b.disabled=true; b.style.pointerEvents='none';
    if(b.textContent===State.currentQuote.realAuthor) b.classList.add('correct');
    else b.classList.add('dimmed');
  });
  $('answerReveal').classList.remove('hidden');
  const o=$('overlayResult');
  $('resultRing').classList.add('wrong-ring');
  $('resultIcon').textContent='⏱';
  $('resultLabel').textContent="TIME'S UP!";
  State.streak=0; $('streak').textContent=0;
  if(State.isEndless){
    State.score=Math.max(0, State.score-10);
    $('score').textContent=State.score;
    $('resultPoints').textContent='−10 pts';
  } else {
    $('resultPoints').textContent='−1 ❤️';
    State.lives--; updateHUDHearts();
  }
  $('resultPoints').style.color='var(--wrong)';
  State.wrongCount++;
  o.classList.remove('hidden');
  clearTimeout(resultTimer); resultTimer=setTimeout(()=>o.classList.add('hidden'),1100);
  if(!State.isEndless && State.lives<=0){safeTimeout(endGame,1600);return;}
  safeTimeout(startRound,2200);
}

function handleAnswer(clickedBtn, isCorrect) {
  if(State.answered)return;
  State.answered=true;
  Timer.stop(); playClick();
  const allBtns=$('optionsGrid').querySelectorAll('.opt-btn');
  allBtns.forEach(b=>{b.disabled=true;b.style.pointerEvents='none';});
  allBtns.forEach(b=>{
    if(b.textContent===State.currentQuote.realAuthor) b.classList.add('correct');
    else if(b===clickedBtn&&!isCorrect) b.classList.add('wrong');
    else b.classList.add('dimmed');
  });
  $('answerReveal').classList.remove('hidden');

  if(isCorrect){
    unlockQuote(State.currentQuote.realAuthor, State.currentQuote.text);
    if(State.isLegendary) incrementLegendaryCount();
    State.streak++; State.correctCount++;
    let pts=15+Math.min(State.streak*3,30);
    if(State.isLegendary) pts*=2;
    State.score+=pts;
    $('score').textContent=State.score; popEl('score');
    $('streak').textContent=State.streak; popEl('streak');
    playCorrect();
    showCombo(State.streak); showResult(true,pts);
    navigator.vibrate&&navigator.vibrate(50);
  } else {
    State.streak=0; State.wrongCount++;
    $('streak').textContent=0;
    playWrong();
    navigator.vibrate&&navigator.vibrate([60,30,60]);
    if(State.isEndless){
      const penalty = 10;
      State.score = Math.max(0, State.score - penalty);
      $('score').textContent=State.score;
      showResult(false, 0);
      $('resultPoints').textContent='−10 pts';
      $('resultPoints').style.color='var(--wrong)';
    } else {
      State.lives--;
      updateHUDHearts();
      showResult(false,0);
      if(State.lives<=0){safeTimeout(endGame,1600);return;}
    }
  }

  // Check achievements after every answer
  const newAch = checkAchievements(State, State.dailyStreak, State.isEndless);
  newAch.forEach(ach => queueAchievementBanner(ach));

  safeTimeout(startRound, 2300);
}

// ══════════════════════════════════════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════════════════════════════════════
function endGame() {
  Timer.stop();
  cancelAllTimeouts();
  const rank=getRank(State.score);
  const accuracy=State.correctCount+State.wrongCount>0
    ?Math.round((State.correctCount/(State.correctCount+State.wrongCount))*100):0;
  const isNewBest=saveBest(State.score);
  saveRun({
    name:      localStorage.getItem(K.name)||'Seeker',
    score:     State.score,
    correct:   State.correctCount,
    wrong:     State.wrongCount,
    accuracy:  accuracy,
    rank:      rank.label,
    rankEmoji: rank.emoji,
    mode:      State.isEndless ? 'endless' : State.selectedMode,
    diff:      State.selectedDiff,
    date:      new Date().toLocaleDateString(),
  });

  // Update cumulative profile stats
  updateStats(State.correctCount, State.wrongCount, State.streak, State.isEndless ? 'endless' : State.selectedMode);

  // Check achievements one final time at game end
  const newAch = checkAchievements(State, State.dailyStreak, State.isEndless);
  newAch.forEach(ach => queueAchievementBanner(ach));

  $('gameoverScore').textContent=State.score;
  $('gameoverEmblem').textContent=rank.emoji;
  $('gameoverRank').textContent=`${rank.emoji}  ${rank.label}`;
  // Show mode label — endless gets its own label
  const modeLabel = State.isEndless
    ? `♾️ ENDLESS · ${State.questionNum} questions`
    : State.selectedMode.toUpperCase();
  $('gameoverStats').innerHTML=`
    <div class="stat-item"><div class="stat-val">${State.correctCount}</div><div class="stat-label">Correct</div></div>
    <div class="stat-item"><div class="stat-val">${State.wrongCount}</div><div class="stat-label">Wrong</div></div>
    <div class="stat-item"><div class="stat-val">${accuracy}%</div><div class="stat-label">Accuracy</div></div>
    <div class="stat-item"><div class="stat-val">${getBest()}</div><div class="stat-label">Best</div></div>
  `;
  if(isNewBest) $('newBestBanner').classList.remove('hidden');
  else          $('newBestBanner').classList.add('hidden');
  const ds=State.dailyStreak;
  const dsEl=$('gameoverDaily');
  dsEl.className='gameover-daily '+(ds>=1?'streak-kept':'streak-lost');
  dsEl.innerHTML=ds>=1?`🔥 <span>Day ${ds} streak!</span>`:`💔 <span>Come back tomorrow!</span>`;
  buildShareCard(State.score,State.correctCount,State.wrongCount,rank.emoji,rank.label,ds,
    State.isEndless?'endless':State.selectedMode, State.selectedDiff);
  showScreen('screenGameOver');
}

// ══════════════════════════════════════════════════════════════════════════════
// LEADERBOARD RENDER
// ══════════════════════════════════════════════════════════════════════════════
function renderLeaderboard() {
  const lb=loadLeaderboard();
  const list=$('lbList');
  const empty=$('lbEmpty');
  const pName=localStorage.getItem(K.name)||'Seeker';
  $('lbPlayerName').textContent=`${pName}'s top runs`;
  if(lb.length===0){list.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  const medals=['🥇','🥈','🥉'];
  list.innerHTML=lb.map((run,i)=>{
    const rowClass=i===0?'lb-row gold-row':i===1?'lb-row silver-row':i===2?'lb-row bronze-row':'lb-row';
    const pos=medals[i]||`#${i+1}`;
    const meta=`${run.accuracy}% acc · ${run.mode||'all'} · ${run.date||''}`;
    return `<div class="${rowClass}" style="animation-delay:${i*60}ms">
      <div class="lb-pos">${pos}</div>
      <div class="lb-info">
        <div class="lb-name">${run.name||'Seeker'}</div>
        <div class="lb-meta">${meta}</div>
      </div>
      <div class="lb-score">${run.score}</div>
      <div class="lb-rank-emoji">${run.rankEmoji||'🌑'}</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════════════════════════
// COLLECTION RENDER
// ══════════════════════════════════════════════════════════════════════════════
function renderCollection(filterCat) {
  filterCat = filterCat || 'all';
  const unlocked = loadUnlocked();

  // Build speaker list from QUOTES_DATA (only authors matching the filter)
  const allAuthors = [...new Set(QUOTES_DATA.map(q => q.realAuthor))];
  let filteredAuthors;
  if (filterCat === 'all') {
    filteredAuthors = allAuthors;
  } else {
    filteredAuthors = [...new Set(
      QUOTES_DATA.filter(q => q.category === filterCat).map(q => q.realAuthor)
    )];
  }
  filteredAuthors.sort();

  // Overall progress (all speakers, not just filtered)
  const totalSpeakers   = allAuthors.length;
  const unlockedSpeakers = allAuthors.filter(a => (unlocked[a] || []).length > 0).length;
  const pct = totalSpeakers > 0 ? Math.round((unlockedSpeakers / totalSpeakers) * 100) : 0;

  $('collSubtitle').textContent = `${unlockedSpeakers} / ${totalSpeakers} speakers unlocked`;
  $('collProgressFill').style.width = pct + '%';
  $('collProgressPct').textContent  = pct + '%';

  // Build speaker cards
  const grid = $('speakerGrid');
  grid.innerHTML = '';

  filteredAuthors.forEach(author => {
    const authorQuotes  = QUOTES_DATA.filter(q => q.realAuthor === author);
    const unlockedTexts = unlocked[author] || [];
    const total  = authorQuotes.length;
    const done   = unlockedTexts.length;
    const cat    = authorQuotes[0] ? authorQuotes[0].category : 'philosophy';
    const bioEntry = SPEAKER_BIOS[author];
    const icon   = bioEntry ? bioEntry.icon : (CAT_ICONS[cat] || '⚖️');
    const barPct = total > 0 ? Math.round((done / total) * 100) : 0;

    const isLocked   = done === 0;
    const isMastered = done === total && total > 0;
    const stateClass = isMastered ? 'mastered' : isLocked ? 'locked' : 'unlocked';

    const tile = document.createElement('div');
    tile.className = 'speaker-tile ' + stateClass;
    tile.innerHTML =
      (isLocked ? '<span class="speaker-lock-icon">🔒</span>' : '') +
      '<div class="speaker-tile-icon">' + icon + '</div>' +
      '<div class="speaker-tile-name">' + author + '</div>' +
      '<div class="speaker-tile-count">' + done + '/' + total + ' quotes</div>' +
      '<div class="speaker-tile-bar"><div class="speaker-tile-fill" style="width:' + barPct + '%"></div></div>';

    tile.addEventListener('click', () => openBioModal(author));
    grid.appendChild(tile);
  });
}

function openBioModal(author) {
  const bioEntry     = SPEAKER_BIOS[author];
  const authorQuotes = QUOTES_DATA.filter(q => q.realAuthor === author);
  const unlocked     = loadUnlocked();
  const unlockedTexts = unlocked[author] || [];
  const total = authorQuotes.length;
  const done  = unlockedTexts.length;
  const cat   = authorQuotes[0] ? authorQuotes[0].category : 'philosophy';
  const icon  = bioEntry ? bioEntry.icon : (CAT_ICONS[cat] || '⚖️');

  $('bioCatIcon').textContent = icon;
  $('bioName').textContent    = author;
  $('bioMeta').textContent    = bioEntry ? bioEntry.meta : cat;
  $('bioText').textContent    = bioEntry ? bioEntry.bio : 'Play more games to discover this speaker\u2019s story.';
  $('bioProgressCount').textContent = done + ' / ' + total;
  $('bioProgressFill').style.width  = (total > 0 ? Math.round((done/total)*100) : 0) + '%';

  const qContainer = $('bioQuotes');
  qContainer.innerHTML = '';
  authorQuotes.forEach(q => {
    const isUnlocked = unlockedTexts.includes(q.text);
    const item = document.createElement('div');
    item.className = 'bio-quote-item ' + (isUnlocked ? 'unlocked' : 'locked');
    if (isUnlocked) {
      item.innerHTML =
        '<div class="bio-quote-text">\u201C' + q.text + '\u201D</div>' +
        '<div class="bio-quote-meaning">' + q.meaning + '</div>';
    } else {
      item.innerHTML =
        '<div class="bio-quote-text bio-quote-locked-text">???</div>' +
        '<div class="bio-quote-hint">Answer this quote correctly in a game to unlock</div>';
    }
    qContainer.appendChild(item);
  });

  $('bioOverlay').classList.remove('hidden');
  playClick();
}

function closeBioModal() {
  $('bioOverlay').classList.add('hidden');
}

// ══════════════════════════════════════════════════════════════════════════════
// START GAME
// ══════════════════════════════════════════════════════════════════════════════
function startGame() {
  State.dailyStreak=updateDailyStreak();
  const badge=$('hudStreakBadge');
  if(State.dailyStreak>1){badge.classList.remove('hidden');$('hudStreakDays').textContent=State.dailyStreak;}
  else badge.classList.add('hidden');

  // Endless HUD: hide hearts, show endless badge and End Run button
  if(State.isEndless){
    $('hearts').classList.add('hidden');
    $('hudEndlessBadge').classList.remove('hidden');
    $('endRunWrap').classList.remove('hidden');
  } else {
    $('hearts').classList.remove('hidden');
    $('hudEndlessBadge').classList.add('hidden');
    $('endRunWrap').classList.add('hidden');
  }

  // Reset achievement queue for new game
  _achQueue = []; _achShowing = false;

  // Cancel any lingering background timeouts from previous game
  cancelAllTimeouts();
  Timer.stop();

  resetState();

  // Reset HUD display to match fresh state
  $('score').textContent  = '0';
  $('streak').textContent = '0';
  $('score').classList.remove('pop');
  $('streak').classList.remove('pop');
  $('hearts').querySelectorAll('.heart').forEach(h => {
    h.classList.remove('lost', 'shake');
  });
  $('overlayResult').classList.add('hidden');
  $('overlayLegendary').classList.add('hidden');
  $('comboBanner').classList.remove('show');
  $('comboBanner').classList.add('hidden');

  showScreen('screenGame');
  safeTimeout(startRound, 300);
}

// ══════════════════════════════════════════════════════════════════════════════
// INTRO POPULATE
// ══════════════════════════════════════════════════════════════════════════════
function populateIntro() {
  const name=localStorage.getItem(K.name)||'Seeker';
  $('introPlayerName').textContent=name;
  const best=getBest();
  if(best>0){$('introBest').textContent=`Best: ${best}`;$('introBest').classList.remove('hidden');}
  const ds=getCurrentStreak();
  if(ds>0){$('dailyStreakIntro').classList.remove('hidden');$('dsIntroText').textContent=`Day ${ds} Streak`;}
  else $('dailyStreakIntro').classList.add('hidden');
  renderQOTD();
}

// ══════════════════════════════════════════════════════════════════════════════
// INIT — single DOMContentLoaded, every listener wired here
// ══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Load all quote data from JSON, then initialise the game
  loadQuotesData().then(() => {
    initGame();
  }).catch(err => {
    console.error('Failed to load quotes:', err);
    // Fallback: try to init anyway (won't work offline without cache)
    initGame();
  });
});

function initGame() {
  // First launch vs returning player
  ensureMemberSince();
  if (!localStorage.getItem(K.onboarded)) {
    showScreen('screenOnboard');
  } else {
    populateIntro();
    showScreen('screenIntro');
  }

  // ── Onboarding ────────────────────────────────────────────────────────────
  $('btnOnboardDone').addEventListener('click', () => {
    playClick();
    const raw  = $('nameInput').value.trim();
    const name = raw || 'Seeker';
    localStorage.setItem(K.name, name);
    localStorage.setItem(K.onboarded, '1');
    populateIntro();
    showScreen('screenIntro');
  });
  $('nameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btnOnboardDone').click();
  });

  // ── Intro ─────────────────────────────────────────────────────────────────
  $('btnStart').addEventListener('click',       () => { playClick(); showScreen('screenMode'); });
  $('btnHowTo').addEventListener('click',       () => { playClick(); showScreen('screenHowTo'); });
  $('btnLeaderboard').addEventListener('click', () => { playClick(); renderLeaderboard(); showScreen('screenLeaderboard'); });
  $('btnSpeakers').addEventListener('click',    () => {
    playClick();
    renderCollection('all');
    document.querySelectorAll('.coll-tab').forEach(t => t.classList.remove('active'));
    const allTab = document.querySelector('.coll-tab[data-cat="all"]');
    if (allTab) allTab.classList.add('active');
    showScreen('screenCollection');
  });
  $('btnAchievements').addEventListener('click', () => {
    playClick(); renderAchievements(); showScreen('screenAchievements');
  });

  // ── Profile ───────────────────────────────────────────────────────────────
  $('introPlayerName').addEventListener('click', () => {
    playClick(); renderProfile(); showScreen('screenProfile');
  });
  $('btnProfileBack').addEventListener('click', () => {
    playClick(); showScreen('screenIntro');
  });
  $('btnProfileEdit').addEventListener('click', () => {
    playClick();
    const row = $('profileEditRow');
    const isHidden = row.classList.contains('hidden');
    row.classList.toggle('hidden', !isHidden);
    if (isHidden) $('profileNameInput').focus();
  });
  $('btnProfileSave').addEventListener('click', () => {
    playClick();
    const raw = $('profileNameInput').value.trim();
    if (raw) {
      localStorage.setItem(K.name, raw);
      populateIntro();
      renderProfile();
      $('profileEditRow').classList.add('hidden');
      $('btnProfileSave').textContent = '✓ SAVED';
      setTimeout(() => $('btnProfileSave').textContent = 'SAVE', 1500);
    }
  });
  $('profileNameInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btnProfileSave').click();
  });

  // ── How To Play ───────────────────────────────────────────────────────────
  $('btnHowToBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Leaderboard ───────────────────────────────────────────────────────────
  $('btnLbBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Collection screen ─────────────────────────────────────────────────────
  $('btnCollBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  document.querySelectorAll('.coll-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.coll-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCollection(tab.dataset.cat);
    });
  });

  // ── Bio modal ─────────────────────────────────────────────────────────────
  $('btnBioClose').addEventListener('click', () => { closeBioModal(); playClick(); });
  $('bioOverlay').addEventListener('click', e => {
    if (e.target === $('bioOverlay')) closeBioModal();
  });

  // ── Achievements screen ───────────────────────────────────────────────────
  $('btnAchBack').addEventListener('click', () => { playClick(); showScreen('screenIntro'); });

  // ── Mode select ───────────────────────────────────────────────────────────
  document.querySelectorAll('.mode-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.mode-tile').forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      State.selectedMode = tile.dataset.mode;
    });
  });
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.selectedDiff = btn.dataset.diff;
    });
  });

  // Endless mode toggle
  $('btnEndlessToggle').addEventListener('click', () => {
    playClick();
    State.isEndless = !State.isEndless;
    $('btnEndlessToggle').classList.toggle('active', State.isEndless);
    $('endlessPill').textContent = State.isEndless ? 'ON' : 'OFF';
  });

  $('btnModeStart').addEventListener('click', () => { playClick(); startGame(); });
  $('btnModeBack').addEventListener('click',  () => {
    playClick();
    // Reset endless when going back
    State.isEndless = false;
    $('btnEndlessToggle').classList.remove('active');
    $('endlessPill').textContent = 'OFF';
    showScreen('screenIntro');
  });

  // ── End Run (endless mode) ────────────────────────────────────────────────
  $('btnEndRun').addEventListener('click', () => {
    playClick();
    Timer.stop();
    endGame();
  });

  // ── Game Over ─────────────────────────────────────────────────────────────
  $('btnRestart').addEventListener('click',  () => { playClick(); showScreen('screenMode'); });
  $('btnViewLb').addEventListener('click',   () => { playClick(); renderLeaderboard(); showScreen('screenLeaderboard'); });
  $('btnGoHome').addEventListener('click',   () => { playClick(); populateIntro(); showScreen('screenIntro'); });

  // ── Share card ────────────────────────────────────────────────────────────
  $('btnDownload').addEventListener('click', () => {
    playClick();
    const link = document.createElement('a');
    link.download = 'wisdom-paths-result.png';
    link.href = $('shareCanvas').toDataURL('image/png');
    link.click();
  });
  $('btnCopyShare').addEventListener('click', () => {
    playClick();
    const rank     = getRank(State.score);
    const accuracy = State.correctCount+State.wrongCount>0
      ? Math.round((State.correctCount/(State.correctCount+State.wrongCount))*100) : 0;
    const ds   = State.dailyStreak;
    const name = localStorage.getItem(K.name)||'Seeker';
    const modeStr = State.isEndless ? 'ENDLESS' : State.selectedMode.toUpperCase();
    const text = [
      '☽ WISDOM PATHS — Who Said It?','',
      `${name} · ${rank.emoji} ${rank.label}`,
      `📊 Score: ${State.score} pts`,
      `✅ ${State.correctCount} correct  ❌ ${State.wrongCount} wrong  🎯 ${accuracy}% accuracy`,
      ds>1 ? `🔥 Day ${ds} daily streak!` : '',
      `Mode: ${modeStr} · ${State.selectedDiff.toUpperCase()}`, '',
      'Can you beat me? wisdomPaths.app',
    ].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      const btn=$('btnCopyShare'); btn.textContent='✓ COPIED!'; btn.classList.add('copied');
      setTimeout(()=>{btn.textContent='⎘ COPY TEXT';btn.classList.remove('copied');},2000);
    }).catch(() => {
      const btn=$('btnCopyShare'); btn.textContent='✓ DONE';
      setTimeout(()=>btn.textContent='⎘ COPY TEXT',2000);
    });
  });

  // ── Sound toggle ──────────────────────────────────────────────────────────
  $('soundBtn').addEventListener('click', () => {
    SFX.enabled = !SFX.enabled;
    $('soundBtn').classList.toggle('muted', !SFX.enabled);
    $('soundIcon').textContent = SFX.enabled ? '♪' : '♪̶';
    if (SFX.enabled) tone(440, .1, 'sine', .06);
  });

}
