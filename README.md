# HabitFlow v2

Структура:

```
habitflow/
  index.html
  css/style.css
  js/
    data.js
    state.js
    helpers.js
    render.js
    actions.js
    ui.js
    assets.js   ← пустой; добавьте base64 PNG для стадий и при желании MOOD_IMAGES
```

## Запуск

Откройте `index.html` в браузере или поднимите локальный сервер:

```bash
npx --yes serve .
```

## Скрипты (порядок)

`assets.js` → `data.js` → `state.js` → `helpers.js` → `render.js` → `actions.js` → `ui.js`

## assets.js

Задайте `MOOD_IMAGES` (массив `{ src, ... }`) и при необходимости допишите `STAGES[i].f` / `STAGES[i].m` после загрузки `data.js` (например, в `assets.js` присвоить полям стадий строки base64).

## Данные

`localStorage`, ключ `habitflow_data`. Экспорт/импорт JSON — кнопки в шапке.
