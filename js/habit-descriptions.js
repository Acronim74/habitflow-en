// Habit descriptions — why, how, frequency for each goal habit
// Indexed by: HABIT_DESC[goalId][stageIndex][habitIndex]
// v2 — softened health claims, bilingual RU + EN

const HABIT_DESC = {

  // ─────────────────────────────────────────
  // GOAL 1: energy — Больше энергии / More Energy
  // ─────────────────────────────────────────
  energy: [
    [
      {
        why_ru: 'После сна тело теряет воду. Один стакан с утра помогает запустить метаболизм и поддержать уровень концентрации в первой половине дня.',
        why_en: 'After sleep, the body loses water. One glass in the morning may help restart metabolism and support focus in the first half of the day.',
        how_ru: 'Поставь стакан воды у кровати с вечера. Выпей до того как встанешь.',
        how_en: 'Leave a glass of water by your bed the night before. Drink it before you stand up.',
        freq_ru: 'Каждый день · 1 минута',
        freq_en: 'Every day · 1 minute',
      },
      {
        why_ru: 'Соцсети с утра могут создавать информационный шум с самого начала дня. Тихое начало помогает сохранить спокойный фокус до первых задач.',
        why_en: 'Social media in the morning can create information noise from the very start. A quiet start may help maintain calm focus before the first tasks.',
        how_ru: 'Убери телефон с прикроватной тумбочки. Зарядка — в другой комнате.',
        how_en: 'Remove your phone from the nightstand. Charger goes in another room.',
        freq_ru: 'Каждый день · пассивная привычка',
        freq_en: 'Every day · passive habit',
      },
      {
        why_ru: 'Регулярный режим сна помогает телу адаптироваться к циклу и может улучшить качество отдыха даже без изменения его продолжительности.',
        why_en: 'A regular sleep schedule helps the body adapt to a cycle and may improve rest quality even without changing its duration.',
        how_ru: 'Выбери время и придерживайся его ±30 минут даже в выходные.',
        how_en: 'Pick a time and stick to it ±30 minutes, even on weekends.',
        freq_ru: 'Каждый день · вечерний ритуал',
        freq_en: 'Every day · evening ritual',
      },
    ],
    [
      {
        why_ru: 'Короткие периоды активности связаны с улучшением настроения и кровообращения. Необязательно идти в спортзал — достаточно начать двигаться.',
        why_en: 'Short periods of activity are associated with mood improvement and better circulation. No gym needed — just start moving.',
        how_ru: 'Прогулка, зарядка, танцы дома — любое движение. Главное — каждый день.',
        how_en: 'A walk, stretching, dancing at home — any movement. The key is daily.',
        freq_ru: 'Каждый день · 10 минут',
        freq_en: 'Every day · 10 minutes',
      },
      {
        why_ru: 'Белок помогает дольше оставаться сытым и поддерживать стабильный уровень энергии между приёмами пищи.',
        why_en: 'Protein helps you stay fuller longer and may support steadier energy levels between meals.',
        how_ru: 'Яйцо, творог, орехи, бобовые, мясо — хоть что-то белковое в каждом приёме.',
        how_en: 'Eggs, cottage cheese, nuts, legumes, meat — anything protein-based at each meal.',
        freq_ru: '3 раза в день · осознанный выбор',
        freq_en: '3 times a day · mindful choice',
      },
      {
        why_ru: 'Небольшая пауза перед первой чашкой кофе помогает телу сначала проснуться естественным образом. Многие отмечают более ровный уровень энергии в течение дня.',
        why_en: 'A short pause before the first coffee helps the body wake up naturally first. Many people report steadier energy levels throughout the day.',
        how_ru: 'Пей воду или ешь завтрак первым. Кофе — потом.',
        how_en: 'Drink water or eat breakfast first. Coffee comes after.',
        freq_ru: 'Каждый день · один сдвиг',
        freq_en: 'Every day · one shift',
      },
    ],
    [
      {
        why_ru: 'Медленное осознанное дыхание помогает снизить утреннюю тревожность и настроиться на день. Многие практикующие отмечают прилив ясности уже после нескольких минут.',
        why_en: 'Slow mindful breathing may help reduce morning anxiety and prepare for the day. Many practitioners report mental clarity after just a few minutes.',
        how_ru: 'Box breathing: вдох 4 сек, задержка 4, выдох 4, задержка 4. Повтори 5 минут.',
        how_en: 'Box breathing: inhale 4 sec, hold 4, exhale 4, hold 4. Repeat for 5 minutes.',
        freq_ru: 'Каждое утро · 5 минут',
        freq_en: 'Every morning · 5 minutes',
      },
      {
        why_ru: 'Утренний свет связан с регуляцией циркадного ритма. Регулярное пребывание на свету утром может помочь телу лучше различать время бодрствования и сна.',
        why_en: 'Morning light is associated with circadian rhythm regulation. Regular morning light exposure may help the body better distinguish between waking and sleeping time.',
        how_ru: 'Выйди на улицу или сядь у окна в первый час после пробуждения.',
        how_en: 'Go outside or sit by a window within the first hour of waking.',
        freq_ru: 'Каждый день · 10 минут',
        freq_en: 'Every day · 10 minutes',
      },
      {
        why_ru: 'Лёгкая ходьба после еды связана с улучшением пищеварения и может помочь избежать послеобеденной сонливости.',
        why_en: 'Light walking after a meal is associated with better digestion and may help avoid the post-lunch slump.',
        how_ru: 'Встань из-за стола сразу после еды. Небольшая прогулка вместо дивана.',
        how_en: 'Get up from the table right after eating. A short walk instead of the couch.',
        freq_ru: 'Каждый день · 10 минут после обеда',
        freq_en: 'Every day · 10 minutes after lunch',
      },
    ],
  ],

  // ─────────────────────────────────────────
  // GOAL 2: money — Трать умнее / Spend Smarter
  // ─────────────────────────────────────────
  money: [
    [
      {
        why_ru: 'Многие люди теряют счёт небольшим ежедневным тратам. Простая запись помогает увидеть реальную картину и со временем принимать более осознанные решения.',
        why_en: 'Many people lose track of small daily purchases. Simply writing them down helps see the real picture and over time make more mindful decisions.',
        how_ru: 'Каждый вечер 3 минуты — записывай всё что потратил. Заметки, таблица, любой формат.',
        how_en: '3 minutes every evening — write down everything you spent. Notes app, spreadsheet, any format.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
      {
        why_ru: 'Регулярный взгляд на баланс помогает оставаться в контакте с реальным финансовым положением и замечать нежелательные паттерны раньше.',
        why_en: 'Regularly checking your balance helps stay in touch with your actual financial situation and notice unwanted patterns earlier.',
        how_ru: 'Открой приложение банка утром или в обед. Просто посмотри — без оценки и стресса.',
        how_en: 'Open your banking app in the morning or at lunch. Just look — no judgment, no stress.',
        freq_ru: 'Каждый день · 1 минута',
        freq_en: 'Every day · 1 minute',
      },
      {
        why_ru: 'Недельный обзор помогает замечать тенденции которые незаметны в ежедневной спешке. Хороший первый шаг к осознанному управлению деньгами.',
        why_en: 'A weekly review helps notice trends invisible in the daily rush. A good first step toward mindful money management.',
        how_ru: '10 минут в воскресенье — сложи расходы по категориям: кафе, продукты, развлечения.',
        how_en: '10 minutes on Sunday — total your spending by category: cafes, groceries, entertainment.',
        freq_ru: 'Раз в неделю · 10 минут',
        freq_en: 'Once a week · 10 minutes',
      },
    ],
    [
      {
        why_ru: 'Пауза перед импульсивной покупкой даёт время оценить реальную необходимость. Многие обнаруживают что желание проходит само — без усилий.',
        why_en: 'A pause before an impulse buy gives time to evaluate real necessity. Many find the urge passes on its own — without effort.',
        how_ru: 'Хочешь купить что-то незапланированное — запиши в список желаний. Через 24 часа реши нужно ли это.',
        how_en: 'Want to buy something unplanned — add it to a wish list. After 24 hours, decide if you still need it.',
        freq_ru: 'При каждой незапланированной покупке',
        freq_en: 'With every unplanned purchase',
      },
      {
        why_ru: 'Начинать с малого психологически проще. Автоматический перевод помогает выработать привычку откладывать без необходимости каждый раз принимать решение.',
        why_en: 'Starting small is psychologically easier. An automatic transfer helps build the saving habit without needing to decide each time.',
        how_ru: 'Настрой автоперевод в день зарплаты. Пусть деньги уходят до того как ты их увидишь.',
        how_en: 'Set up an automatic transfer on payday. Let the money go before you see it.',
        freq_ru: 'Раз в месяц · автоматически',
        freq_en: 'Once a month · automatic',
      },
      {
        why_ru: 'Заранее написанный план расходов помогает снизить финансовую тревогу и избежать ситуаций когда деньги заканчиваются раньше месяца.',
        why_en: 'A written spending plan helps reduce financial anxiety and avoid situations where money runs out before the month ends.',
        how_ru: 'В последнее воскресенье месяца выпиши фиксированные расходы: аренда, еда, транспорт, подписки.',
        how_en: 'Last Sunday of the month — list fixed expenses: rent, food, transport, subscriptions.',
        freq_ru: 'Раз в месяц · 15 минут',
        freq_en: 'Once a month · 15 minutes',
      },
    ],
    [
      {
        why_ru: 'После месяца с 1% большинство людей почти не замечают этой суммы. 5% — это уже реальный буфер который начинает работать на тебя.',
        why_en: 'After a month at 1%, most people barely notice that amount. 5% is a real buffer that starts working for you.',
        how_ru: 'Увеличь автоперевод с 1% до 5%. Скорее всего ты этого не почувствуешь.',
        how_en: 'Increase your automatic transfer from 1% to 5%. You likely won\'t even notice the difference.',
        freq_ru: 'Один раз · настройка',
        freq_en: 'Once · one-time setup',
      },
      {
        why_ru: 'Базовое понимание финансовых инструментов помогает принимать более осознанные решения. Одна тема в месяц — посильный и нестрессовый темп.',
        why_en: 'Basic understanding of financial instruments helps make more informed decisions. One topic per month is a manageable and stress-free pace.',
        how_ru: 'Выбери один инструмент — прочитай одну статью или посмотри одно видео.',
        how_en: 'Pick one instrument — read one article or watch one video.',
        freq_ru: 'Раз в месяц · 20 минут',
        freq_en: 'Once a month · 20 minutes',
      },
      {
        why_ru: 'Регулярная рефлексия помогает замечать что реально работает именно для тебя, а не искать универсальные советы в интернете.',
        why_en: 'Regular reflection helps notice what actually works for you personally, rather than searching for universal advice online.',
        how_ru: 'В конце месяца — 15 минут. Три вопроса: где лишнего? где сэкономил? что изменю?',
        how_en: 'End of month — 15 minutes. Three questions: where did I overspend? where did I save? what will I change?',
        freq_ru: 'Раз в месяц · 15 минут',
        freq_en: 'Once a month · 15 minutes',
      },
    ],
  ],

  // ─────────────────────────────────────────
  // GOAL 3: calm — Стать спокойнее / Feel Calmer
  // ─────────────────────────────────────────
  calm: [
    [
      {
        why_ru: 'Медленное дыхание перед сном — простая практика которая помогает многим людям успокоить поток мыслей и легче переключиться в режим отдыха.',
        why_en: 'Slow breathing before sleep is a simple practice that helps many people quiet racing thoughts and transition into rest mode more easily.',
        how_ru: 'Вдох 4 секунды, задержка 7 секунд, выдох 8 секунд. Повтори 4 раза.',
        how_en: 'Inhale 4 seconds, hold 7 seconds, exhale 8 seconds. Repeat 4 times.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
      {
        why_ru: 'Письмо от руки с утра помогает многим людям разгрузить голову от накопившихся мыслей и начать день с более ясным состоянием.',
        why_en: 'Morning handwriting helps many people clear accumulated thoughts and start the day with a calmer, clearer state of mind.',
        how_ru: 'Сразу после пробуждения — пиши всё что приходит в голову. Не перечитывай, не оценивай.',
        how_en: 'Right after waking — write whatever comes to mind. Don\'t reread, don\'t judge.',
        freq_ru: 'Каждое утро · 5 минут',
        freq_en: 'Every morning · 5 minutes',
      },
      {
        why_ru: 'Пребывание на свежем воздухе и движение связаны с улучшением настроения. Даже короткая прогулка помогает сменить контекст и снизить напряжение.',
        why_en: 'Being outdoors and moving are associated with mood improvement. Even a short walk can help shift context and reduce tension.',
        how_ru: 'Выйди без наушников. Просто иди и смотри вокруг — без цели и без спешки.',
        how_en: 'Go outside without headphones. Just walk and look around — no goal, no rush.',
        freq_ru: 'Каждый день · 15 минут',
        freq_en: 'Every day · 15 minutes',
      },
    ],
    [
      {
        why_ru: 'Двойной вдох через нос с медленным выдохом — простая дыхательная техника которую можно использовать в любой момент для быстрого снижения напряжения.',
        why_en: 'A double inhale through the nose with a slow exhale is a simple breathing technique that can be used at any moment to quickly reduce tension.',
        how_ru: 'Два быстрых вдоха носом, один долгий медленный выдох ртом. Повтори 2–3 раза.',
        how_en: 'Two quick nasal inhales, one long slow exhale through the mouth. Repeat 2–3 times.',
        freq_ru: 'При каждом эпизоде тревоги',
        freq_en: 'At every anxiety episode',
      },
      {
        why_ru: 'Короткая пауза в середине дня помогает снизить накопившееся напряжение и вернуть ощущение контроля. Необязательно медитировать — достаточно просто остановиться.',
        why_en: 'A short midday pause may help reduce accumulated tension and restore a sense of control. No need to meditate — just stopping is enough.',
        how_ru: 'Поставь будильник на обед. Сядь, закрой глаза, следи за дыханием 5 минут.',
        how_en: 'Set a lunchtime alarm. Sit down, close your eyes, follow your breath for 5 minutes.',
        freq_ru: 'Каждый день · 5 минут',
        freq_en: 'Every day · 5 minutes',
      },
      {
        why_ru: 'Намеренное внимание к позитивным моментам дня помогает многим людям заканчивать день в более спокойном и благодарном состоянии.',
        why_en: 'Deliberate attention to positive moments of the day helps many people end the day in a calmer and more grateful state.',
        how_ru: 'Перед сном — запиши или просто вспомни три момента за которые сегодня благодарен.',
        how_en: 'Before bed — write down or recall three moments from today you\'re grateful for.',
        freq_ru: 'Каждый вечер · 3 минуты',
        freq_en: 'Every evening · 3 minutes',
      },
    ],
    [
      {
        why_ru: 'Регулярная физическая активность связана с улучшением настроения и снижением уровня стресса. Выбери то что нравится — так проще придерживаться.',
        why_en: 'Regular physical activity is associated with improved mood and lower stress levels. Choose what you enjoy — it\'s easier to stick with.',
        how_ru: 'Йога, бег, велосипед, танцы — любое движение которое нравится. Главное — регулярно.',
        how_en: 'Yoga, running, cycling, dancing — any movement you enjoy. The key is regularity.',
        freq_ru: 'Каждый день · 20 минут',
        freq_en: 'Every day · 20 minutes',
      },
      {
        why_ru: 'Живое общение с другими людьми помогает снизить ощущение изолированности. Даже короткий разговор может изменить тон всего дня.',
        why_en: 'Live interaction with other people helps reduce the sense of isolation. Even a short conversation can change the tone of the whole day.',
        how_ru: 'Позвони кому-то, выпей кофе с коллегой, напиши другу. Не в соцсетях — вживую или по телефону.',
        how_en: 'Call someone, have coffee with a colleague, text a friend. Not on social media — in person or by phone.',
        freq_ru: 'Каждый день · любое время',
        freq_en: 'Every day · any time',
      },
      {
        why_ru: 'Перерыв от новостного потока помогает снизить фоновую тревогу. Многие отмечают что один день без новостей заметно меняет общее самочувствие.',
        why_en: 'A break from news flow may help reduce background anxiety. Many report that one news-free day noticeably changes overall well-being.',
        how_ru: 'Выбери день и не читай новости весь день. Соцсети — можно, новостные ленты — нет.',
        how_en: 'Pick a day and don\'t read news all day. Social media is fine, news feeds are not.',
        freq_ru: 'Раз в неделю · весь день',
        freq_en: 'Once a week · all day',
      },
    ],
  ],

  // ─────────────────────────────────────────
  // GOAL 4: sleep-repair — Наладить сон / Sleep Repair
  // ─────────────────────────────────────────
  'sleep-repair': [
    [
      {
        why_ru: 'Стабильное время подъёма — один из самых эффективных способов наладить циркадный ритм. Тело начинает готовиться ко сну и к пробуждению предсказуемо.',
        why_en: 'A consistent wake time is one of the most effective ways to regulate the circadian rhythm. The body starts preparing for sleep and waking predictably.',
        how_ru: 'Поставь будильник на одно время — и вставай даже в выходные. Первые дни будет тяжело — это нормально.',
        how_en: 'Set your alarm for the same time — and get up even on weekends. The first days will be tough — that\'s normal.',
        freq_ru: 'Каждый день · даже в выходные',
        freq_en: 'Every day · even on weekends',
      },
      {
        why_ru: 'Синий свет от экранов может мешать выработке мелатонина — гормона который помогает засыпать. Замени экран на книгу, дыхание или просто тишину.',
        why_en: 'Blue light from screens may interfere with melatonin production — the hormone that helps with falling asleep. Replace screens with a book, breathing, or simply silence.',
        how_ru: 'Поставь напоминание за 45 минут до сна. Телефон — на зарядку в другую комнату.',
        how_en: 'Set a reminder 45 minutes before bed. Phone — on charge in another room.',
        freq_ru: 'Каждый вечер · пассивная привычка',
        freq_en: 'Every evening · passive habit',
      },
      {
        why_ru: 'Температура тела снижается во время сна. Прохладная комната и темнота создают условия при которых многим людям легче засыпать и дольше спать.',
        why_en: 'Body temperature drops during sleep. A cool room and darkness create conditions in which many people find it easier to fall and stay asleep.',
        how_ru: 'Проветри комнату перед сном. Закрой шторы. Температура 16–20°C считается оптимальной для большинства.',
        how_en: 'Air out the room before bed. Close the curtains. 16–20°C is generally considered optimal for most people.',
        freq_ru: 'Каждый вечер · подготовка среды',
        freq_en: 'Every evening · environment setup',
      },
    ],
    [
      {
        why_ru: 'Повторяющаяся последовательность действий перед сном помогает мозгу понять что пора переключаться в режим отдыха. Это работает как сигнал телу.',
        why_en: 'A repeated sequence of actions before bed helps the brain understand it\'s time to switch to rest mode. It acts as a signal to the body.',
        how_ru: 'Выбери 3–4 простых действия: душ, чай, чтение, дыхание. Делай их в одном порядке каждый вечер.',
        how_en: 'Choose 3–4 simple actions: shower, tea, reading, breathing. Do them in the same order every evening.',
        freq_ru: 'Каждый вечер · 20 минут',
        freq_en: 'Every evening · 20 minutes',
      },
      {
        why_ru: 'Кофеин остаётся в организме до 8 часов. Чашка кофе в 16:00 может влиять на качество сна даже если засыпание кажется нормальным.',
        why_en: 'Caffeine stays in the body for up to 8 hours. A cup of coffee at 4 PM may affect sleep quality even if falling asleep seems fine.',
        how_ru: 'После 14:00 — вода, травяной чай или декаф. Отследи разницу в качестве сна через неделю.',
        how_en: 'After 2 PM — water, herbal tea or decaf. Track the difference in sleep quality after a week.',
        freq_ru: 'Каждый день · одно ограничение',
        freq_en: 'Every day · one restriction',
      },
      {
        why_ru: 'Мозг продолжает прокручивать незакрытые задачи. Письменная разгрузка помогает переложить их на бумагу и снизить умственный шум перед сном.',
        why_en: 'The brain keeps cycling through unfinished tasks. A written brain dump helps transfer them to paper and reduce mental noise before sleep.',
        how_ru: 'За 30 минут до сна — запиши всё что крутится в голове и список задач на завтра. Блокнот рядом с кроватью.',
        how_en: '30 minutes before bed — write down everything on your mind and tomorrow\'s task list. Notebook next to the bed.',
        freq_ru: 'Каждый вечер · 5 минут',
        freq_en: 'Every evening · 5 minutes',
      },
    ],
    [
      {
        why_ru: 'Утренний естественный свет помогает регулировать цикл сна и бодрствования. Это сигнал для тела что день начался.',
        why_en: 'Morning natural light may help regulate the sleep-wake cycle. It signals to the body that the day has begun.',
        how_ru: 'Выйди на улицу или сядь у окна в первые 30 минут после пробуждения.',
        how_en: 'Go outside or sit by a window within the first 30 minutes of waking.',
        freq_ru: 'Каждое утро · 10 минут',
        freq_en: 'Every morning · 10 minutes',
      },
      {
        why_ru: 'Регулярная физическая активность связана с улучшением качества сна. Важно завершить активную тренировку минимум за 2–3 часа до сна.',
        why_en: 'Regular physical activity is associated with improved sleep quality. It\'s best to finish intense exercise at least 2–3 hours before bed.',
        how_ru: 'Прогулка, йога, лёгкая зарядка — главное в первой половине дня или не позже 19:00.',
        how_en: 'A walk, yoga, light exercise — ideally in the first half of the day or no later than 7 PM.',
        freq_ru: 'Каждый день · 20 минут',
        freq_en: 'Every day · 20 minutes',
      },
      {
        why_ru: 'Короткая ежедневная оценка сна помогает замечать что реально влияет на отдых. Со временем паттерны становятся видны и их можно скорректировать.',
        why_en: 'A brief daily sleep rating helps notice what actually affects rest. Over time, patterns become visible and can be adjusted.',
        how_ru: 'После пробуждения — оцени сон от 1 до 5 и запиши одно слово о состоянии. Вчера выпил кофе в 17:00? Отметь.',
        how_en: 'After waking — rate sleep 1 to 5 and write one word about your state. Had coffee at 5 PM yesterday? Note it.',
        freq_ru: 'Каждое утро · 1 минута',
        freq_en: 'Every morning · 1 minute',
      },
    ],
  ],

  // ─────────────────────────────────────────
  // GOAL 5: no-social-spiral — Меньше соцсетей / No Social Spiral
  // ─────────────────────────────────────────
  'no-social-spiral': [
    [
      {
        why_ru: 'Большинство людей сильно недооценивают время в соцсетях. Простая запись реальной цифры — первый шаг к осознанному изменению.',
        why_en: 'Most people heavily underestimate their social media time. Simply recording the real number is the first step toward conscious change.',
        how_ru: 'Открой настройки телефона → Экранное время (iOS) или Цифровое благополучие (Android). Запиши среднее за день.',
        how_en: 'Open phone settings → Screen Time (iOS) or Digital Wellbeing (Android). Write down your daily average.',
        freq_ru: 'Каждый день · 1 минута',
        freq_en: 'Every day · 1 minute',
      },
      {
        why_ru: 'Утренняя проверка соцсетей задаёт реактивный тон всему дню. Небольшая пауза помогает начать день на своих условиях.',
        why_en: 'Morning social media checks set a reactive tone for the whole day. A short pause helps start the day on your own terms.',
        how_ru: 'Телефон оставь на зарядке до завтрака. Замени листанием ленты на что-то другое.',
        how_en: 'Leave the phone on charge until after breakfast. Replace feed scrolling with something else.',
        freq_ru: 'Каждый день · пассивная привычка',
        freq_en: 'Every day · passive habit',
      },
      {
        why_ru: 'Регулярные паузы от экрана помогают многим людям восстановить способность концентрироваться на одном деле без постоянного отвлечения.',
        why_en: 'Regular breaks from screens help many people restore the ability to focus on one thing without constant distraction.',
        how_ru: 'Выбери час когда телефон лежит в другой комнате. Обед, прогулка, вечер с книгой — что угодно.',
        how_en: 'Choose an hour when your phone stays in another room. Lunch, a walk, an evening with a book — anything.',
        freq_ru: 'Каждый день · 1 час',
        freq_en: 'Every day · 1 hour',
      },
    ],
    [
      {
        why_ru: 'Встроенные лимиты создают мягкое напоминание когда время вышло. Это не запрет — это возможность сделать осознанный выбор продолжать или остановиться.',
        why_en: 'Built-in limits create a gentle reminder when time is up. It\'s not a ban — it\'s an opportunity to consciously choose to continue or stop.',
        how_ru: 'Настройки → Экранное время → Лимиты приложений. Поставь на 30 минут меньше текущего среднего.',
        how_en: 'Settings → Screen Time → App Limits. Set it 30 minutes less than your current daily average.',
        freq_ru: 'Один раз · настройка + ежедневное соблюдение',
        freq_en: 'Once · setup + daily adherence',
      },
      {
        why_ru: 'Бессознательное листание ленты «между делом» накапливается незаметно. Специальное время для соцсетей помогает сделать их использование осознанным.',
        why_en: 'Mindless scrolling \'in between\' adds up unnoticed. Designated social media time helps make usage intentional.',
        how_ru: 'Выбери 1–2 временных окна в день для соцсетей — например после обеда и вечером. Вне этого времени — приложения закрыты.',
        how_en: 'Choose 1–2 time windows per day for social media — for example after lunch and in the evening. Outside these times — apps closed.',
        freq_ru: 'Каждый день · осознанный выбор',
        freq_en: 'Every day · intentional choice',
      },
      {
        why_ru: 'Иконка на главном экране — постоянный соблазн. Убрать её в папку или на второй экран снижает количество автоматических открытий без сознательного решения.',
        why_en: 'An icon on the home screen is a constant temptation. Moving it to a folder or second screen reduces automatic opens without conscious intent.',
        how_ru: 'Перенеси все соцсети в одну папку на второй странице. Если хочешь зайти — придётся сделать лишний шаг.',
        how_en: 'Move all social apps into one folder on the second page. If you want to open one — you\'ll need to take an extra step.',
        freq_ru: 'Один раз · изменение среды',
        freq_en: 'Once · environment change',
      },
    ],
    [
      {
        why_ru: 'Просто «меньше соцсетей» не работает — освободившееся время заполнится тем же. Заранее приготовленная альтернатива делает переключение значительно проще.',
        why_en: 'Simply \'less social media\' doesn\'t work — freed time gets filled with the same. A pre-prepared alternative makes switching significantly easier.',
        how_ru: 'Выбери одно занятие заранее: книга, подкаст, прогулка, рукоделие. Приготовь его с вечера — оно должно быть доступно немедленно.',
        how_en: 'Choose one activity in advance: a book, podcast, walk, hobby. Prepare it the evening before — it needs to be immediately available.',
        freq_ru: 'Каждый день · при желании открыть соцсети',
        freq_en: 'Every day · when the urge to scroll hits',
      },
      {
        why_ru: 'Еженедельный цифровой детокс помогает заметить как меняется самочувствие без постоянного информационного потока. Многие удивляются насколько спокойнее ощущается день.',
        why_en: 'A weekly digital detox helps notice how well-being changes without constant information flow. Many are surprised how much calmer the day feels.',
        how_ru: 'Выбери день — воскресенье или выходной. Удали приложения на этот день или попроси кого-то сменить пароль.',
        how_en: 'Choose a day — Sunday or a day off. Delete the apps for that day or ask someone to change the password.',
        freq_ru: 'Раз в неделю · весь день',
        freq_en: 'Once a week · all day',
      },
      {
        why_ru: 'Объективные данные мотивируют лучше чем ощущения. Видеть реальное снижение цифры — лучшая награда за усилия.',
        why_en: 'Objective data motivates better than feelings. Seeing the actual number go down is the best reward for your effort.',
        how_ru: 'Каждое воскресенье — открой статистику и сравни с прошлой неделей. Записывай прогресс.',
        how_en: 'Every Sunday — open your stats and compare with last week. Track your progress.',
        freq_ru: 'Раз в неделю · 5 минут',
        freq_en: 'Once a week · 5 minutes',
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
