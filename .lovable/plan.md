
# Функциональный аудит: скриншоты vs текущий код

## Сравнение по каждому экрану

### Dashboard (image-20)
Референс показывает:
- Задачи имеют звёздный рейтинг (3 звезды) и метки `agent` / `expert` как цветные badges
- Capsule cards показывают тип иконки (check/remind/execute) с уникальной иконкой для каждого
- FAB внизу справа — уже есть

Что не совпадает в коде:
1. В `todayTasks` нет звёздного рейтинга (priority: "high" есть, но не рендерится как звёзды)
2. Капсулы показывают только синий кружок, в референсе — иконки check/remind/execute
3. Задачи имеют `agent` badge только как текст, но в референсе это зелёный цветной пилюль с иконкой

### Chat (image-21)
Референс показывает:
- В списке чатов у "Финансового анализа Q1" есть иконка-аватар (гистограмма) и badge "2" (непрочитанные)
- В хедере чата — 3 цветных кружка-аватара экспертов + "3 experts" текст
- Ответ имеет цветные `$Finance`, `Marketing`, `Strategy` badges вместо обычного JARVIS
- Chain of Thought показывает "6 steps" с раскрывающимся треугольником

Что не совпадает:
1. В `MobileChatList` нет счётчика непрочитанных и нет аватара-иконки для каждой сессии
2. В хедере чата нет отображения задействованных экспертов (кружки + "N experts")
3. Ответ JARVIS не показывает, какие эксперты участвовали (Finance/Marketing/Strategy badges)
4. CoT panel показывает "6 steps" как счётчик в collapsed состоянии — в коде этого нет

### Brain (image-22)
Референс показывает:
- Inbox items имеют type-badge (link, thought, note) и source-badge (manual, голосовое сообщение, chat)
- FAB раскрывается в 4 опции: Voice Note, New Idea, New Task, Chat — с иконками
- Item "Заметка из звонка с Олегом" имеет связанный тег `переезд в СПб, март` с иконкой звезды

Что не совпадает:
1. Inbox items в коде — просто текст + время, нет type/source badges
2. FAB в BrainView отсутствует (только обычная кнопка "+" для zettel)
3. Нет тегов/связей прямо в Inbox items

### Tasks (image-23)
Референс показывает:
- Kanban колонки: INBOX, NEXT, WAITING, SOMEDAY (не Backlog/Active/Review/Done)
- Каждая задача имеет priority иконку (3 звезды/2 звезды/1 звезда)
- Некоторые задачи имеют `agent` badge (синий) и `expert` badge (фиолетовый)
- Отдельная вкладка "Task Detail" в хедере (3 таба: Kanban | Agent Queue | Task Detail)
- Кнопка `+ New task` и `Filter` в верхнем баре
- Колонки не имеют "все задачи" кнопок — простые headers

Что не совпадает:
1. Статусы в коде: backlog/active/review/done — должны быть inbox/next/waiting/someday
2. В коде нет "Agent Queue" таба в TasksView (только board/agents)
3. Задачи не показывают звёздный приоритет, только цветную точку
4. "Task Detail" — в коде это drawer overlay, но в референсе это отдельная вкладка

### Briefs (image-24)
Референс показывает:
- Задачи в Morning Brief имеют звёзды приоритета И справа метку агента ("Claude Code", "ручная")
- В секции "Напоминания" есть подпись "Кнопки" под временем капсулы

Что не совпадает:
1. В коде в BriefsView агент рендерится под задачей, а в референсе справа как pill
2. Метки агентов — "Claude Code", "Страте р", "ручная" — совсем другие чем АННА/ЯРВИС

### Experts (image-25)
Референс показывает:
- 6 экспертов в сетке 2 колонки (не список): Финансист, Стратег, Маркетолог, Коуч, Юрист, Разработчик
- Каждый эксперт имеет цветную рамку-акцент и progress bar "Задач за месяц / Успех %"
- У каждого эксперта сбоку слева — уникальная цветная иконка ($ для финансиста, etc.)
- Кнопка `+ Add` для добавления нового эксперта
- Заголовок "ЭКСПЕРТЫ" + section header

Что не совпадает:
1. В коде экспертов 4 (ЯРВИС, АННА, МАРК, ЕЛЕНА) — в референсе 6 (Финансист, Стратег, Маркетолог, Коуч, Юрист, Разработчик) с другими ролями/именами
2. Layout в коде — вертикальный список, в референсе — Grid 2 колонки с border-акцентом
3. Нет кнопки "+ Add" для добавления эксперта
4. Иконки экспертов — в референсе они role-based ($, chart, etc.), в коде — общие

### Analytics (image-26)
Референс показывает:
- Bar Chart (не Line Chart!) для LLM costs по дням
- Модели: Claude Sonnet, Gemini Flash, Groq, Embeddings, Whisper
- Правая колонка: "МАРШРУТИЗАЦИЯ" (Fast path 89% / Slow path 11%) + "ЗАДАЧИ" (donut chart: 79 из 87, + breakdown 87 всего / 52 агенты / 35 ручные / avg 2m 14s)
- "ПАМЯТЬ" с числами: Zettels 247, etc.

Что не совпадает:
1. В коде — LineChart, в референсе — BarChart
2. Нет двухколоночного layout — всё вертикально
3. Нет Donut chart для задач
4. Нет "МАРШРУТИЗАЦИЯ" секции с Fast/Slow path
5. Разные модели (Claude 3.7 Sonnet, Gemini 3 Flash, GPT-4o mini vs Claude Sonnet, Gemini Flash, Groq, Embeddings, Whisper)

### Settings (image-27)
Референс показывает:
- 3 секции: АГЕНТ (Имя, Стиль общения, Язык, Модель по умолчанию) + ТИХИЕ ЧАСЫ + УВЕДОМЛЕНИЯ
- Каждый пункт имеет label/sublabel слева и control справа (toggle или select)
- Реальные select inputs для выбора модели (Claude Sonnet), стиля (Партнёр), языка (Русский)

Что не совпадает:
1. Текущий SettingsView — это совсем другой компонент, похожий на iOS Settings с generic items
2. Нет секций АГЕНТ / ТИХИЕ ЧАСЫ / УВЕДОМЛЕНИЯ
3. Нет functional inputs — только статические MenuItem кнопки
4. Нет toggle для тихих часов с timepicker

---

## Полный список функциональных доработок

### Группа 1: Высокий приоритет (несоответствие референсу)

**A. TasksView — GTD статусы + Agent Queue таб**
- Переименовать колонки: `backlog→inbox`, `active→next`, `review→waiting`, `done→done`, добавить `someday`
- Добавить 3-й таб "Agent Queue" рядом с "Команда"
- Добавить звёздный рейтинг на карточках задач (вместо цветной точки)
- Кнопка `+ New task` + `Filter` в верхнем баре (уже частично есть)
- Agent badge = синий, Expert badge = фиолетовый — цвета уже частично есть

**B. AnalyticsView — переработать layout**
- LineChart → BarChart (по референсу image-26)
- Добавить правую/нижнюю колонку "МАРШРУТИЗАЦИЯ" (Fast path % + Slow path %)
- Добавить Donut chart для задач (79/87, breakdown: агенты/ручные/avg время)
- Обновить список моделей: Groq, Embeddings, Whisper
- Добавить двухколоночный layout (chart слева, routing+tasks справа)

**C. ExpertsView — новый каталог 6 экспертов + Grid layout**
- Добавить 2 новых эксперта: Юрист + Разработчик
- Изменить layout на Grid 2 колонки (referencing image-25)
- Добавить кнопку `+ Add` для добавления эксперта
- Цветные рамки у каждой карточки (как в referencing image-25)
- Переименовать: ЯРВИС→Оркестратор, переработать иконки в role-based ($, chart, etc.)

**D. SettingsView — полная переработка**
- Секция АГЕНТ: Имя агента (input), Стиль общения (select: Партнёр/Директор/Коуч), Язык (select), Модель по умолчанию (select: Claude Sonnet/GPT-4o/Gemini)
- Секция ТИХИЕ ЧАСЫ: Toggle + Period (22:00 — 08:00) + Критические уведомления toggle + Утренняя сводка toggle
- Секция УВЕДОМЛЕНИЯ: Утренний бриф (время + toggle), Вечерний отчёт (время + toggle), Капсулы toggle, Напоминания toggle

### Группа 2: Средний приоритет (улучшение функционала)

**E. DashboardView — приоритет задач как звёзды**
- Рендерить `priority` как 1-3 звезды (как в image-20)
- Capsule items — показывать иконку типа (check=квадратик, remind=колокол, execute=треугольник play)
- Agent badge задачи — зелёный pill с текстом (agent badge)

**F. MobileChatList — счётчики + аватары сессий**
- Добавить badge счётчика непрочитанных (красный кружок справа)
- Добавить иконку типа сессии слева (по типу контента: chart icon для финансового анализа, etc.)
- При нажатии на `...` — показать контекстное меню (Переименовать, Удалить, Поделиться)

**G. ChatResponseView — Expert badges**
- Добавить цветные expert badges над ответом (Finance, Marketing, Strategy — как в image-21)
- В CoT показывать count "N steps" в collapsed состоянии

**H. BrainView — FAB + type badges для Inbox**
- Добавить FAB кнопку (раскрывается в 4 опции: Voice Note, New Idea, New Task, Chat)
- Добавить type/source badges для inbox items (link, thought, note, chat)
- Добавить тег-связи прямо в inbox item (как "переезд в СПб, март" с иконкой)

### Группа 3: Низкий приоритет (детали)

**I. BriefsView — расположение агент-метки**
- Agent badge перенести вправо (рядом с task title, а не под ним)
- Изменить тексты агентов — "Claude Code", "ручная" вместо "АННА"/"ЯРВИС"

---

## Технические детали реализации

### SettingsView.tsx (полная переработка)
```text
Новая структура:
- Header: "Настройки" (без кнопки X, как отдельный view)
- Section "АГЕНТ":
  - Имя агента: <input value="WellWon" />
  - Стиль общения: <select> Партнёр / Директор / Коуч
  - Язык: <select> Русский / English
  - Модель: <select> Claude Sonnet / GPT-4o mini / Gemini Flash
- Section "ТИХИЕ ЧАСЫ":
  - Toggle + время 22:00 — 08:00
  - Критические уведомления toggle (on)
  - Утренняя сводка toggle (on)
- Section "УВЕДОМЛЕНИЯ":
  - Утренний бриф: время 08:00 + toggle
  - Вечерний отчёт: время 21:00 + toggle
  - Капсулы toggle
  - Напоминания toggle

Все state через useState, визуально interactive.
```

### TasksView.tsx (статусы + Agent Queue)
```text
type Status = "inbox" | "next" | "waiting" | "someday" | "done"

statusConfig:
  inbox: { label: "Inbox", icon: Circle }
  next: { label: "Next", icon: CircleDot }
  waiting: { label: "Waiting", icon: Clock }
  someday: { label: "Someday", icon: Star }
  done: { label: "Done", icon: CircleCheck }

Task card: priority как звёзды (1-3 звезды, amber цвет)
Agent badge: синий, Expert badge: фиолетовый

3-й таб "Очередь агентов" → показывает список задач в работе у агентов
```

### AnalyticsView.tsx (переработка layout)
```text
Двухколоночный layout на desktop:
  Левая: LLM costs (BarChart), breakdown моделей
  Правая: МАРШРУТИЗАЦИЯ (Fast/Slow path bars) + ЗАДАЧИ (donut + stats)

На мобиле: вертикально

Добавить recharts PieChart/RadialBarChart для donut задач
Обновить costData → BarChart
```

### ExpertsView.tsx (Grid + 6 экспертов)
```text
Добавить экспертов:
  - Юрист (Legal): $color orange, Договоры/риски/compliance
  - Разработчик (CTO): $color cyan, Код/архитектура/техдолг

Grid 2 cols: каждая карточка с colored left-border accent
Кнопка + Add в header
```

### BrainView.tsx (FAB + type badges)
```text
Добавить fabOpen state в BrainView
FAB (bottom-[88px] right-4): раскрывается в 4 опции
  - Mic → Voice Note
  - Lightbulb → New Idea  
  - CheckSquare → New Task → onNavigate("tasks")
  - MessageSquare → Chat → onNavigate("chat")

Inbox items: добавить type field ("link" | "thought" | "note" | "chat")
Type badge рендер: colored pill слева от source
```

---

## Порядок реализации (1 прогон)

1. **SettingsView** — полная переработка (самое большое отклонение)
2. **TasksView** — статусы GTD + Agent Queue таб + звёздный приоритет
3. **AnalyticsView** — BarChart + двухколоночный layout + donut
4. **ExpertsView** — Grid 2 cols + 6 экспертов + кнопка Add
5. **BrainView** — FAB + type badges для inbox
6. **DashboardView** — звёзды приоритета + иконки капсул
7. **ChatResponseView** — expert badges + CoT step count

Файлы к изменению:
- `src/components/SettingsView.tsx` — полная переработка
- `src/components/TasksView.tsx` — GTD статусы, Agent Queue, звёзды
- `src/components/AnalyticsView.tsx` — layout + charts
- `src/components/ExpertsView.tsx` — Grid + 6 экспертов
- `src/components/BrainView.tsx` — FAB + badges
- `src/components/DashboardView.tsx` — звёзды + иконки капсул
- `src/components/ChatResponseView.tsx` — expert badges
