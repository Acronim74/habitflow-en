// ── Constants ──────────────────────────────
const LS_KEY = 'habitflow_data';
const SCHEMA_VERSION = 1;
const TODAY  = new Date();

// Стадии развития персонажа
const STAGES = [
  { pts:0,     name:'Beginner',        emoji:'🌱',
    color:'#52b788', glow:'#95d5b2', ring:'#2d6a4f' },
  { pts:500,   name:'In the Flow',       emoji:'🏃',
    color:'#4a90d9', glow:'#89c4f0', ring:'#2167a8' },
  { pts:2000,  name:'Resilience',  emoji:'⚔️',
    color:'#e07b39', glow:'#f0b07a', ring:'#b05a1a' },
  { pts:6000,  name:'Habit Strength', emoji:'👑',
    color:'#c47fd4', glow:'#dba8e8', ring:'#8e3fa8' },
  { pts:15000, name:'Pillar',         emoji:'🎯',
    color:'#e85d4a', glow:'#f5a09a', ring:'#b02a1a' },
  { pts:35000, name:'Master',        emoji:'🔥',
    color:'#d4a017', glow:'#f0cc6a', ring:'#a07010' },
];

// Achievement badges
const BADGES = [
  { id:'fire',
    emoji:'🔥', name:'First Flame',
    desc:'7-day streak on any habit',
    check: () => habits.some(h => !h.bad && calcStreak(h) >= 7) },
  { id:'diamond',
    emoji:'💎', name:'Diamond',
    desc:'30-day streak on any habit',
    check: () => habits.some(h => !h.bad && calcStreak(h) >= 30) },
  { id:'champion',
    emoji:'🏆', name:'Champion',
    desc:'100% completion for a full month',
    check: () => _checkChampion() },
  { id:'century',
    emoji:'⚡', name:'Centurion',
    desc:'100-day streak on any habit',
    check: () => habits.some(h => !h.bad && calcStreak(h) >= 100) },
  { id:'owl',
    emoji:'🌙', name:'Night Owl',
    desc:'Checked in after 9 PM on 7 different days',
    check: () => _checkTimeBadge(21, 24, 7) },
  { id:'bird',
    emoji:'🌅', name:'Early Bird',
    desc:'Checked in before 7 AM on 7 different days',
    check: () => _checkTimeBadge(0, 7, 7) },
  { id:'legend',
    emoji:'🎯', name:'Legend',
    desc:'365-day streak on any habit',
    check: () => habits.some(h => !h.bad && calcStreak(h) >= 365) },
  { id:'lucky',
    emoji:'🍀', name:'Lucky',
    desc:'7 or more habits completed in one day',
    check: () => _checkLucky() },
];

// Настроение — подписи
const MOOD_LABELS = [
  'Rough', 'Meh', 'Okay', 'Good', 'Great'
];

/** One palette for mood buttons, chart and analytics */
const MOOD_COLORS = [
  '#c62828',
  '#e65100',
  '#f9a825',
  '#2e7d32',
  '#14532d',
];

// Habit categories
const CATEGORIES = [
  { name:'Health',   icon:'💪' },
  { name:'Sport',      icon:'🏃' },
  { name:'Nutrition',    icon:'🥗' },
  { name:'Sleep',        icon:'😴' },
  { name:'Learning',      icon:'📚' },
  { name:'Work',     icon:'💼' },
  { name:'Meditation',  icon:'🧘' },
  { name:'Creativity', icon:'🎨' },
  { name:'Finance',    icon:'💰' },
  { name:'Social', icon:'👥' },
];

// Points systems (reference in spec comments)

// ── Demo data for onboarding ─────────────
const DEMO_HABITS = [
  {
    id: 'demo-1',
    name: 'Morning Run',
    icon: '🏃',
    category: 'Sport',
    desc: 'Run 20–30 minutes every morning',
    bad: false,
    schedule: null,
    checks: {},
    slips: {},
    clean: {},
    times: {},
    notes: {},
    createdAt: '',
  },
  {
    id: 'demo-2',
    name: 'Read 20 Minutes',
    icon: '📚',
    category: 'Learning',
    desc: 'Any book before bed',
    bad: false,
    schedule: [0,1,2,3,4],
    checks: {},
    slips: {},
    clean: {},
    times: {},
    notes: {},
    createdAt: '',
  },
  {
    id: 'demo-3',
    name: 'Meditation',
    icon: '🧘',
    category: 'Health',
    desc: '10 minutes in the morning',
    bad: false,
    schedule: null,
    checks: {},
    slips: {},
    clean: {},
    times: {},
    notes: {},
    createdAt: '',
  },
  {
    id: 'demo-4',
    name: 'No Smoking',
    icon: '🚫',
    category: '',
    desc: '',
    bad: true,
    schedule: null,
    checks: {},
    slips: {},
    clean: {},
    times: {},
    notes: {},
    createdAt: '',
  },
];
