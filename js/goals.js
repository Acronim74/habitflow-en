// ── Goal roadmap data ───────────────────────

const GOALS = [
  {
    id: 'energy',
    icon: '⚡',
    name: 'More Energy',
    desc: 'Feel alive all day — no hourly coffee fixes, no afternoon crashes.',
    result: 'Wake up without an alarm · Energy all day · No afternoon slumps',
    stages: [
      {
        n: 1, name: 'Foundation', days: '1–21',
        desc: 'Three habits that generate energy with minimal effort — water, morning, sleep.',
        habits: [
          { key: '1.1', icon: '💧', name: 'Drink a glass of water right after waking up' },
          { key: '1.2', icon: '📵', name: 'No phone for the first 20 minutes of the morning' },
          { key: '1.3', icon: '🌙', name: 'Go to sleep at the same time every night' },
        ],
      },
      {
        n: 2, name: 'Activation', days: '22–42',
        desc: 'Get your body moving and eliminate energy crashes through nutrition.',
        habits: [
          { key: '2.1', icon: '🏃', name: '10 minutes of movement every day' },
          { key: '2.2', icon: '🥚', name: 'Protein with every meal' },
          { key: '2.3', icon: '☕', name: 'First coffee — no earlier than 90 minutes after waking' },
        ],
      },
      {
        n: 3, name: 'Optimization', days: '43–63',
        desc: 'Reach sustainably high energy through fine-tuned systemic changes.',
        habits: [
          { key: '3.1', icon: '🫁', name: '5-minute breathing practice in the morning' },
          { key: '3.2', icon: '☀️', name: '10 minutes of natural light in the morning' },
          { key: '3.3', icon: '🚶', name: 'Post-lunch walk — 10 minutes' },
        ],
      },
    ],
    survey: [
      { key: 's1', q: 'Already drinking water every morning right after waking up?', skip: '1.1' },
      { key: 's2', q: 'Already going to sleep at the same time every night?', skip: '1.3' },
    ],
  },
  {
    id: 'money',
    icon: '💰',
    name: 'Spend Smarter',
    desc: 'Stop wondering where your money went — start seeing your finances clearly.',
    result: 'Know where money goes · First savings · No end-of-month anxiety',
    stages: [
      {
        n: 1, name: 'Awareness', days: '1–21',
        desc: 'See where money goes — no budgets or restrictions, just observation.',
        habits: [
          { key: '1.1', icon: '📝', name: 'Write down all spending for the day — in the evening' },
          { key: '1.2', icon: '📱', name: 'Check your account balance once a day' },
          { key: '1.3', icon: '📅', name: 'Weekly financial review every Sunday' },
        ],
      },
      {
        n: 2, name: 'Control', days: '22–42',
        desc: 'Start managing money, not just watching it.',
        habits: [
          { key: '2.1', icon: '⏳', name: '24-hour rule before any unplanned purchase' },
          { key: '2.2', icon: '🏦', name: 'Automatically save 1% of income' },
          { key: '2.3', icon: '📊', name: 'Create a spending plan for next month' },
        ],
      },
      {
        n: 3, name: 'Growth', days: '43–63',
        desc: 'Move from control to growth — first steps toward saving and investing.',
        habits: [
          { key: '3.1', icon: '📈', name: 'Increase auto-savings to 5%' },
          { key: '3.2', icon: '📚', name: 'Learn about one financial instrument per month' },
          { key: '3.3', icon: '🔍', name: 'Monthly debrief: what worked, what didn\'t' },
        ],
      },
    ],
    survey: [
      { key: 's1', q: 'Already tracking your spending every day?', skip: '1.1' },
      { key: 's2', q: 'Already checking your account balance regularly?', skip: '1.2' },
    ],
  },
  {
    id: 'calm',
    icon: '🧘',
    name: 'Feel Calmer',
    desc: 'Less anxiety, more presence — calm your nervous system without pills.',
    result: 'You respond to stress, don\'t explode · Notice anxiety but don\'t sink · Fall asleep faster',
    stages: [
      {
        n: 1, name: 'Grounding', days: '1–21',
        desc: 'Give your nervous system basic safety through breath, body and routine.',
        habits: [
          { key: '1.1', icon: '🫁', name: '4-7-8 breathing before sleep — 3 minutes' },
          { key: '1.2', icon: '✍️', name: 'Morning pages — 5 minutes of handwriting' },
          { key: '1.3', icon: '🌳', name: 'Short walk outside — 15 minutes' },
        ],
      },
      {
        n: 2, name: 'Regulation', days: '22–42',
        desc: 'Learn to regulate your state in the moment — not after stress, but during it.',
        habits: [
          { key: '2.1', icon: '💨', name: 'Physiological sigh at the first signs of anxiety' },
          { key: '2.2', icon: '🧠', name: '5 minutes of mindfulness in the middle of the day' },
          { key: '2.3', icon: '🌟', name: 'Evening debrief — what good happened today' },
        ],
      },
      {
        n: 3, name: 'Resilience', days: '43–63',
        desc: 'Build resilience — the ability to recover quickly, not avoid stress.',
        habits: [
          { key: '3.1', icon: '🏃', name: 'Movement as a regulation tool — 20 minutes' },
          { key: '3.2', icon: '💬', name: 'One real social interaction per day' },
          { key: '3.3', icon: '📵', name: 'Weekly news detox — one full day' },
        ],
      },
    ],
    survey: [
      { key: 's1', q: 'Already practising breathing techniques every day?', skip: '1.1' },
      { key: 's2', q: 'Already going for a walk outside every day?', skip: '1.3' },
    ],
  },
];
