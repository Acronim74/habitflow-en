// ── Навигация ─────────────────────────────

/** PWA install prompt (Chrome, Edge, Samsung Internet). One-shot. */
let _deferredInstallPrompt = null;
/** Show our own message right after install (tab not yet in standalone). */
let _pwaInstalledThisSession = false;

let _obStep = 0;
const _OB_TOTAL = 9;
const _ONBOARDING_DONE_KEY = 'habitflow_onboarding_done';
let _lastNetworkOnline = null;

/** Короткие заголовки для строки прогресса (как в макете). */
const _OB_HEADINGS = [
  'WELCOME',
  'TRACKING',
  'NOTES',
  'CREATING A HABIT',
  'STREAKS & POINTS',
  'ANALYTICS & BADGES',
  'SETTINGS MENU',
  'INSTALL THE APP',
  'YOUR DATA',
];

function _updateTopBarMeta() {
  const screenEl = document.getElementById('navScreenName');
  const mainEl   = document.getElementById('navDateMain');
  const weekEl   = document.getElementById('navDateWeek');
  const legacyEl = document.getElementById('todayDate');

  const map = {
    today: 'Today',
    habits: 'Habits',
    analytics: 'Analytics',
    badges: 'Badges',
  };
  const d = new Date();
  const dateMain = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  const dateWeek = d.toLocaleDateString('en-US', { weekday: 'long' });

  if (screenEl) screenEl.textContent = map[currentScreen] || 'Today';
  if (mainEl) mainEl.textContent = dateMain;
  if (weekEl) weekEl.textContent = dateWeek;

  if (legacyEl) {
    legacyEl.textContent = d.toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric', month: 'long',
    });
  }
}

// Network indicator: phone (portrait + landscape) = SVG icon; tablet & desktop = text in #navNetStatusTxt (see style.css).
function _netStatusIconSvg(isOnline) {
  if (isOnline) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 2 20 20"/><path d="M8.72 8.72a10.5 10.5 0 0 0-3.58 5.62"/><path d="M12.56 16.6a6 6 0 0 0-1.72-8.12"/><path d="M17.7 17.7a13 13 0 0 0 2.22-5.67"/><path d="M9.35 9.35A5 5 0 0 1 15 12v1"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>';
}

function _syncNetworkStatusUI(announceChange = false) {
  const wrap = document.getElementById('navNetStatus');
  const txt = document.getElementById('navNetStatusTxt');
  const ico = document.getElementById('navNetStatusIco');
  if (!wrap) return;
  const isOnline = navigator.onLine !== false;
  const prev = _lastNetworkOnline;
  _lastNetworkOnline = isOnline;

  if (txt) {
    txt.textContent = isOnline ? '● Online' : '● Offline';
  }
  if (ico) {
    ico.innerHTML = _netStatusIconSvg(isOnline);
  }
  wrap.classList.toggle('offline', !isOnline);
  wrap.setAttribute('aria-label', isOnline ? 'Network status: online' : 'Network status: offline');

  if (announceChange && prev !== null && prev !== isOnline) {
    showToast(isOnline ? 'Internet connection restored' : 'No internet · offline mode');
  }
}

function navigate(screen) {
  currentScreen = screen;

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.screen === screen);
  });

  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });

  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const id = 'screen' + screen.charAt(0).toUpperCase() + screen.slice(1);
  const el = document.getElementById(id);
  if (el) el.classList.add('active');

  _updateTopBarMeta();
  renderScreen();
}

function renderScreen() {
  if (currentScreen === 'today')     renderToday();
  if (currentScreen === 'habits')    renderHabits();
  if (currentScreen === 'analytics') renderAnalytics();
  if (currentScreen === 'badges')    renderBadges();
}

function renderAll() {
  renderNav();
  renderScreen();
  _syncMoodToggleUI();
  _syncDayProgressWidgetToggleUI();
  _syncBestStreakWidgetToggleUI();
  _syncSeriesWidgetToggleUI();
}

/** Синхронизирует переключатель дневника настроения: вкладка «Привычки» и меню «Виджеты». */
function _syncMoodToggleUI() {
  const on = moodEnabled;
  ['moodToggleBtn', 'moodToggleBurger'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.style.background = on ? 'var(--accent)' : 'var(--border2)';
    const knob = btn.querySelector('.mood-toggle-knob') || btn.firstElementChild;
    if (knob) knob.style.left = on ? '23px' : '3px';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

/** Переключатель карточки «Прогресс дня» в меню «Виджеты». */
function _syncDayProgressWidgetToggleUI() {
  const on = dayProgressWidgetEnabled;
  const btn = document.getElementById('dayProgressWidgetToggleBurger');
  if (!btn) return;
  btn.style.background = on ? 'var(--accent)' : 'var(--border2)';
  const knob = btn.querySelector('.mood-toggle-knob') || btn.firstElementChild;
  if (knob) knob.style.left = on ? '23px' : '3px';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/** Переключатель карточки «Личный рекорд» в меню «Виджеты». */
function _syncBestStreakWidgetToggleUI() {
  const on = bestStreakWidgetEnabled;
  const btn = document.getElementById('bestStreakWidgetToggleBurger');
  if (!btn) return;
  btn.style.background = on ? 'var(--accent)' : 'var(--border2)';
  const knob = btn.querySelector('.mood-toggle-knob') || btn.firstElementChild;
  if (knob) knob.style.left = on ? '23px' : '3px';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/** Переключатель карточки «Серия» в меню «Виджеты». */
function _syncSeriesWidgetToggleUI() {
  const on = seriesWidgetEnabled;
  const btn = document.getElementById('seriesWidgetToggleBurger');
  if (!btn) return;
  btn.style.background = on ? 'var(--accent)' : 'var(--border2)';
  const knob = btn.querySelector('.mood-toggle-knob') || btn.firstElementChild;
  if (knob) knob.style.left = on ? '23px' : '3px';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

// ── Экран Привычки ────────────────────────

function renderHabits() {
  const screen = document.getElementById('screenHabits');
  const good   = habits.filter(h => !h.bad);
  const bad    = habits.filter(h =>  h.bad);

  screen.innerHTML = `
    <div class="page-grid">
      <div></div>
      <div>
        <div class="flex" style="justify-content:space-between;
             align-items:center;margin-bottom:16px">
          <div>
            <h1 style="font-size:20px;font-weight:500">Habits</h1>
            <p style="font-size:12px;color:var(--text3);margin-top:2px">
              ${habits.length} habits · ${archived.length} archived
            </p>
          </div>
          <button type="button" class="btn btn-primary"
                  onclick="openCreate('good')">+ Add</button>
        </div>

        ${good.length > 0 ? `
          <div class="sec-header">
            <span class="sec-label">Good habits</span>
            <span class="sec-badge">${good.length}</span>
          </div>
          <div id="hgGoodList" style="display:flex;flex-direction:column;gap:8px">
          </div>` : ''}

        ${bad.length > 0 ? `
          <div class="sec-header" style="margin-top:8px">
            <span class="sec-label">Bad habits</span>
            <span class="sec-badge bad">${bad.length}</span>
          </div>
          <div id="hgBadList" style="display:flex;flex-direction:column;gap:8px">
          </div>` : ''}

        ${habits.length === 0 ? `
          <div style="text-align:center;padding:48px 0;color:var(--text3)">
            <div style="font-size:32px;margin-bottom:12px">🌿</div>
            <div style="font-size:14px">Add your first habit</div>
          </div>` : ''}

        <!-- Дневник настроения -->
        <div style="margin-top:24px;padding-top:16px;
                    border-top:0.5px solid var(--border)">
          <div class="flex" style="justify-content:space-between;
                                    align-items:center">
            <div>
              <div style="font-size:14px;font-weight:500">
                Mood journal
              </div>
              <div style="font-size:12px;color:var(--text3);margin-top:2px">
                Track your mood daily — visible in analytics
              </div>
            </div>
            <button type="button"
                    onclick="toggleMood()"
                    id="moodToggleBtn"
                    aria-pressed="${moodEnabled ? 'true' : 'false'}"
                    aria-label="Mood journal"
                    style="width:44px;height:24px;border-radius:12px;
                           border:none;cursor:pointer;
                           position:relative;transition:background .2s;
                           background:${moodEnabled ? 'var(--accent)' : 'var(--border2)'}">
              <span class="mood-toggle-knob" style="display:block;width:18px;height:18px;border-radius:50%;
                          background:#fff;position:absolute;top:3px;
                          transition:left .2s;
                          left:${moodEnabled ? '23px' : '3px'}">
              </span>
            </button>
          </div>
        </div>

        ${archived.length > 0 ? `
          <div style="margin-top:24px;padding-top:16px;
                      border-top:0.5px solid var(--border)">
            <button type="button"
                    onclick="toggleArchiveSection()"
                    style="display:flex;justify-content:space-between;
                           align-items:center;width:100%;background:transparent;
                           border:none;cursor:pointer;padding:0;font-family:inherit">
              <div>
                <div style="font-size:14px;font-weight:500;color:var(--text1)">
                  Archive
                </div>
                <div style="font-size:12px;color:var(--text3);margin-top:2px">
                  ${archived.length} habits
                </div>
              </div>
              <div id="archiveChevron"
                   style="font-size:16px;color:var(--text3);
                          transition:transform .2s">▾</div>
            </button>
            <div id="archiveList"
                 style="display:none;flex-direction:column;
                        gap:8px;margin-top:12px"></div>
          </div>` : ''}
      </div>
      <div></div>
    </div>`;

  good.forEach(h => {
    const card = _buildHabitManageCard(h);
    document.getElementById('hgGoodList')?.appendChild(card);
  });
  bad.forEach(h => {
    const card = _buildHabitManageCard(h);
    document.getElementById('hgBadList')?.appendChild(card);
  });

  if (archived.length > 0) {
    const archiveList = document.getElementById('archiveList');
    if (archiveList) {
      archived.forEach(h => {
        const card = _buildArchivedCard(h);
        archiveList.appendChild(card);
      });
    }
  }
}

function toggleArchiveSection() {
  const list     = document.getElementById('archiveList');
  const chevron  = document.getElementById('archiveChevron');
  if (!list) return;
  const isOpen = list.style.display === 'flex';
  list.style.display    = isOpen ? 'none' : 'flex';
  list.style.flexDirection = 'column';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function _buildArchivedCard(h) {
  const div = document.createElement('div');
  div.className = 'panel panel-body';
  div.style.cssText = 'cursor:default;opacity:0.7';
  div.innerHTML = `
    <div class="flex" style="justify-content:space-between;align-items:flex-start">
      <div class="flex gap-8 items-center">
        <span style="font-size:20px">${h.icon || '⭐'}</span>
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--text1)">
            ${esc(h.name)}
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">
            ${h.bad ? '🚫 Bad' : '✅ Good'}
            ${esc(scheduleLabel(h))}
          </div>
        </div>
      </div>
      <div class="flex gap-6">
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px"
                onclick="restoreHabit('${h.id}')">
          Restore
        </button>
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px;color:var(--bad);
                       border-color:var(--bad-light)"
                onclick="confirmDeleteArchived('${h.id}')">
          Delete
        </button>
      </div>
    </div>`;
  return div;
}

function confirmDeleteArchived(habitId) {
  const h = archived.find(x => x.id === habitId);
  if (!h) return;
  const ok = confirm('Delete «' + h.name + '» from archive?\nAll history will be permanently deleted.');
  if (!ok) return;
  archived = archived.filter(x => x.id !== habitId);
  saveData();
  renderHabits();
  showToast('Habit deleted from archive');
}

function toggleMood() {
  moodEnabled = !moodEnabled;
  saveData();
  _syncMoodToggleUI();

  const moodSection = document.getElementById('moodSection');
  if (moodSection) {
    if (moodEnabled) {
      moodSection.classList.remove('hidden');
      _renderMood(_todayKey());
    } else {
      moodSection.classList.add('hidden');
    }
  }

  showToast(moodEnabled ? '😊 Mood journal enabled' : 'Mood journal disabled');
}

function toggleDayProgressWidget() {
  dayProgressWidgetEnabled = !dayProgressWidgetEnabled;
  saveData();
  _syncDayProgressWidgetToggleUI();
  const dayProgressSection = document.getElementById('dayProgressSection');
  if (dayProgressSection) {
    dayProgressSection.classList.toggle('hidden', !dayProgressWidgetEnabled);
  }
  showToast(dayProgressWidgetEnabled
    ? 'Day progress widget enabled'
    : 'Day progress widget hidden');
}

function toggleBestStreakWidget() {
  bestStreakWidgetEnabled = !bestStreakWidgetEnabled;
  saveData();
  _syncBestStreakWidgetToggleUI();
  const streakBestSection = document.getElementById('streakBestSection');
  if (streakBestSection) {
    streakBestSection.classList.toggle('hidden', !bestStreakWidgetEnabled);
  }
  showToast(bestStreakWidgetEnabled
    ? 'Personal best widget enabled'
    : 'Personal best widget hidden');
}

function toggleSeriesWidget() {
  seriesWidgetEnabled = !seriesWidgetEnabled;
  saveData();
  _syncSeriesWidgetToggleUI();
  const streakSeriesSection = document.getElementById('streakSeriesSection');
  if (streakSeriesSection) {
    streakSeriesSection.classList.toggle('hidden', !seriesWidgetEnabled);
  }
  showToast(seriesWidgetEnabled
    ? 'Streak widget enabled'
    : 'Streak widget hidden');
}

function _buildHabitManageCard(h) {
  const streak = h.bad ? calcCleanStreakAt(h, _todayKey()) : calcStreak(h);
  const best   = bestStreak(h);
  const notesCount = Object.values(h.notes || {}).filter(n => n.comment).length;
  const div = document.createElement('div');
  div.className = 'panel panel-body habit-manage-card';
  div.innerHTML = `
    <div class="flex" style="justify-content:space-between;align-items:flex-start">
      <div class="flex gap-8 items-center" style="min-width:0;flex:1;cursor:pointer">
        <span style="font-size:20px;flex-shrink:0">${h.icon || '⭐'}</span>
        <div style="min-width:0">
          <div style="font-size:13px;font-weight:500">${esc(h.name)}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">
            ${h.night ? '🌙 ' : ''}${esc(h.category || '')}${esc(scheduleLabel(h))}${notesCount > 0 ? ` · 💬 ${notesCount}` : ''}
          </div>
        </div>
      </div>
      <div class="flex gap-6" style="flex-shrink:0;margin-left:8px">
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px">Edit</button>
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px">Delete</button>
      </div>
    </div>
    <div class="flex gap-12 mt-8" style="font-size:12px;color:var(--text3);cursor:pointer">
      <span>${h.bad ? '🛡️' : '🔥'} Streak: ${streak} d.</span>
      <span>🏆 Best: ${best} d.</span>
    </div>`;

  const [editBtn, deleteBtn] = div.querySelectorAll('.flex.gap-6 .btn');
  editBtn.addEventListener('click', e => { e.stopPropagation(); openEdit(h.id); });
  deleteBtn.addEventListener('click', e => { e.stopPropagation(); openDelete(h.id); });
  div.addEventListener('click', () => openHabitDetail(h.id));

  return div;
}

function openHabitDetail(habitId) {
  const h = habits.find(x => x.id === habitId);
  if (!h) return;

  const streak = h.bad ? calcCleanStreakAt(h, _todayKey()) : calcStreak(h);
  const best   = bestStreak(h);

  const comments = Object.entries(h.notes || {})
    .filter(([, note]) => note.comment)
    .sort(([a], [b]) => b.localeCompare(a));

  const journalHtml = comments.length > 0
    ? comments.map(([dk, note]) => {
        const d = new Date(dk + 'T00:00:00');
        const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        return `<div class="hdetail-note">
          <div class="hdetail-note-date">${dateStr}</div>
          <div class="hdetail-note-text">${esc(note.comment)}</div>
        </div>`;
      }).join('')
    : `<div style="font-size:12px;color:var(--text3);padding:8px 0">
         No notes yet. Mark the habit done and tap 💬 to add one.
       </div>`;

  const modal = document.getElementById('habitDetailModal');
  modal.innerHTML = `
    <div class="hdetail-head">
      <div class="hdetail-title">
        <span class="hdetail-ico">${h.icon || '⭐'}</span>
        <span>${esc(h.name)}</span>
      </div>
      <div class="flex gap-6">
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px" id="hdetailEditBtn">Edit</button>
        <button type="button" class="btn btn-ghost"
                style="font-size:12px;padding:5px 10px" id="hdetailDeleteBtn">Delete</button>
      </div>
    </div>

    ${h.desc ? `<p class="hdetail-desc">${esc(h.desc)}</p>` : ''}

    <div class="hdetail-stats">
      <div class="hdetail-stat">
        <div class="hdetail-stat-val">${streak}</div>
        <div class="hdetail-stat-lbl">${h.bad ? 'days clean' : 'day streak'}</div>
      </div>
      <div class="hdetail-stat">
        <div class="hdetail-stat-val">${best}</div>
        <div class="hdetail-stat-lbl">best streak</div>
      </div>
      <div class="hdetail-stat">
        <div class="hdetail-stat-val">${comments.length}</div>
        <div class="hdetail-stat-lbl">notes</div>
      </div>
    </div>

    <div class="hdetail-journal-head">Notes journal</div>
    <div class="hdetail-journal">${journalHtml}</div>`;

  modal.querySelector('#hdetailEditBtn').addEventListener('click', () => {
    closeHabitDetail(); openEdit(habitId);
  });
  modal.querySelector('#hdetailDeleteBtn').addEventListener('click', () => {
    closeHabitDetail(); openDelete(habitId);
  });

  document.getElementById('habitDetailOverlay').classList.add('open');
}

function closeHabitDetail(e) {
  if (e && e.target !== document.getElementById('habitDetailOverlay')) return;
  document.getElementById('habitDetailOverlay').classList.remove('open');
}

// ── Экран Аналитика ───────────────────────

function renderAnalytics() {
  const screen = document.getElementById('screenAnalytics');
  const { total, month } = calcPoints();
  const good = habits.filter(h => !h.bad);
  const bad  = habits.filter(h =>  h.bad);
  const isPhone = window.innerWidth <= 480;
  const analyticsColStyle = isPhone
    ? 'max-width:min(1200px,100%);overflow-x:hidden'
    : 'max-width:min(1200px,100%)';
  const statsWrapStyle = isPhone
    ? 'display:flex;gap:8px;margin-bottom:12px;flex-wrap:nowrap'
    : 'display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap';
  const statsCardStyle = isPhone
    ? 'flex:1 1 0;min-width:0;text-align:center;padding:8px 6px'
    : 'flex:1 1 180px;min-width:0;text-align:center';
  const statsLabelStyle = isPhone
    ? 'font-size:9px;color:var(--text3);margin-bottom:3px;line-height:1.15;white-space:normal;overflow-wrap:anywhere'
    : 'font-size:11px;color:var(--text3);margin-bottom:4px';
  const statsValueStyle = isPhone
    ? 'font-size:18px;font-weight:500;line-height:1.1'
    : 'font-size:22px;font-weight:500';
  const habitsKpiLabel = isPhone ? 'Habits' : 'Total habits';

  screen.innerHTML = `
    <div class="page-grid">
      <div></div>
      <div style="${analyticsColStyle}">

        <div style="display:flex;justify-content:space-between;
                    align-items:center;margin-bottom:16px">
          <h1 style="font-size:20px;font-weight:500">Analytics</h1>
          <div style="display:flex;gap:4px" id="periodTabs">
            <button type="button" class="btn btn-sm ${_analyticsPeriod==='week'    ?'btn-primary':'btn-ghost'}"
                    onclick="setAnalyticsPeriod('week')">Week</button>
            <button type="button" class="btn btn-sm ${_analyticsPeriod==='month'   ?'btn-primary':'btn-ghost'}"
                    onclick="setAnalyticsPeriod('month')">Month</button>
            <button type="button" class="btn btn-sm ${_analyticsPeriod==='quarter' ?'btn-primary':'btn-ghost'}"
                    onclick="setAnalyticsPeriod('quarter')">Quarter</button>
            <button type="button" class="btn btn-sm ${_analyticsPeriod==='year'    ?'btn-primary':'btn-ghost'}"
                    onclick="setAnalyticsPeriod('year')">Year</button>
          </div>
        </div>

        <div style="${statsWrapStyle}">
          <div class="panel panel-body" style="${statsCardStyle}">
            <div style="${statsLabelStyle}">Total points</div>
            <div style="${statsValueStyle}">${total.toLocaleString()}</div>
          </div>
          <div class="panel panel-body" style="${statsCardStyle}">
            <div style="${statsLabelStyle}">This month</div>
            <div style="${statsValueStyle}">${month.toLocaleString()}</div>
          </div>
          <div class="panel panel-body" style="${statsCardStyle}">
            <div style="${statsLabelStyle}">${habitsKpiLabel}</div>
            <div style="${statsValueStyle}">${habits.length}</div>
          </div>
        </div>

        ${(good.length > 0 || bad.length > 0) ? `
          <div style="display:flex;gap:12px;align-items:stretch;flex-wrap:wrap">
        ${good.length > 0 ? `
          <div class="panel panel-body" style="flex:1 1 300px;min-width:0">
            <div class="panel-title">Good habits</div>
            <div id="hmGoodWrap"></div>
            <div id="hmGoodStats" style="display:flex;gap:16px;margin-top:12px;
                 padding-top:12px;border-top:0.5px solid var(--border)"></div>
          </div>` : ''}
        ${bad.length > 0 ? `
          <div class="panel panel-body" style="flex:1 1 300px;min-width:0">
            <div class="panel-title">Bad habits</div>
            <div id="hmBadWrap"></div>
            <div id="hmBadStats" style="display:flex;gap:16px;margin-top:12px;
                 padding-top:12px;border-top:0.5px solid var(--border)"></div>
          </div>` : ''}
          </div>` : ''}

        ${moodEnabled ? `
          <div class="panel panel-body" style="margin-top:12px">
            <div class="panel-title">Mood</div>
            <div id="moodChartWrap"></div>
            <div id="moodChartStats"
                 style="display:flex;gap:16px;flex-wrap:wrap;margin-top:12px;
                        padding-top:12px;border-top:0.5px solid var(--border)">
            </div>
          </div>` : ''}

        ${habits.length === 0 ? `
          <div style="text-align:center;padding:48px 0;color:var(--text3)">
            <div style="font-size:32px;margin-bottom:12px">🌿</div>
            <div>Add habits to see analytics</div>
          </div>` : ''}

      </div>
      <div></div>
    </div>`;

  if (good.length > 0) _renderHmGood();
  if (bad.length > 0)  _renderHmBad();
  if (moodEnabled) _renderMoodChart();
}

function setAnalyticsPeriod(period) {
  _analyticsPeriod = period;
  renderAnalytics();
}

function _getPeriodDates() {
  const dates = [];
  const end = new Date(TODAY);
  const start = new Date(TODAY);

  if (_analyticsPeriod === 'week') {
    start.setDate(start.getDate() - 6);
  } else if (_analyticsPeriod === 'month') {
    start.setDate(1);
  } else if (_analyticsPeriod === 'quarter') {
    start.setMonth(start.getMonth() - 2);
    start.setDate(1);
  } else {
    start.setFullYear(start.getFullYear() - 1);
    start.setDate(start.getDate() + 1);
  }

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(_dateKey(new Date(d)));
  }
  return dates;
}

function _buildGoodData(dates) {
  const good = habits.filter(h => !h.bad);
  const result = {};
  dates.forEach(dk => {
    const scheduled = good.filter(h => _isWorkDay(h, dk));
    const done = scheduled.filter(h => h.checks?.[dk]).length;
    result[dk] = {
      done,
      total: scheduled.length,
      pct: scheduled.length > 0 ? done / scheduled.length : null
    };
  });
  return result;
}

function _buildBadData(dates) {
  const bad = habits.filter(h => h.bad);
  const result = {};
  dates.forEach(dk => {
    const slips = bad.filter(h => h.slips?.[dk]).length;
    let clean = 0;
    let neutral = 0;
    bad.forEach(h => {
      const day = _localMidnight(dk);
      if (day < _localMidnight(h.createdAt)) return;
      if (h.slips?.[dk]) return;
      if (h.clean?.[dk]) clean++;
      else neutral++;
    });
    result[dk] = {
      slips,
      clean,
      neutral,
      total: bad.length,
    };
  });
  return result;
}

function _renderHmGood() {
  const dates  = _getPeriodDates();
  const gData  = _buildGoodData(dates);
  const wrap   = document.getElementById('hmGoodWrap');
  const stats  = document.getElementById('hmGoodStats');
  if (!wrap) return;

  const RU_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];
  const DOW_SHORT = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  const tk = _todayKey();

  function goodCellBg(pct) {
    if (pct === null) return '#e8e8e0';
    if (pct === 0)    return '#e8e8e0';
    if (pct < 0.4)    return 'var(--accent3)';
    if (pct < 0.7)    return 'var(--accent2)';
    if (pct < 1)      return 'var(--accent)';
    return 'var(--hm-lv4)';
  }

  if (_analyticsPeriod === 'week') {
    let html = `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px">`;
    dates.forEach(dk => {
      const v = gData[dk];
      const pct = v.pct ?? 0;
      const barH = Math.max(4, Math.round(pct * 80));
      const bg = goodCellBg(v.pct);
      const dowIdx = (new Date(dk).getDay() + 6) % 7;
      const isToday = dk === tk;
      html += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:5px">
          <div style="width:100%;height:80px;background:var(--bg);
                      border-radius:6px;overflow:hidden;
                      display:flex;align-items:flex-end">
            <div style="width:100%;height:${barH}px;
                        background:${bg};border-radius:3px 3px 0 0;
                        transition:height .3s ease"></div>
          </div>
          <div style="font-size:11px;color:${isToday?'var(--accent)':'var(--text3)'};
                      font-weight:${isToday?500:400}">
            ${DOW_SHORT[dowIdx]}
          </div>
          <div style="font-size:11px;font-weight:500;color:var(--accent)">
            ${v.pct !== null ? Math.round(v.pct*100)+'%' : '—'}
          </div>
        </div>`;
    });
    html += '</div>';
    wrap.innerHTML = html;
  }

  else if (_analyticsPeriod === 'month') {
    const y = TODAY.getFullYear(), m = TODAY.getMonth();
    const daysInMonth = new Date(y, m+1, 0).getDate();
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;

    let html = `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);
                  gap:3px;margin-bottom:4px">
        ${DOW_SHORT.map(d =>
          `<div style="font-size:10px;color:var(--text4);text-align:center">${d}</div>`
        ).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">`;

    for (let i = 0; i < firstDow; i++) html += '<div></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const dk = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      const v  = gData[dk];
      const isFuture = new Date(y,m,d) > TODAY;
      const isToday  = dk === tk;
      const bg = isFuture ? 'var(--border)' : goodCellBg(v?.pct ?? null);
      const outline = isToday
        ? 'outline:2px solid var(--accent);outline-offset:1px;' : '';
      const pctText = !isFuture && v?.pct !== null
        ? `<span style="font-size:8px;color:${v.pct>=0.7?'#fff':'var(--accent)'}">
            ${Math.round((v.pct??0)*100)}%</span>`
        : `<span style="font-size:9px;color:var(--text4)">${d}</span>`;
      html += `<div style="aspect-ratio:1;border-radius:5px;background:${bg};
                            ${outline}opacity:${isFuture?0.3:1};
                            display:flex;align-items:center;justify-content:center"
                    title="${dk}">${pctText}</div>`;
    }
    html += '</div>';
    wrap.innerHTML = html;
  }

  else if (_analyticsPeriod === 'quarter') {
    const curM = TODAY.getMonth();
    const curY = TODAY.getFullYear();
    const months = [curM-2, curM-1, curM];
    const isPhone = window.innerWidth <= 480;
    const qCols = isPhone ? 2 : 3;
    const qGap = isPhone ? 8 : 16;
    let html = `<div style="display:grid;grid-template-columns:repeat(${qCols},1fr);gap:${qGap}px">`;

    months.forEach(mi => {
      let m = mi;
      let y = curY;
      while (m < 0) { m += 12; y--; }
      while (m > 11) { m -= 12; y++; }

      const daysInMonth = new Date(y, m+1, 0).getDate();
      const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;

      html += `<div>
        <div style="font-size:11px;font-weight:500;color:var(--text2);
                    margin-bottom:6px">${RU_MONTHS[m]}</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;
                    margin-bottom:2px">
          ${DOW_SHORT.map(d =>
            `<div style="font-size:8px;color:var(--text4);text-align:center">${d[0]}</div>`
          ).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">`;

      for (let i=0; i<firstDow; i++) html += '<div></div>';
      for (let d=1; d<=daysInMonth; d++) {
        const dk = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
        const v = gData[dk];
        const isFuture = new Date(y,m,d) > TODAY;
        const isToday  = dk === tk;
        const bg = isFuture ? 'var(--border)' : goodCellBg(v?.pct ?? null);
        const outline = isToday
          ? 'outline:1.5px solid var(--accent);outline-offset:1px;' : '';
        html += `<div style="aspect-ratio:1;border-radius:3px;background:${bg};
                              ${outline}opacity:${isFuture?0.3:1}"
                      title="${dk}"></div>`;
      }
      html += '</div></div>';
    });
    html += '</div>';
    wrap.innerHTML = html;
  }

  else {
    if (window.innerWidth <= 480) {
      const nowY = TODAY.getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => i);

      function renderHalfYear(startMonth) {
        const half = months.slice(startMonth, startMonth + 6);
        let block = '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;width:100%">';

        half.forEach(m => {
          const daysInMonth = new Date(nowY, m + 1, 0).getDate();
          const firstDow = (new Date(nowY, m, 1).getDay() + 6) % 7;

          block += `<div style="min-width:0;overflow:hidden">
            <div style="font-size:10px;font-weight:500;color:var(--text2);margin-bottom:4px">
              ${RU_MONTHS[m]}
            </div>
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;
                        margin-bottom:2px">
              ${DOW_SHORT.map(d =>
                `<div style="font-size:7px;color:var(--text4);text-align:center">${d[0]}</div>`
              ).join('')}
            </div>
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px">`;

          for (let i = 0; i < firstDow; i++) block += '<div></div>';
          for (let d = 1; d <= daysInMonth; d++) {
            const dk = nowY + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
            const day = new Date(nowY, m, d);
            const isFuture = day > TODAY;
            const isToday = dk === tk;
            const v = gData[dk];
            const bg = isFuture ? 'var(--border)' : goodCellBg(v?.pct ?? null);
            const outline = isToday ? 'outline:1px solid var(--accent);outline-offset:1px;' : '';
            block += `<div style="aspect-ratio:1;border-radius:2px;background:${bg};
                                  ${outline}opacity:${isFuture ? 0.3 : 1}"
                            title="${dk}"></div>`;
          }
          block += '</div></div>';
        });

        block += '</div>';
        return block;
      }

      wrap.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>${renderHalfYear(0)}</div>
          <div>${renderHalfYear(6)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:5px;
                    margin-top:8px;justify-content:flex-end;flex-wrap:wrap">
          <div style="width:10px;height:10px;border-radius:2px;background:var(--border)"></div>
          <div style="width:10px;height:10px;border-radius:2px;background:var(--accent3)"></div>
          <div style="width:10px;height:10px;border-radius:2px;background:var(--accent2)"></div>
          <div style="width:10px;height:10px;border-radius:2px;background:var(--accent)"></div>
          <div style="width:10px;height:10px;border-radius:2px;background:var(--hm-lv4)"></div>
          <span style="font-size:10px;color:var(--text4);margin-left:2px">less → more</span>
        </div>`;
    } else {
    const s = new Date(TODAY);
    s.setFullYear(s.getFullYear() - 1);
    s.setDate(s.getDate() + 1);
    while ((s.getDay() + 6) % 7 !== 0) s.setDate(s.getDate() + 1);

    const isPhone = window.innerWidth <= 480;
    const gap = isPhone ? 1 : 3;
    const cell = isPhone ? 5 : 11;
    const monthFont = isPhone ? 7 : 9;
    const monthHeight = isPhone ? 7 : 10;
    const monthBottom = isPhone ? 1 : 2;
    const todayOutline = isPhone
      ? 'outline:1px solid var(--accent);outline-offset:1px;'
      : 'outline:1.5px solid var(--accent);outline-offset:1px;';

    let html = `<div style="display:flex;gap:${gap}px;align-items:flex-start;overflow-x:auto">`;
    const cur = new Date(s);
    let prevM = -1;

    while (cur <= TODAY) {
      const m = cur.getMonth();
      let col = `<div style="display:flex;flex-direction:column;gap:${gap}px">`;
      col += `<div style="font-size:${monthFont}px;color:var(--text4);height:${monthHeight}px;
                           margin-bottom:${monthBottom}px;white-space:nowrap">
                ${m !== prevM ? RU_MONTHS[m] : ''}</div>`;
      prevM = m;
      col += `<div style="display:flex;flex-direction:column;gap:${gap}px">`;

      for (let i = 0; i < 7; i++) {
        const d = new Date(cur); d.setDate(d.getDate() + i);
        const dk = _dateKey(d);
        if (d > TODAY) {
          col += `<div style="width:${cell}px;height:${cell}px;border-radius:2px;opacity:0"></div>`;
          continue;
        }
        const v  = gData[dk];
        const bg = goodCellBg(v?.pct ?? null);
        const isToday = dk === tk;
        const outline = isToday
          ? todayOutline : '';
        col += `<div style="width:${cell}px;height:${cell}px;border-radius:2px;
                             background:${bg};${outline}"
                     title="${dk}: ${v?.pct !== null ? Math.round((v?.pct??0)*100)+'%' : '—'}">
                </div>`;
      }
      col += '</div></div>';
      html += col;
      cur.setDate(cur.getDate() + 7);
    }
    html += '</div>';

    html += `
      <div style="display:flex;align-items:center;gap:5px;
                  margin-top:8px;justify-content:flex-end">
        <div style="width:10px;height:10px;border-radius:2px;background:var(--border)"></div>
        <div style="width:10px;height:10px;border-radius:2px;background:var(--accent3)"></div>
        <div style="width:10px;height:10px;border-radius:2px;background:var(--accent2)"></div>
        <div style="width:10px;height:10px;border-radius:2px;background:var(--accent)"></div>
        <div style="width:10px;height:10px;border-radius:2px;background:var(--hm-lv4)"></div>
        <span style="font-size:10px;color:var(--text4);margin-left:2px">less → more</span>
      </div>`;
    wrap.innerHTML = html;
    }
  }

  const allDates = Object.keys(gData);
  const activeDays = allDates.filter(dk => (gData[dk].pct ?? 0) > 0).length;
  const perfectDays = allDates.filter(dk => gData[dk].pct === 1).length;
  const withPct = allDates.filter(dk => gData[dk].pct !== null);
  const avgPct = withPct.length > 0
    ? Math.round(
        withPct.reduce((s, dk) => s + (gData[dk].pct ?? 0), 0) / withPct.length * 100
      )
    : 0;

  stats.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${activeDays}</div>
      <div style="font-size:10px;color:var(--text3)">active days</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${perfectDays}</div>
      <div style="font-size:10px;color:var(--text3)">perfect days</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${avgPct}%</div>
      <div style="font-size:10px;color:var(--text3)">avg % for period</div>
    </div>`;
}

function _renderHmBad() {
  const dates = _getPeriodDates();
  const bData = _buildBadData(dates);
  const wrap  = document.getElementById('hmBadWrap');
  const stats = document.getElementById('hmBadStats');
  if (!wrap) return;

  const bad = habits.filter(h => h.bad);
  const N   = bad.length;
  const RU_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];
  const DOW_SHORT = ['Mo','Tu','We','Th','Fr','Sa','Su'];
  const tk = _todayKey();

  function buildStackCell(dk, size) {
    const v = bData[dk];
    const isFuture = dk > tk;
    const isToday  = dk === tk;
    const outline  = isToday
      ? `outline:${size>12?2:1.5}px solid var(--bad);outline-offset:1px;` : '';

    if (isFuture || !v) {
      return `<div style="width:${size}px;height:${size}px;border-radius:${size>12?5:2}px;
                           background:var(--border);${outline}opacity:${isFuture?0.3:1}"
                   title="${dk}"></div>`;
    }

    const stripH = Math.max(1, Math.floor((size - (N-1)) / N));
    let strips = '';
    for (let i = 0; i < v.clean; i++) {
      strips += `<div style="height:${stripH}px;background:#52b788;flex-shrink:0"></div>`;
    }
    for (let i = 0; i < v.slips; i++) {
      strips += `<div style="height:${stripH}px;background:#f5c0a8;flex-shrink:0"></div>`;
    }
    for (let i = 0; i < v.neutral; i++) {
      strips += `<div style="height:${stripH}px;background:var(--border);flex-shrink:0"></div>`;
    }
    return `<div style="width:${size}px;height:${size}px;border-radius:${size>12?5:2}px;
                         overflow:hidden;${outline}
                         display:flex;flex-direction:column;gap:1px;padding:${size>12?2:1}px;"
                 title="${dk}: ${v.clean}/${N} clean, ${v.slips} slips">
              ${strips}
            </div>`;
  }

  if (_analyticsPeriod === 'week') {
    let html = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px">';
    dates.forEach(dk => {
      const v = bData[dk];
      const dowIdx = (new Date(dk).getDay() + 6) % 7;
      const isToday = dk === tk;
      html += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:5px">
          ${buildStackCell(dk, 40)}
          <div style="font-size:11px;color:${isToday?'var(--bad)':'var(--text3)'};
                      font-weight:${isToday?500:400}">
            ${DOW_SHORT[dowIdx]}
          </div>
          <div style="font-size:10px;color:var(--text3)">
            ${v ? v.slips+' slips' : '—'}
          </div>
        </div>`;
    });
    html += '</div>';
    wrap.innerHTML = html;
  }

  else if (_analyticsPeriod === 'month') {
    const y = TODAY.getFullYear(), m = TODAY.getMonth();
    const daysInMonth = new Date(y, m+1, 0).getDate();
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;

    let html = `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);
                  gap:3px;margin-bottom:4px">
        ${DOW_SHORT.map(d =>
          `<div style="font-size:10px;color:var(--text4);text-align:center">${d}</div>`
        ).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">`;

    for (let i=0; i<firstDow; i++) html += '<div></div>';
    for (let d=1; d<=daysInMonth; d++) {
      const dk = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      html += buildStackCell(dk, 36);
    }
    html += '</div>';
    wrap.innerHTML = html;
  }

  else if (_analyticsPeriod === 'quarter') {
    const curM = TODAY.getMonth();
    const curY = TODAY.getFullYear();
    const months = [curM-2, curM-1, curM];
    const isPhone = window.innerWidth <= 480;
    const qCols = isPhone ? 2 : 3;
    const qGap = isPhone ? 8 : 16;
    let html = `<div style="display:grid;grid-template-columns:repeat(${qCols},1fr);gap:${qGap}px">`;

    months.forEach(mi => {
      let m = mi;
      let y = curY;
      while (m < 0) { m += 12; y--; }
      while (m > 11) { m -= 12; y++; }

      const daysInMonth = new Date(y, m+1, 0).getDate();
      const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;

      html += `<div>
        <div style="font-size:11px;font-weight:500;color:var(--text2);
                    margin-bottom:6px">${RU_MONTHS[m]}</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;
                    margin-bottom:2px">
          ${DOW_SHORT.map(d =>
            `<div style="font-size:8px;color:var(--text4);text-align:center">${d[0]}</div>`
          ).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">`;

      for (let i=0; i<firstDow; i++) html += '<div></div>';
      for (let d=1; d<=daysInMonth; d++) {
        const dk = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
        html += buildStackCell(dk, 14);
      }
      html += '</div></div>';
    });
    html += '</div>';
    wrap.innerHTML = html;
  }

  else {
    if (window.innerWidth <= 480) {
      const nowY = TODAY.getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => i);

      function renderHalfYear(startMonth) {
        const half = months.slice(startMonth, startMonth + 6);
        let block = '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;width:100%">';

        half.forEach(m => {
          const daysInMonth = new Date(nowY, m + 1, 0).getDate();
          const firstDow = (new Date(nowY, m, 1).getDay() + 6) % 7;

          block += `<div style="min-width:0;overflow:hidden">
            <div style="font-size:10px;font-weight:500;color:var(--text2);margin-bottom:4px">
              ${RU_MONTHS[m]}
            </div>
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;
                        margin-bottom:2px">
              ${DOW_SHORT.map(d =>
                `<div style="font-size:7px;color:var(--text4);text-align:center">${d[0]}</div>`
              ).join('')}
            </div>
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px">`;

          for (let i = 0; i < firstDow; i++) block += '<div></div>';
          for (let d = 1; d <= daysInMonth; d++) {
            const dk = nowY + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
            block += buildStackCell(dk, 8);
          }
          block += '</div></div>';
        });

        block += '</div>';
        return block;
      }

      wrap.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>${renderHalfYear(0)}</div>
          <div>${renderHalfYear(6)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;
                    margin-top:8px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:4px">
            <div style="width:12px;height:12px;border-radius:2px;
                        background:#52b788"></div>
            <span style="font-size:10px;color:var(--text4)">held</span>
          </div>
          <div style="display:flex;align-items:center;gap:4px">
            <div style="width:12px;height:12px;border-radius:2px;
                        background:var(--bad-light)"></div>
            <span style="font-size:10px;color:var(--text4)">slip</span>
          </div>
          <div style="display:flex;align-items:center;gap:4px">
            <div style="width:12px;height:12px;border-radius:2px;
                        background:var(--border)"></div>
            <span style="font-size:10px;color:var(--text4)">unmarked</span>
          </div>
          <span style="font-size:10px;color:var(--text4);margin-left:4px">
            Each strip = one habit
          </span>
        </div>`;
    } else {
    const s = new Date(TODAY);
    s.setFullYear(s.getFullYear() - 1);
    s.setDate(s.getDate() + 1);
    while ((s.getDay() + 6) % 7 !== 0) s.setDate(s.getDate() + 1);

    const isPhone = window.innerWidth <= 480;
    const gap = isPhone ? 1 : 3;
    const cell = isPhone ? 5 : 11;
    const monthFont = isPhone ? 7 : 9;
    const monthHeight = isPhone ? 7 : 10;
    const monthBottom = isPhone ? 1 : 2;

    let html = `<div style="display:flex;gap:${gap}px;align-items:flex-start;overflow-x:auto">`;
    const cur = new Date(s);
    let prevM = -1;

    while (cur <= TODAY) {
      const m = cur.getMonth();
      let col = `<div style="display:flex;flex-direction:column;gap:${gap}px">`;
      col += `<div style="font-size:${monthFont}px;color:var(--text4);height:${monthHeight}px;
                           margin-bottom:${monthBottom}px;white-space:nowrap">
                ${m !== prevM ? RU_MONTHS[m] : ''}</div>`;
      prevM = m;
      col += `<div style="display:flex;flex-direction:column;gap:${gap}px">`;

      for (let i=0; i<7; i++) {
        const d = new Date(cur); d.setDate(d.getDate()+i);
        col += buildStackCell(_dateKey(d), cell);
      }
      col += '</div></div>';
      html += col;
      cur.setDate(cur.getDate() + 7);
    }
    html += '</div>';

    html += `
      <div style="display:flex;align-items:center;gap:8px;
                  margin-top:8px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:4px">
          <div style="width:12px;height:12px;border-radius:2px;
                      background:#52b788"></div>
          <span style="font-size:10px;color:var(--text4)">held</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px">
          <div style="width:12px;height:12px;border-radius:2px;
                      background:var(--bad-light)"></div>
          <span style="font-size:10px;color:var(--text4)">slip</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px">
          <div style="width:12px;height:12px;border-radius:2px;
                      background:var(--border)"></div>
          <span style="font-size:10px;color:var(--text4)">unmarked</span>
        </div>
        <span style="font-size:10px;color:var(--text4);margin-left:4px">
          Each strip = one habit
        </span>
      </div>`;
    wrap.innerHTML = html;
    }
  }

  const allSlips   = Object.values(bData).reduce((s,v) => s + v.slips, 0);
  const perfectDay = Object.values(bData).filter(v => v.slips === 0 && v.clean > 0).length;
  const cleanStrk  = (() => {
    let s = 0, d = new Date(TODAY);
    while (true) {
      const v = bData[_dateKey(d)];
      if (!v || v.slips > 0 || v.neutral > 0) break;
      s++; d.setDate(d.getDate()-1);
    }
    return s;
  })();

  stats.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${allSlips}</div>
      <div style="font-size:10px;color:var(--text3)">slips this period</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${perfectDay}</div>
      <div style="font-size:10px;color:var(--text3)">clean days</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${cleanStrk} d.</div>
      <div style="font-size:10px;color:var(--text3)">current streak</div>
    </div>`;
}

function _moodDotSvg(fill, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 22 22" `
    + `style="display:block;flex-shrink:0" aria-hidden="true">`
    + `<circle cx="11" cy="11" r="9" fill="${fill}"/></svg>`;
}

function _renderMoodChart() {
  const wrap  = document.getElementById('moodChartWrap');
  const stats = document.getElementById('moodChartStats');
  if (!wrap) return;

  const dates = _getPeriodDates();
  const tk    = _todayKey();

  const moodData = {};
  dates.forEach(dk => {
    const m = moodLog[dk];
    if (m !== undefined && m !== null) moodData[dk] = m;
  });

  const recorded = Object.values(moodData);
  const avgMood  = recorded.length > 0
    ? recorded.reduce((s, v) => s + v, 0) / recorded.length
    : null;

  const W = 600, H = 100;
  const PAD_L = 24, PAD_R = 12, PAD_T = 10, PAD_B = 20;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const points = dates
    .map((dk, i) => ({
      dk, i,
      x: PAD_L + (i / Math.max(dates.length - 1, 1)) * chartW,
      y: moodData[dk] !== undefined
        ? PAD_T + chartH - (moodData[dk] / 4) * chartH
        : null,
      mood: moodData[dk],
    }))
    .filter(p => p.y !== null);

  let pathD = '';
  let areaD = '';
  if (points.length > 0) {
    pathD = points.map((p, i) =>
      (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)
    ).join(' ');

    areaD = pathD
      + ` L${points[points.length - 1].x.toFixed(1)},${(PAD_T + chartH).toFixed(1)}`
      + ` L${points[0].x.toFixed(1)},${(PAD_T + chartH).toFixed(1)} Z`;
  }

  const yLabels = [4, 2, 0].map(v => ({
    y: PAD_T + chartH - (v / 4) * chartH,
    color: MOOD_COLORS[v],
  }));

  const xStep = Math.max(1, Math.floor(dates.length / 7));
  const xLabels = dates
    .filter((_, i) => i % xStep === 0 || i === dates.length - 1)
    .map(dk => {
      const [_, m, d] = dk.split('-').map(Number);
      const x = PAD_L + (dates.indexOf(dk) / Math.max(dates.length - 1, 1)) * chartW;
      const label = _analyticsPeriod === 'week'
        ? ['Mo','Tu','We','Th','Fr','Sa','Su'][(new Date(dk).getDay() + 6) % 7]
        : d + '.' + String(m).padStart(2, '0');
      return { x, label };
    });

  const svgContent = `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:${H}px">
      <defs>
        <linearGradient id="moodArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>

      ${yLabels.map(l => `
        <line x1="${PAD_L}" y1="${l.y.toFixed(1)}"
              x2="${W - PAD_R}" y2="${l.y.toFixed(1)}"
              stroke="var(--border)" stroke-width="0.5"/>
        <circle cx="${PAD_L - 11}" cy="${(l.y + 2).toFixed(1)}"
                r="5" fill="${l.color}"
                stroke="var(--surface)" stroke-width="0.75"/>
      `).join('')}

      <line x1="${PAD_L}" y1="${PAD_T + chartH}"
            x2="${W - PAD_R}" y2="${PAD_T + chartH}"
            stroke="var(--border)" stroke-width="0.5"/>

      ${xLabels.map(l => `
        <text x="${l.x.toFixed(1)}" y="${H - 4}"
              font-size="9" text-anchor="middle"
              fill="var(--text4)">${l.label}</text>
      `).join('')}

      ${areaD ? `<path d="${areaD}" fill="url(#moodArea)"/>` : ''}

      ${pathD ? `
        <path d="${pathD}"
              fill="none" stroke="var(--accent)"
              stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
      ` : ''}

      ${points.map(p => `
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}"
                r="3" fill="${MOOD_COLORS[p.mood]}"
                stroke="#fff" stroke-width="1.5">
          <title>${p.dk}: ${MOOD_LABELS[p.mood]}</title>
        </circle>
      `).join('')}

      ${dates.includes(tk) ? (() => {
        const todayX = PAD_L + (dates.indexOf(tk) / Math.max(dates.length - 1, 1)) * chartW;
        return `<line x1="${todayX.toFixed(1)}" y1="${PAD_T}"
                      x2="${todayX.toFixed(1)}" y2="${PAD_T + chartH}"
                      stroke="var(--accent2)" stroke-width="1"
                      stroke-dasharray="3 3"/>`;
      })() : ''}

      ${points.length === 0 ? `
        <text x="${W / 2}" y="${H / 2}" text-anchor="middle"
              font-size="11" fill="var(--text4)">
          No data for this period
        </text>
      ` : ''}
    </svg>`;

  wrap.innerHTML = svgContent;

  const best  = recorded.length > 0 ? Math.max(...recorded) : null;
  const worst = recorded.length > 0 ? Math.min(...recorded) : null;

  if (!stats) return;
  stats.innerHTML = recorded.length === 0
    ? `<span style="font-size:12px;color:var(--text3)">
         Track your mood daily — stats will appear here
       </span>`
    : `
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;min-height:22px">
        ${avgMood !== null ? _moodDotSvg(MOOD_COLORS[Math.round(avgMood)], 22) : '—'}
      </div>
      <div style="font-size:10px;color:var(--text3)">
        avg for period
        ${avgMood !== null ? '(' + avgMood.toFixed(1) + '/4)' : ''}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="font-size:16px;font-weight:500">${recorded.length}</div>
      <div style="font-size:10px;color:var(--text3)">days tracked</div>
    </div>
    ${best !== null ? `
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;min-height:22px">
        ${_moodDotSvg(MOOD_COLORS[best], 22)}
      </div>
      <div style="font-size:10px;color:var(--text3)">best day</div>
    </div>` : ''}
    ${worst !== null && worst !== best ? `
    <div style="display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;min-height:22px">
        ${_moodDotSvg(MOOD_COLORS[worst], 22)}
      </div>
      <div style="font-size:10px;color:var(--text3)">hardest day</div>
    </div>` : ''}`;
}

// ── Экран Значки ──────────────────────────

function renderBadges() {
  const screen = document.getElementById('screenBadges');
  const { total } = calcPoints();
  const stage    = getStage(total);
  const stageIdx = getStageIdx(total);
  const next     = nextStage(total);

  screen.innerHTML = `
    <div class="page-grid">
      <div></div>
      <div>
        <h1 style="font-size:20px;font-weight:500;margin-bottom:4px">
          Badges
        </h1>
        <p style="font-size:12px;color:var(--text3);margin-bottom:16px">
          ${earnedBadges.length} earned · Stage ${stageIdx + 1} of ${STAGES.length}
        </p>

        <div class="panel panel-body" style="text-align:center;margin-bottom:12px">
          <div id="badgesAvatar"
               style="width:80px;height:80px;border-radius:50%;
                      background:${stage.color}33;margin:0 auto 12px;
                      display:flex;align-items:center;justify-content:center;
                      font-size:36px;border:3px solid ${stage.color}">
          </div>
          <div style="font-size:16px;font-weight:500">${esc(stage.name)}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">
            ${total.toLocaleString()} pts
            ${next ? ' · ' + (next.pts - total).toLocaleString()
                     + ' more until ' + esc(next.name) : ''}
          </div>

          <div class="stages-road">
            ${STAGES.map((s, i) => {
              const done    = i < stageIdx;
              const current = i === stageIdx;
              return `<div class="stages-road-item${current ? ' current' : done ? ' done' : ''}">
                        <div class="stages-road-dot" style="--sc:${s.color}">
                          ${s.emoji}
                        </div>
                        <div class="stages-road-name">${esc(s.name)}</div>
                        <div class="stages-road-pts">${s.pts.toLocaleString()}</div>
                      </div>
                      ${i < STAGES.length - 1 ? '<div class="stages-road-line' + (done ? ' done' : '') + '"></div>' : ''}`;
            }).join('')}
          </div>
        </div>

        <div class="panel panel-body">
          <div class="panel-title">
            All badges · ${earnedBadges.length} of ${BADGES.length}
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            ${BADGES.map(b => {
              const earned = earnedBadges.includes(b.id);
              return `
                <div style="text-align:center;opacity:${earned ? 1 : 0.3}">
                  <div style="font-size:32px;margin-bottom:4px">${b.emoji}</div>
                  <div style="font-size:12px;font-weight:500">${esc(b.name)}</div>
                  <div style="font-size:11px;color:var(--text3)">
                    ${earned ? '✓ Earned' : esc(b.desc)}
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>
      <div></div>
    </div>`;

  const avEl = document.getElementById('badgesAvatar');
  if (avEl) avEl.textContent = stage.emoji;
}

// ── Тосты ─────────────────────────────────

function showToast(msg) {
  const wrap = document.getElementById('toastWrap');
  const div  = document.createElement('div');
  div.className   = 'toast';
  div.textContent = msg;
  wrap.appendChild(div);
  requestAnimationFrame(() => {
    div.style.opacity   = '1';
    div.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    div.style.opacity   = '0';
    div.style.transform = 'translateY(8px)';
    setTimeout(() => div.remove(), 300);
  }, 2800);
}

function showPtsToast(pts) {
  showToast('+' + pts + ' pts');
}

function _showBadgeToast(b) {
  const el = document.getElementById('badgeToast');
  if (!el) return;
  document.getElementById('badgeToastEmoji').textContent = b.emoji;
  document.getElementById('badgeToastTitle').textContent = b.name;
  document.getElementById('badgeToastDesc').textContent  = b.desc;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// ── Онбординг-мастер ──────────────────────

function _obRender() {
  _obProgress();
  _obContent();
  _obFooterRender();
}

function _obProgress() {
  const wrap = document.getElementById('obProgress');
  if (!wrap) return;
  const n = _obStep + 1;
  let dots = '';
  for (let i = 0; i < _OB_TOTAL; i++) {
    const cls = i < _obStep ? 'done' : i === _obStep ? 'active' : '';
    dots += `<div class="ob-dot ${cls}"></div>`;
  }
  wrap.innerHTML = `
    <div class="ob-progress-head">Step ${n} of ${_OB_TOTAL} — ${_OB_HEADINGS[_obStep]}</div>
    <div class="ob-progress-bar">
      ${dots}
      <span class="ob-step-label">${n} / ${_OB_TOTAL}</span>
    </div>`;
}

function _obContent() {
  const body = document.getElementById('obBody');
  if (!body) return;
  body.innerHTML = _obSteps()[_obStep];
}

function _obFooterRender() {
  const footer = document.getElementById('obFooter');
  if (!footer) return;
  const isFirst = _obStep === 0;
  const isLast  = _obStep === _OB_TOTAL - 1;

  if (isFirst) {
    footer.innerHTML = `
      <button type="button" class="ob-btn-skip"
              onclick="obSkip()">Skip</button>
      <button type="button" class="ob-btn-next"
              onclick="obNext()">Start →</button>`;
  } else if (isLast) {
    footer.innerHTML = `
      <button type="button" class="ob-btn-back"
              onclick="obPrev()">← Back</button>
      <button type="button" class="ob-btn-demo"
              onclick="loadDemoData()">Demo data</button>
      <button type="button" class="ob-btn-next"
              onclick="obSkip()">Get started!</button>`;
  } else {
    footer.innerHTML = `
      <button type="button" class="ob-btn-back"
              onclick="obPrev()">← Back</button>
      <button type="button" class="ob-btn-next"
              onclick="obNext()">Next →</button>`;
  }
}

function obNext() {
  if (_obStep < _OB_TOTAL - 1) {
    _obStep++;
    _obRender();
  }
}

function obPrev() {
  if (_obStep > 0) {
    _obStep--;
    _obRender();
  }
}

function openOnboarding() {
  _obStep = 0;
  _obRender();
  const el = document.getElementById('onboardingScreen');
  if (el) el.style.display = 'flex';
}

function obSkip() {
  const el = document.getElementById('onboardingScreen');
  if (el) el.style.display = 'none';
  localStorage.setItem(_ONBOARDING_DONE_KEY, '1');
  saveData();
  renderAll();
}

function loadDemoData() {
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return _dateKey(d);
  })();
  const twoDaysAgo = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    return _dateKey(d);
  })();

  const existingIds = new Set(habits.map(h => h.id));
  const toAdd = DEMO_HABITS
    .filter(h => !existingIds.has(h.id))
    .map(h => {
      const copy = JSON.parse(JSON.stringify(h));
      copy.createdAt = twoDaysAgo;
      return copy;
    });

  if (toAdd.length === 0) {
    showToast('Demo data is already installed!');
    return;
  }

  toAdd.forEach(h => {
    if (h.id === 'demo-1') { h.checks[twoDaysAgo] = true; h.checks[yesterday] = true; }
    if (h.id === 'demo-2') { h.checks[yesterday]  = true; }
    if (h.id === 'demo-3') { h.checks[twoDaysAgo] = true; h.checks[yesterday] = true; }
  });

  habits.push(...toAdd);

  if (!moodEnabled) {
    moodEnabled = true;
    moodLog[yesterday]  = moodLog[yesterday]  ?? 3;
    moodLog[twoDaysAgo] = moodLog[twoDaysAgo] ?? 2;
  }

  _migrateData();
  _syncCleanTodaySetFromData();
  saveData();
  obSkip();
  const msg = toAdd.length === DEMO_HABITS.length
    ? 'Demo data loaded · add your own habits!'
    : `Restored ${toAdd.length} demo habit${toAdd.length > 1 ? 's' : ''}`;
  showToast(msg);
}

function _obSteps() {
  return [

    `<div class="ob-ico">🌿</div>
     <div class="ob-title">Welcome to HabitFlow</div>
     <div class="ob-text">A habit tracker that works fully offline.
       Your data is stored only on this device — no servers, no subscriptions.</div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">We'll show you how everything works in a minute.
         Or just dive in — it's all intuitive.</div>
     </div>`,

    `<div class="ob-ico">✅</div>
     <div class="ob-title">Track your habits</div>
     <div class="ob-text">Tap the button on the right — the card will flip and
       show the time you checked in. Tap "undo" to remove the check.</div>
     <div class="ob-preview">
       <div class="ob-card-front">
         <div class="ob-card-row">
           <div class="ob-card-body">
             <div class="ob-card-name">🏃 Morning run</div>
             <div class="ob-card-sub">Start your streak today</div>
           </div>
           <div class="ob-card-check">
             <div class="ob-card-btn"></div>
           </div>
         </div>
         <div class="ob-card-bar"></div>
       </div>
       <div class="ob-card-back">
         <div class="ob-card-back-ico">✓</div>
         <div>
           <div class="ob-card-back-title">Done!</div>
           <div class="ob-card-back-time">07:24</div>
         </div>
         <div class="ob-card-back-undo">undo</div>
       </div>
     </div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">For bad habits — two buttons:
         ✓ Held strong or ✕ Had a slip.</div>
     </div>`,

    `<div class="ob-ico">💬</div>
     <div class="ob-title">Notes on habits</div>
     <div class="ob-text">Once a habit is done, a 💬 button appears — tap it to leave a short note about how it went.</div>
     <div class="ob-preview" style="flex-direction:column;align-items:stretch;gap:8px">
       <div class="ob-card-back" style="border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px">
         <div class="ob-card-back-ico">✓</div>
         <div style="flex:1">
           <div class="ob-card-back-title">Done!</div>
           <div class="ob-card-back-time">07:24</div>
         </div>
         <div style="display:flex;flex-direction:column;gap:5px;align-items:center">
           <div style="font-size:14px;border:0.5px solid rgba(255,255,255,.3);border-radius:6px;padding:2px 7px;cursor:pointer">💬</div>
           <div class="ob-card-back-undo">undo</div>
         </div>
       </div>
       <div class="ob-card-back" style="border-radius:10px;padding:10px 14px;background:var(--surface)">
         <div style="font-size:12px;color:var(--text2);display:flex;align-items:center;gap:6px">
           💬 2 notes <span style="margin-left:auto">▾</span>
         </div>
         <div style="margin-top:6px;font-size:11px;color:var(--text2)">
           <div style="padding:3px 0;border-bottom:0.5px solid var(--border)">3 May · Got up easily, no hesitation</div>
           <div style="padding:3px 0">2 May · Rainy day, ran around the park</div>
         </div>
       </div>
     </div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Past notes appear below the card — tap to expand.
         Great for spotting patterns over time.</div>
     </div>`,

    `<div class="ob-ico-plus" aria-hidden="true">+</div>
     <div class="ob-title">How to create a habit</div>
     <div class="ob-text">Tap "Add habit" — a form will open. Here's what's in it:</div>
     <div class="ob-preview ob-preview-create">
       <div class="ob-preview-label">Habit type</div>
       <div class="ob-type-row">
         <div class="ob-type-btn good">
           <span class="ob-type-glyph" aria-hidden="true">✓</span>
           Good
         </div>
         <div class="ob-type-btn bad">
           <span class="ob-type-glyph" aria-hidden="true">🚫</span>
           Bad
         </div>
       </div>
       <div class="ob-preview-label">Icon</div>
       <div class="ob-icon-row">
         <div class="ob-icon-btn sel">🏃</div>
         <div class="ob-icon-btn">📚</div>
         <div class="ob-icon-btn">🧘</div>
         <div class="ob-icon-btn">💪</div>
         <div class="ob-icon-btn">💧</div>
         <div class="ob-icon-btn">😴</div>
         <div class="ob-icon-btn">🚫</div>
         <div class="ob-icon-btn">🚬</div>
       </div>
       <div class="ob-preview-label">Name</div>
       <div class="ob-field ob-field-placeholder">Morning run</div>
       <div class="ob-preview-label">Schedule</div>
       <div class="ob-sched-row">
         <div class="ob-sched-btn sel">Every day</div>
         <div class="ob-sched-btn">Weekdays</div>
         <div class="ob-sched-btn">Weekend</div>
         <div class="ob-sched-btn">Custom</div>
       </div>
     </div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Schedule affects day progress. A "Weekdays" habit
         doesn't count as missed on weekends — but you can still mark it as a bonus.</div>
     </div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Bad habits don't have a schedule — they are
         tracked every day.</div>
     </div>`,

    `<div class="ob-ico">🔥</div>
     <div class="ob-title">Streaks &amp; points</div>
     <div class="ob-text">Every check earns points.
       The longer the streak — the bigger the multiplier.</div>
     <div class="ob-pts-row">
       <span class="ob-pts-pill good">Good +10 pts</span>
       <span class="ob-pts-pill bad">Bad +5 pts</span>
       <span class="ob-pts-pill bonus">Bonus +10 pts</span>
     </div>
     <div class="ob-mult-card">
       7+ days in a row → <strong style="color:var(--accent)">×2</strong><br>
       30+ days in a row → <strong style="color:var(--accent)">×3</strong><br>
       100+ days in a row → <strong style="color:var(--accent)">×5</strong>
     </div>
     <div class="ob-hint" style="margin-top:10px">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Complete all habits for the day —
         bonus +25 pts.</div>
     </div>`,

    `<div class="ob-ico">📊</div>
     <div class="ob-title">Analytics &amp; badges</div>
     <div class="ob-text">Analytics shows heatmaps for the week, month,
       quarter or year. In badges — your character grows as you earn points.</div>
     <div class="ob-badge-row">
       <div class="ob-badge-item">
         <div class="ob-badge-ico">🔥</div>
         <div class="ob-badge-lbl">First Fire</div>
       </div>
       <div class="ob-badge-item">
         <div class="ob-badge-ico">💎</div>
         <div class="ob-badge-lbl">Diamond</div>
       </div>
       <div class="ob-badge-item">
         <div class="ob-badge-ico locked">🏆</div>
         <div class="ob-badge-lbl">Champion</div>
       </div>
       <div class="ob-badge-item">
         <div class="ob-badge-ico locked">⚡</div>
         <div class="ob-badge-lbl">Centurion</div>
       </div>
       <div class="ob-badge-item">
         <div class="ob-badge-ico locked">🍀</div>
         <div class="ob-badge-lbl">Lucky</div>
       </div>
     </div>
     <div class="ob-hint">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Stages: Beginner → In the Flow → Steady →
         Habit Force → Pillar → Master</div>
     </div>`,

    `<div class="ob-ico">☰</div>
     <div class="ob-title">Settings menu</div>
     <div class="ob-text">Tap the ☰ button in the top-right corner —
       the app settings menu will open.</div>
     <div class="ob-data-row">
       <div class="ob-data-ico">🎨</div>
       <div class="ob-data-text">Theme — four options:
         Light, Dark, Forest and Veloce</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">📊</div>
       <div class="ob-data-text">Widgets — toggle progress, personal best
         and mood cards on or off</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">💾</div>
       <div class="ob-data-text">Data — export and import backup files</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">🎓</div>
       <div class="ob-data-text">Tour — reopen this tour
         at any time</div>
     </div>`,

    `<div class="ob-ico">📲</div>
     <div class="ob-title">Install as an app</div>
     <div class="ob-text">HabitFlow can be installed on your phone or desktop —
       it works like a native app without a browser bar.</div>
     <div class="ob-data-row">
       <div class="ob-data-ico">🤖</div>
       <div class="ob-data-text"><b>Android:</b> open in Chrome →
         menu ⋮ → "Add to Home Screen"</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">🍎</div>
       <div class="ob-data-text"><b>iPhone:</b> open in Safari →
         Share button → "Add to Home Screen"</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">💻</div>
       <div class="ob-data-text"><b>Desktop (Chrome/Edge):</b> tap the install
         icon in the address bar →
         "Install"</div>
     </div>
     <div class="ob-hint" style="margin-top:8px">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Once installed, the app works
         fully offline — data stays on your device.</div>
     </div>`,

    `<div class="ob-ico">💾</div>
     <div class="ob-title">Your data is safe</div>
     <div class="ob-text">Everything is stored locally on this device.
       Use the backup buttons in the menu to save copies.</div>
     <div class="ob-data-row">
       <div class="ob-data-ico">💾</div>
       <div class="ob-data-text">Export — download a backup file (.json)</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">📂</div>
       <div class="ob-data-text">Import — restore from a file</div>
     </div>
     <div class="ob-data-row">
       <div class="ob-data-ico">❓</div>
       <div class="ob-data-text">Help — full documentation</div>
     </div>
     <div class="ob-hint" style="margin-top:4px">
       <div class="ob-hint-ico">💡</div>
       <div class="ob-hint-text">Try the demo data to see the app
         in action — you can delete it any time.</div>
     </div>`,
  ];
}


// ── Помощь (модалка — тот же HTML-контент, без отдельного окна) ──

const GUIDE_MODAL_HTML = `
<div class="wrap">

  <h1>🌿 HabitFlow</h1>
  <p class="subtitle">Offline habit tracker · data stored only on this device</p>

  <h2>App screens</h2>

  <div class="card">
    <div class="card-title">☀️ Today</div>
    <p>Main screen. Shows day progress, habit cards and stats.
    Check off habits here — the card flips to show the completion time.</p>
  </div>

  <div class="card">
    <div class="card-title">✅ Habits</div>
    <p>List of all habits. Add new ones, archive or delete them here.
    The mood journal is also toggled from this screen.</p>
  </div>

  <div class="card">
    <div class="card-title">📊 Analytics</div>
    <p>Activity heatmaps for the week, month, quarter or year.
    Separate maps for good and bad habits.
    If the mood journal is on — a mood line chart appears too.</p>
  </div>

  <div class="card">
    <div class="card-title">🏅 Badges</div>
    <p>Your character and achievements. Stages: Beginner → In the Flow → Steady →
    Habit Force → Pillar → Master. Earn badges for specific milestones.</p>
  </div>

  <h2>Habit types</h2>

  <div class="card">
    <span class="tag tag-good">Good</span>
    <p>Tap the button on the right — the card flips. Shows the check-in time and an
    "undo" button. Check in every day to build a streak.</p>
    <div class="divider"></div>
    <p><span class="pts">+10 pts</span> per check &nbsp;·&nbsp;
    <span class="pts">+25 pts</span> if you complete all habits for the day</p>
  </div>

  <div class="card">
    <span class="tag tag-bad">Bad</span>
    <p>Two buttons: ✓ Held strong or ✕ Had a slip. The card flips —
    green if you held, red if you slipped. Tap the color to undo.</p>
    <div class="divider"></div>
    <p><span class="pts">+5 pts</span> for a clean day · no points for a slip</p>
  </div>

  <div class="card">
    <span class="tag tag-bonus">Bonus</span>
    <p>A good habit with a schedule (e.g. "Weekdays"). On off-days it becomes
    a bonus — you can check it voluntarily and earn extra points.</p>
    <div class="divider"></div>
    <p><span class="pts">+10 pts</span> for a bonus check</p>
  </div>

  <h2>Streaks &amp; multipliers</h2>

  <div class="card">
    <p>The longer the streak — the more points per check:</p>
    <ul style="margin-top: 8px;">
      <li>7+ days in a row: <span class="pts">×2</span></li>
      <li>30+ days in a row: <span class="pts">×3</span></li>
      <li>100+ days in a row: <span class="pts">×5</span></li>
    </ul>
  </div>

  <h2>Schedule</h2>

  <div class="card">
    <p>When creating a habit you can pick a schedule: every day, weekdays, weekend
    or custom days. On days the habit isn't scheduled — it doesn't affect progress,
    but you can still check it in as a bonus.</p>
  </div>

  <h2>Data &amp; backups</h2>

  <div class="card">
    <p>Data is stored in the browser on this device. If you clear browser data —
    history may be lost.</p>
    <div class="divider"></div>
    <p>💾 <strong>Export</strong> — downloads a backup file (.json)<br>
    📂 <strong>Import</strong> — loads a previously saved file.<br>
    Back up regularly, especially before updating the browser.</p>
  </div>

  <h2>Themes</h2>

  <div class="card">
    <p>The theme switcher is in the menu next to the avatar.
    Four themes available: ☀️ Light, 🌙 Dark, 🌿 Forest, ◈ Veloce.</p>
  </div>

  <p class="footer">HabitFlow · works fully offline</p>

</div>
`;

function openGuide() {
  const body = document.getElementById('guideBody');
  const ov = document.getElementById('guideOverlay');
  if (!body || !ov) return;

  if (!body.dataset.ready) {
    body.innerHTML = GUIDE_MODAL_HTML;
    body.dataset.ready = '1';
  }

  ov.classList.add('open');
}

function closeGuide(e) {
  if (e && e.target !== document.getElementById('guideOverlay')) return;
  const el = document.getElementById('guideOverlay');
  if (el) el.classList.remove('open');
}

// ── Бургер-меню ────────────────────────────

function toggleBurger() {
  const drawer  = document.getElementById('burgerDrawer');
  const overlay = document.getElementById('burgerOverlay');
  const btn     = document.getElementById('burgerBtn');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeBurger();
  } else {
    drawer.classList.add('open');
    overlay.classList.add('open');
    btn.classList.add('open');
    _syncMoodToggleUI();
    _syncSeriesWidgetToggleUI();
  }
}

function closeBurger() {
  const drawer  = document.getElementById('burgerDrawer');
  const overlay = document.getElementById('burgerOverlay');
  const btn     = document.getElementById('burgerBtn');
  if (drawer)  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (btn)     btn.classList.remove('open');
}

// ── Инициализация ─────────────────────────

function setTheme(theme, save = true) {
  const allowed = new Set(['light', 'dark', 'forest', 'veloce']);
  const t = allowed.has(theme) ? theme : 'light';
  document.documentElement.setAttribute('data-theme', t);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === t);
  });

  if (save) {
    localStorage.setItem('habitflow_theme', t);
  }
}

function _loadBurgerVersion() {
  const el = document.getElementById('burgerVersion');
  if (!el) return;
  fetch('sw.js', { method: 'HEAD', cache: 'no-cache' })
    .then(r => {
      const raw = r.headers.get('last-modified');
      if (!raw) return;
      const d = new Date(raw);
      const fmt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      el.textContent = 'Updated ' + fmt;
    })
    .catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();

  const shouldShowOnboarding = localStorage.getItem(_ONBOARDING_DONE_KEY) !== '1';
  const onboarding = document.getElementById('onboardingScreen');
  if (onboarding) {
    if (shouldShowOnboarding) {
      _obStep = 0;
      _obRender();
      onboarding.style.display = 'flex';
    } else {
      onboarding.style.display = 'none';
    }
  }

  const savedTheme = localStorage.getItem('habitflow_theme') || 'light';
  setTheme(savedTheme, false);

  navigate('today');
  renderNav();
  checkBadges();
  _syncMoodToggleUI();
  _syncDayProgressWidgetToggleUI();
  _syncBestStreakWidgetToggleUI();
  _syncSeriesWidgetToggleUI();
  _syncNetworkStatusUI(false);
  _loadBurgerVersion();

  document.addEventListener('click', e => {
    const drawer = document.getElementById('burgerDrawer');
    const btn    = document.getElementById('burgerBtn');
    if (!drawer || !drawer.classList.contains('open')) return;
    if (!drawer.contains(e.target) && !btn.contains(e.target)) closeBurger();
  });

  window.addEventListener('online', () => _syncNetworkStatusUI(true));
  window.addEventListener('offline', () => _syncNetworkStatusUI(true));

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredInstallPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    _pwaInstalledThisSession = true;
    _deferredInstallPrompt = null;
    showToast('✓ App installed — open from your home screen');
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => {
          reg.update();
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;
            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                newSW.postMessage('SKIP_WAITING');
              }
            });
          });
        })
        .catch(() => {});

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    });
  }
});

function pwaTryInstall() {
  if (_pwaInstalledThisSession) {
    showToast('✓ App already installed — open from your home screen');
    return;
  }
  if (!_deferredInstallPrompt) {
    showToast('To install: use browser menu → "Add to Home Screen"');
    return;
  }
  try {
    _deferredInstallPrompt.prompt();
    _deferredInstallPrompt.userChoice.then(r => {
      if (r.outcome === 'accepted') showToast('✓ Installing…');
      _deferredInstallPrompt = null;
    });
  } catch (_err) {}
}
