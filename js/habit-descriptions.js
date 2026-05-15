// Habit descriptions — why, how, frequency for each goal habit
// Indexed by: HABIT_DESC[goalId][stageIndex][habitIndex]

const HABIT_DESC = {

  energy: [
    [
      {
        why_ru: 'Обезвоживание даже на 1–2% вызывает усталость и снижает концентрацию. Один стакан с утра запускает метаболизм.',
        why_en: 'Even 1–2% dehydration causes fatigue and reduces focus. One glass in the morning restarts your metabolism.',
        how_ru: 'Поставь стакан воды у кровати с вечера. Выпей до того как встанешь.',
        how_en: 'Leave a glass of water by your bed the night before. Drink it before you stand up.',
        freq_ru: 'Каждый день · 1 минута',
        freq_en: 'Every day · 1 minute',
      },
      {
        why_ru: 'Соцсети с утра активируют тревогу в мозге. Тихое начало дня сохраняет энергию на весь день.',
        why_en: 'Social media in the morning activates the brain\'s anxiety center. A quiet start preserves energy all day.',
        how_ru: 'Убери телефон с прикроватной тумбочки. Зарядка — в другой комнате.',
        how_en: 'Remove your phone from the nightstand. Charger goes in another room.',
        freq_ru: 'Каждый день · пассивная привычка',
        freq_en: 'Every day · passive habit',
      },
      {
        why_ru: 'Стабильный ритм сна важнее его продолжительности. Тело привыкает и просыпается само — без будильника.',
        why_en: 'A stable sleep rhythm matters more than duration. Your body adapts and wakes up naturally — no alarm.',
        how_ru: 'Выбери время и придерживайся его ±30 минут даже в выходные.',
        how_en: 'Pick a time and stick to it ±30 minutes, even on weekends.',
        freq_ru: 'Каждый день · вечерний ритуал',
        freq_en: 'Every day · evening ritual',
      },
    ],
    [
      {
        why_ru: 'Короткие всплески активности улучшают кровообращение и дают дофамин — без часового спортзала.',
        why_en: 'Short bursts of movement improve circulation and release dopamine — no hour-long gym session needed.',
        how_ru: 'Не спорт — прогулка, зарядка, танцы дома. Главное — каждый день.',
        how_en: 'Not a workout — a walk, stretching, dancing at home. The key is daily.',
        freq_ru: 'Каждый день · 10 минут',
        freq_en: 'Every day · 10 minutes',
      },
      {
        why_ru: 'Белок стабилизирует сахар в крови. Нет скачков — нет послеобеденной вялости и резких спадов энергии.',
        why_en: 'Protein stabilizes blood sugar. No spikes means no afternoon energy crashes.',
        how_ru: 'Яйцо, творог, орехи, бобовые, мясо — хоть что-то белковое в каждом приёме.',
        how_en: 'Eggs, cottage cheese, nuts, legumes, meat — anything protein-based at each meal.',
        freq_ru: '3 раза в день · осознанный выбор',
        freq_en: '3 times a day · mindful choice',
      },
      {
        why_ru: 'Кортизол пикует в первый час после подъёма. Кофе позже даёт ровную энергию и убирает послеполуденный спад.',
        why_en: 'Cortisol peaks in the first hour after waking. Later coffee gives steadier energy and no afternoon crash.',
        how_ru: 'Пей воду или ешь завтрак первым. Кофе — потом.',
        how_en: 'Drink water or eat breakfast first. Coffee comes after.',
        freq_ru: 'Каждый день · один сдвиг',
        freq_en: 'Every day · one shift',
      },
    ],
    [
      {
        why_ru: 'Медленное дыхание снижает кортизол и активирует нервную систему в режим восстановления. Работает за 5 минут.',
        why_en: 'Slow breathing lowers cortisol and switches the nervous system into recovery mode. Works in 5 minutes.',
        how_ru: 'Box breathing: вдох 4 сек, задержка 4, выдох 4, задержка 4. Повтори 5 минут.',
        how_en: 'Box breathing: inhale 4 sec, hold 4, exhale 4, hold 4. Repeat for 5 minutes.',
        freq_ru: 'Каждое утро · 5 минут',
        freq_en: 'Every morning · 5 minutes',
      },
      {
        why_ru: 'Утренний свет сбрасывает внутренние часы. Тело знает когда быть бодрым и когда спать — без усилий.',
        why_en: 'Morning light resets your internal clock. Your body learns when to be alert and when to sleep — effortlessly.',
        how_ru: 'Выйди на улицу или сядь у окна в первый час после пробуждения. Без солнцезащитных очков.',
        how_en: 'Go outside or sit by a window within the first hour of waking. No sunglasses.',
        freq_ru: 'Каждый день · 10 минут',
        freq_en: 'Every day · 10 minutes',
      },
      {
        why_ru: '10 минут ходьбы после еды снижают пик глюкозы на 30%. Послеобеденный туман и вялость исчезают.',
        why_en: '10 minutes of walking after a meal reduces blood glucose spikes by 30%. Post-lunch fog disappears.',
        how_ru: 'Встань из-за стола сразу после еды. Прогулка, а не диван.',
        how_en: 'Get up from the table right after eating. Walk, not couch.',
        freq_ru: 'Каждый день · 10 минут после обеда',
        freq_en: 'Every day · 10 minutes after lunch',
      },
    ],
  ],

  money: [
    [
      {
        why_ru: 'Люди недооценивают свои расходы в среднем на 40%. Простая запись создаёт осознанность и меняет поведение.',
        why_en: 'People underestimate their spending by 40% on average. Simply recording it creates awareness and changes behavior.',
        how_ru: 'Каждый вечер 3 минуты — записывай всё что потратил. Заметки, таблица, любой формат.',
        how_en: '3 minutes every evening — write down everything you spent. Notes app, spreadsheet, any format.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
      {
        why_ru: 'Люди которые регулярно смотрят баланс тратят меньше. Видимость цифры активирует самоконтроль.',
        why_en: 'People who regularly check their balance spend less. Seeing the number activates self-control.',
        how_ru: 'Открой приложение банка утром или в обед. Просто посмотри — без оценки и стресса.',
        how_en: 'Open your banking app in the morning or at lunch. Just look — no judgment, no stress.',
        freq_ru: 'Каждый день · 1 минута',
        freq_en: 'Every day · 1 minute',
      },
      {
        why_ru: 'Недельный обзор показывает паттерны трат которые невидны ежедневно. Первый шаг к реальному контролю.',
        why_en: 'A weekly review reveals spending patterns invisible in daily tracking. The first step to real money control.',
        how_ru: '10 минут в воскресенье — сложи расходы по категориям: кафе, продукты, развлечения.',
        how_en: '10 minutes on Sunday — total your spending by category: cafes, groceries, entertainment.',
        freq_ru: 'Раз в неделю · 10 минут',
        freq_en: 'Once a week · 10 minutes',
      },
    ],
    [
      {
        why_ru: 'Импульсивные покупки — это дофаминовый всплеск, не реальная потребность. Пауза в 24 часа убирает желание в 70% случаев.',
        why_en: 'Impulse buys are a dopamine spike, not a real need. A 24-hour pause eliminates the urge in 70% of cases.',
        how_ru: 'Хочешь купить что-то незапланированное — запиши в список желаний. Через 24 часа реши нужно ли это.',
        how_en: 'Want to buy something unplanned — add it to a wish list. After 24 hours, decide if you still need it.',
        freq_ru: 'При каждой незапланированной покупке',
        freq_en: 'With every unplanned purchase',
      },
      {
        why_ru: 'Автоматизация сбережений — самая эффективная финансовая стратегия. Начинать с 1% легко и создаёт привычку.',
        why_en: 'Automating savings is the most effective financial strategy. Starting with 1% is easy and builds the habit.',
        how_ru: 'Настрой автоперевод в день зарплаты. Пусть деньги уходят до того как ты их увидишь.',
        how_en: 'Set up an automatic transfer on payday. Let the money go before you see it.',
        freq_ru: 'Раз в месяц · автоматически',
        freq_en: 'Once a month · automatic',
      },
      {
        why_ru: 'Люди с написанным планом расходов достигают финансовых целей значительно чаще. Цифры снижают тревогу вокруг денег.',
        why_en: 'People with a written spending plan achieve financial goals far more often. Concrete numbers reduce money anxiety.',
        how_ru: 'В последнее воскресенье месяца выпиши фиксированные расходы: аренда, еда, транспорт, подписки.',
        how_en: 'Last Sunday of the month — list fixed expenses: rent, food, transport, subscriptions.',
        freq_ru: 'Раз в месяц · 15 минут',
        freq_en: 'Once a month · 15 minutes',
      },
    ],
    [
      {
        why_ru: 'С 1% ты уже привык откладывать. 5% — это реальный финансовый буфер и минимальный порог безопасности.',
        why_en: 'You\'re already used to saving 1%. At 5% you build a real cushion — the minimum financial safety threshold.',
        how_ru: 'Увеличь автоперевод с 1% до 5%. Скорее всего ты этого даже не почувствуешь.',
        how_en: 'Increase your automatic transfer from 1% to 5%. You likely won\'t even notice the difference.',
        freq_ru: 'Один раз · настройка',
        freq_en: 'Once · one-time setup',
      },
      {
        why_ru: 'Финансовая грамотность напрямую коррелирует с благосостоянием. Достаточно базового понимания акций, ETF или депозитов.',
        why_en: 'Financial literacy directly correlates with wealth. Basic understanding of stocks, ETFs or deposits is enough.',
        how_ru: 'Выбери один инструмент — прочитай одну статью или посмотри одно видео. Не больше.',
        how_en: 'Pick one instrument — read one article or watch one video. No more than that.',
        freq_ru: 'Раз в месяц · 20 минут',
        freq_en: 'Once a month · 20 minutes',
      },
      {
        why_ru: 'Рефлексия над финансовым поведением меняет его эффективнее любых правил. Ты учишься у себя.',
        why_en: 'Reflecting on financial behavior changes it more effectively than any rules. You learn from yourself.',
        how_ru: 'В конце месяца — 15 минут. Три вопроса: где потратил лишнего? где сэкономил? что изменю?',
        how_en: 'End of month — 15 minutes. Three questions: where did I overspend? where did I save? what will I change?',
        freq_ru: 'Раз в месяц · 15 минут',
        freq_en: 'Once a month · 15 minutes',
      },
    ],
  ],

  calm: [
    [
      {
        why_ru: 'Медленное дыхание активирует парасимпатическую нервную систему — противоположность стресса. Тело буквально выключает тревогу.',
        why_en: 'Slow breathing activates the parasympathetic nervous system — the opposite of the stress response. The body literally turns off anxiety.',
        how_ru: 'Вдох 4 секунды, задержка 7 секунд, выдох 8 секунд. Повтори 4 раза.',
        how_en: 'Inhale 4 seconds, hold 7 seconds, exhale 8 seconds. Repeat 4 times.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
      {
        why_ru: 'Письмо от руки помогает обрабатывать эмоции и создаёт дистанцию между тревожными мыслями и реакциями на них.',
        why_en: 'Handwriting helps process emotions and creates distance between anxious thoughts and reactions to them.',
        how_ru: 'Сразу после пробуждения — пиши всё что приходит в голову. Не перечитывай, не оценивай.',
        how_en: 'Right after waking — write whatever comes to mind. Don\'t reread, don\'t judge.',
        freq_ru: 'Каждое утро · 5 минут',
        freq_en: 'Every morning · 5 minutes',
      },
      {
        why_ru: 'Природная среда снижает активность миндалины — мозгового центра тревоги. Улучшение настроения заметно уже через 20 минут.',
        why_en: 'Natural environments reduce amygdala activity — the brain\'s anxiety center. Mood improvement is noticeable within 20 minutes.',
        how_ru: 'Выйди без наушников. Просто иди и смотри вокруг — без цели и без спешки.',
        how_en: 'Go outside without headphones. Just walk and look around — no goal, no rush.',
        freq_ru: 'Каждый день · 15 минут',
        freq_en: 'Every day · 15 minutes',
      },
    ],
    [
      {
        why_ru: 'Двойной вдох через нос с долгим выдохом — самая быстрая техника регуляции нервной системы. Работает за секунды.',
        why_en: 'Double inhale through the nose with a long exhale — the fastest nervous system regulation technique known. Works in seconds.',
        how_ru: 'Два быстрых вдоха носом, один долгий медленный выдох ртом. Повтори 2–3 раза.',
        how_en: 'Two quick nasal inhales, one long slow exhale through the mouth. Repeat 2–3 times.',
        freq_ru: 'При каждом эпизоде тревоги',
        freq_en: 'At every anxiety episode',
      },
      {
        why_ru: 'Даже короткие сессии осознанности снижают тревогу и перестраивают мозг — снижается активность в центре страха.',
        why_en: 'Even brief mindfulness sessions reduce anxiety and rewire the brain — fear center activity decreases over time.',
        how_ru: 'Поставь будильник на обед. Сядь, закрой глаза, следи за дыханием 5 минут.',
        how_en: 'Set a lunchtime alarm. Sit down, close your eyes, follow your breath for 5 minutes.',
        freq_ru: 'Каждый день · 5 минут',
        freq_en: 'Every day · 5 minutes',
      },
      {
        why_ru: 'Мозг по природе замечает плохое сильнее хорошего. Намеренное внимание к позитивному переобучает эту систему.',
        why_en: 'The brain naturally notices bad over good. Deliberate attention to positives retrains this system and lowers cortisol.',
        how_ru: 'Перед сном — запиши или просто вспомни три момента сегодня за которые благодарен.',
        how_en: 'Before bed — write down or recall three moments from today you\'re grateful for.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
    ],
    [
      {
        why_ru: 'Физическая активность повышает эндорфины и снижает симптомы тревоги эффективнее многих других методов.',
        why_en: 'Physical activity boosts endorphins and reduces anxiety symptoms more effectively than many other methods.',
        how_ru: 'Любое движение которое нравится — йога, бег, велосипед, танцы. Главное — регулярно.',
        how_en: 'Any movement you enjoy — yoga, running, cycling, dancing. The key is regularity.',
        freq_ru: 'Каждый день · 20 минут',
        freq_en: 'Every day · 20 minutes',
      },
      {
        why_ru: 'Социальные связи снижают кортизол и активируют окситоцин — гормон спокойствия. Одиночество усиливает тревогу.',
        why_en: 'Social connections lower cortisol and activate oxytocin — the calming hormone. Loneliness amplifies anxiety dramatically.',
        how_ru: 'Позвони кому-то, выпей кофе с коллегой, напиши другу. Не в соцсетях — вживую или по телефону.',
        how_en: 'Call someone, have coffee with a colleague, text a friend. Not on social media — in person or by phone.',
        freq_ru: 'Каждый день · любое время',
        freq_en: 'Every day · any time',
      },
      {
        why_ru: 'Непрерывное потребление новостей — один из главных источников хронической фоновой тревоги. Один день без них снижает стресс.',
        why_en: 'Continuous news consumption is one of the main sources of chronic background anxiety. One news-free day lowers overall stress.',
        how_ru: 'Выбери день и не читай новости весь день. Соцсети — можно, новостные ленты — нет.',
        how_en: 'Pick a day and don\'t read news all day. Social media is fine, news feeds are not.',
        freq_ru: 'Раз в неделю · весь день',
        freq_en: 'Once a week · all day',
      },
    ],
  ],
};

// Returns why/how/freq for a habit by goalId and habitKey (e.g. '1.2')
function _habitDesc(goalId, habitKey) {
  const [sn, hn] = habitKey.split('.').map(Number);
  return ((HABIT_DESC[goalId] || [])[sn - 1] || [])[hn - 1] || null;
}

function getHabitWhy(goalId, habitKey, lang) {
  const d = _habitDesc(goalId, habitKey);
  if (!d) return '';
  return lang === 'en' ? d.why_en : d.why_ru;
}

function getHabitHow(goalId, habitKey, lang) {
  const d = _habitDesc(goalId, habitKey);
  if (!d) return '';
  return lang === 'en' ? d.how_en : d.how_ru;
}

function getHabitFreq(goalId, habitKey, lang) {
  const d = _habitDesc(goalId, habitKey);
  if (!d) return '';
  return lang === 'en' ? d.freq_en : d.freq_ru;
}
