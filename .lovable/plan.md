
# Дошлифовка приложения — детальный дизайн-аудит и план итераций

## Итоги аудита: что найдено по каждому экрану

### Проблема 1 — Dashboard: FAB перекрывает контент
`bottom-20` (80px) от низа — FAB закрывает последнюю карточку. Нижняя навигация ~65px + safe area. Нужно `bottom-[88px]`.

Также: карточки в Quick Stats слишком плотные — текст `text-[9px]` почти нечитаем.

### Проблема 2 — Chat List: нет разбивки по датам
Весь список одним потоком без группировки. По дизайн-стандартам мессенджеров: "Сегодня / Вчера / Эта неделя / Ранее". Добавить sticky-заголовки.

### Проблема 3 — Chat Detail: выглядит старо
- `bg-card border border-border` — не соответствует остальному glass-стилю
- Сообщение пользователя использует обычный card, а не glass
- `WellWon AI` — название устарело, должно быть JARVIS
- Sources row: карточки источников слишком широкие (min-w-[140px]) — надо компактнее
- Follow-up suggestions: `bg-card border border-border` — несоответствие теме
- Bottom input: `bg-card border border-border/40` кнопка Plus — несоответствие

### Проблема 4 — Tasks: kanban без визуального разграничения колонок
- Все задачи в одном вертикальном списке — не ясно какой статус у какой
- Нет горизонтального scroll по Kanban-колонкам (как задумано)
- Счётчик задач в шапке колонок не виден на мобиле
- `bg-card border border-border` у карточек не соответствует glass-теме

### Проблема 5 — Brain: Inbox без разбивки на группы
Inbox просто горизонтальный список. Нет группировки "Сегодня / Вчера". Плюс input для новой заметки перекрывается FAB-кнопкой (нет FAB в BrainView, но нижняя nav мешает).

### Проблема 6 — Briefs: нет прокрутки утреннего брифа до конца
`pb-8` при высоте 100dvh — Dream State карточка обрезается навбаром. Нужно `pb-24`.

### Проблема 7 — Capsules: TopBar отображает "КАПСУЛЫ" но Detail-экран тоже под ним
В CapsuleDetail нет кнопки выхода (Back) привязанной к топ-бару — кнопка "Назад" в теле страницы, что неконсистентно.

### Проблема 8 — Experts: Detail-карточка эксперта выглядит как список, не как профиль
Блок с иконкой эксперта 16x16 → нужен w-20 h-20, имя крупнее.

### Проблема 9 — Profile: Radar Chart обрезается на мобиле
`height={240}` + margins съедают пространство. Нужен `height={220}` и убрать внешние margin.

### Проблема 10 — More: отсутствует персональный раздел "Профиль" в меню "Ещё"
Профиль теперь отдельная вкладка в Bottom Nav — но в More меню его нет, и нет Analytics.

### Проблема 11 — Глобально: несоответствие стиля в Chat vs остальные экраны
ChatResponseView использует `bg-card border border-border` везде, а все остальные экраны используют `rgba(255,255,255,0.04) + rgba(255,255,255,0.07)`. Нужно унифицировать.

### Проблема 12 — MobileBottomNav: 6 пунктов не помещаются комфортно
Сейчас 6 вкладок (Home, Chat, Brain, Tasks, Profile, More) — на маленьких экранах 320–375px они сжимаются до нечитаемых. Нужно или убрать подписи у некоторых, или сократить до 5.

---

## Итерация 1 — Глобальная унификация стиля

### ChatResponseView.tsx
- Сообщение пользователя: заменить `bg-card border border-border` → glass-стиль `rgba(255,255,255,0.07)`
- JARVIS шапка: переименовать `WellWon AI` → `JARVIS` + добавить цветной badge типа "Slow path"
- Follow-up cards: `bg-card border border-border` → `rgba(255,255,255,0.04)` + `rgba(255,255,255,0.07)`
- Sources mini-cards: уменьшить `min-w-[140px]` → `min-w-[110px]`, компактнее

### TasksView.tsx
- Task cards: заменить `bg-card border border-border` → glass card style
- Добавить горизонтальный scroll для Kanban-колонок (обернуть в `flex overflow-x-auto`)
- Каждая колонка `w-72 shrink-0`

### MobileChatList.tsx
- Добавить sticky-группировки по датам: "Сегодня", "Вчера", "Эта неделя"
- Каждый элемент списка: убрать hover `bg-card/30` → `rgba(255,255,255,0.03)`

---

## Итерация 2 — UX и читаемость

### DashboardView.tsx
- FAB: изменить `bottom-20` → `bottom-[88px]`
- Quick Stats: увеличить `text-[9px]` → `text-[10px]`, добавить `leading-tight`
- Brief Card: добавить реальную дату (через `new Date().toLocaleDateString`)

### BriefsView.tsx
- `pb-8` → `pb-28` чтобы Dream State карточка не обрезалась навбаром

### ProfileView.tsx
- Radar Chart: `height={240}` → `height={200}`, убрать `margin`

### CapsulesView.tsx
- CapsuleDetail: кнопка "Назад" переехать в floating-pill поверх контента (как в других экранах)

### ExpertsView.tsx
- Expert icon в Detail: `w-16 h-16` → `w-20 h-20`

---

## Итерация 3 — Новые компоненты

### AnalyticsView.tsx (новый файл)
Полноценный экран аналитики, который давно запланирован.

Секции:
1. **LLM Costs** — LineChart за 7 дней (recharts), под ним breakdown по моделям (прогресс-бары)
2. **Task Performance** — grid: задач выполнено / fast path % / avg latency / tokens используемых
3. **Expert Performance** — рейтинг агентов с success rate bar
4. **Memory Growth** — Zettels / Links / People / Ideas с delta за неделю

Добавить в Index.tsx:
```
type View = ... | "analytics"
import AnalyticsView
{view === "analytics" && <AnalyticsView onNavigate={handleNavigate} />}
```

Добавить в More:
```
{ id: "analytics", icon: <BarChart2 />, label: "Аналитика", desc: "LLM расходы, задачи, эффективность", color: "text-blue-400" }
```

### Chain of Thought в ChatResponseView.tsx
Добавить collapsible CoT panel над ответом JARVIS:
- Кнопка-пилюля `[Chain of Thought ▼]` под "Проверено N источников"
- При открытии показывает timeline: Router (0.2s) → CEO → Expert → Synthesis
- Каждый шаг: иконка + название + время

---

## Технические детали по файлам

| Файл | Что меняется | Приоритет |
|---|---|---|
| `ChatResponseView.tsx` | glass-style cards, JARVIS brand, CoT panel | Высокий |
| `TasksView.tsx` | horizontal Kanban scroll, glass cards | Высокий |
| `MobileChatList.tsx` | date grouping, unified hover style | Средний |
| `DashboardView.tsx` | FAB position, stats font size, live date | Средний |
| `BriefsView.tsx` | padding bottom fix | Низкий |
| `ProfileView.tsx` | radar chart height | Низкий |
| `ExpertsView.tsx` | icon size in detail | Низкий |
| `CapsulesView.tsx` | back button consistency | Низкий |
| `AnalyticsView.tsx` | новый файл | Средний |
| `Index.tsx` | добавить analytics view + route | Средний |

## Порядок реализации

1. Итерация 1: ChatResponseView + TasksView + MobileChatList (стиль)
2. Итерация 2: Dashboard FAB + Briefs padding + Profile chart + мелкие UX
3. Итерация 3: AnalyticsView + CoT Panel + Index routing

Все три итерации реализуются последовательно в одном прогоне без остановок.
