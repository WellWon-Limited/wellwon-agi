
# Полная мобильная структура приложения — план реализации

## Анализ текущего состояния

### Что уже есть:
- Chat list + Chat detail (ChatResponseView)
- TasksView (канбан + команда)
- KnowledgeBaseView (пространства, документы, источники)
- Inbox (базовый, в Index.tsx inline)
- MobileBottomNav с 4 вкладками: Беседы / Задачи / Инбокс / База

### Чего не хватает (по спецификации `10_app_structure.md`):
1. **Dashboard / Home** — нет совсем. Сейчас «home» показывает просто Logo + ChatInput
2. **Brain (Второй мозг)** — есть только "База" (KnowledgeBase), но нет Inbox/Zettelkasten/Graph/People/Ideas внутри Brain
3. **Briefs** — Morning Brief / Evening Report как отдельный экран
4. **Profile** — 9 доменов, Radar chart, эмоциональный тренд
5. **Capsules** — Forward-linking, список с таймерами
6. **Эксперты/Агенты** — Expert Catalog + Background Agents
7. **Навигация** — сейчас 4 вкладки, нужно добавить Home как отдельную первую вкладку + раздел "Ещё"

---

## Архитектура навигации (целевая)

```text
Bottom Tab Bar (5 вкладок):
┌─────────────────────────────────────────┐
│  🏠 Home  │  💬 Чат  │  🧠 Brain  │  ✅ Задачи  │  ··· Ещё  │
└─────────────────────────────────────────┘

"Ещё" → Bottom Sheet / отдельный экран:
  - 📦 Капсулы
  - 🤖 Эксперты
  - 👤 Профиль
  - ⚙ Настройки (→ SystemPanel)
```

Типы view расширяются:
```text
type View = "home" | "chat" | "tasks" | "brain" | "more"
           | "briefs" | "capsules" | "experts" | "profile"
```

---

## Экраны для создания (по приоритету)

### 1. DashboardView — `src/components/DashboardView.tsx` (НОВЫЙ)

**Содержимое:**

**A. Brief Card (hero-блок)**
- Утренний/вечерний статус с приветствием "Доброе утро, Ярослав!"
- 5 задач на сегодня, ближайшее напоминание
- Кнопка "Развернуть полный бриф →" → переход на BriefsView

**B. Today's Tasks (список)**
- 5 задач из GTD (status = 'next'), иконки ☐ / 🤖
- Кнопка "Все →" → TasksView
- Тап → TaskDetail (внутри TasksView)

**C. Active Capsules (3 ближайших)**
- Капсулы с countdown: "Через 2 дня", "Через 4 дня"
- Кнопка "Все →" → CapsulesView

**D. Idea Swipe Cards (если есть)**
- Карточка с названием идеи, виабилити, кнопки ← НЕТ / ДА →
- Tinder-swipe через CSS transform

**E. Quick Stats лента**
- $0.34 LLM · 91% fast · 8/12 задач · 47 zettelов
- Тап → раздел аналитики (пока заглушка)

**F. FAB**
- Кнопка + с меню: 🎤 Голосовая / 💡 Идея / ✅ Задача / 💬 Чат

---

### 2. BrainView — `src/components/BrainView.tsx` (НОВЫЙ)

Заменяет текущую "База" (KnowledgeBaseView остаётся как tab внутри Brain).

**Top Tabs (горизонтальный scroll-pill):**
- Инбокс (3) · Zettelkasten · Люди · Идеи

**Tab: Инбокс**
- Переместить текущий inline Inbox из Index.tsx сюда
- Добавить swipe-кнопки: [→ Zettel] [→ Задача] [Удалить]
- Микрофон-кнопка для голосовой заметки

**Tab: Zettelkasten**
- Поиск + теги (#бизнес, #AI, #marketing)
- Карточки Zettel: заголовок, теги, связи, importance
- Тап → ZettelDetail (инлайн-панель): полный текст, связи, источник

**Tab: Люди**
- Список People Cards: имя, тип отношений, ДР, последний контакт
- Person Detail: факты, связанные заметки, timeline

**Tab: Идеи**
- Список Ideas отсортированный по viability
- Swipe-валидация (tinder-style): влево = архив, вправо = актуально

---

### 3. BriefsView — `src/components/BriefsView.tsx` (НОВЫЙ)

Полный Morning Brief / Evening Report.

**Morning Brief:**
- Шапка с датой, иконкой ☀
- Секция ЗАДАЧИ НА СЕГОДНЯ (нумерованный список со звёздочками приоритета)
- Секция НАПОМИНАНИЯ (капсулы)
- Секция ИДЕЯ ДЛЯ ОБДУМЫВАНИЯ (с кнопками Актуально / Не сейчас)
- Секция ЭНЕРГИЯ (тренд + рекомендация)
- Секция НОЧНОЙ ИТОГ (Dream State: обработано, связи, merged)

**Evening Report:**
- Разбивка выполнено/невыполнено
- Расходы LLM по моделям
- Эффективность (fast path %)
- Dream State — план на ночь

---

### 4. CapsulesView — `src/components/CapsulesView.tsx` (НОВЫЙ)

**Список:**
- Секция АКТИВНЫЕ: карточки с countdown, типом (check/remind/execute), контекстом
- Секция СРАБОТАВШИЕ: архив с результатами
- FAB "+ Создать"

**CapsuleDetail (инлайн):**
- Статус, тип, триггер-дата
- Замороженный контекст (список пунктов)
- Зависимости (zettel-ссылки)
- "Что агент сделает" (numbered steps)
- Кнопки: Редактировать / Отменить / Сработать сейчас

---

### 5. ExpertsView — `src/components/ExpertsView.tsx` (НОВЫЙ)

**Tab: Эксперты**
- Expert Cards: иконка, имя/роль, специальность, задач/мес, успех%
- Expert Detail (инлайн): биография, стиль общения, история взаимодействий

**Tab: Фоновые агенты**
- Agent Cards: название, cron, статус (ON/OFF toggle), последний/следующий запуск
- Toggle для каждого агента

---

### 6. ProfileView — `src/components/ProfileView.tsx` (НОВЫЙ)

**Структура:**
- Аватар + имя + мета ("CEO · ИП · Партнёр стиль")
- Radar Chart (9 доменов: Бизнес, Финансы, Здоровье, Отношения, Развитие...)
  - Рисуем через `recharts` RadarChart (уже в зависимостях)
- Домены список: прогресс-бары с % уверенности
- Эмоциональный тренд (линейный chart за 7 дней)
- Таб "Черты" — подтверждённые/кандидаты/сигналы

---

### 7. MoreView — экран "Ещё"

Не отдельный компонент — встраивается в `view === "more"` в Index.tsx.

**Содержимое:**
- Список разделов: 📦 Капсулы, 🤖 Эксперты, 👤 Профиль, 📊 Аналитика, ⚙ Настройки
- Карточки с иконкой, названием, кратким описанием
- Тап → соответствующий view

---

## Обновления существующих файлов

### `src/components/MobileBottomNav.tsx`
```text
БЫЛО: home | tasks | inbox | base (4 вкладки)
СТАНЕТ: home | chat | brain | tasks | more (5 вкладок)

Иконки:
  🏠 Home     → Home icon
  💬 Чат      → MessageSquare (текущие беседы)
  🧠 Brain    → Brain icon
  ✅ Задачи   → CheckSquare
  ··· Ещё    → MoreHorizontal
```

### `src/pages/Index.tsx`
```text
Расширить type View добавив: "brain" | "more" | "briefs" | "capsules" | "experts" | "profile"
Добавить рендеринг каждого нового view
Обновить handleMobileBack для deep navigation (Briefs ← Home, etc.)
```

---

## Порядок реализации (задачи)

```text
Задача 1: Обновить навигацию
  - MobileBottomNav: 5 вкладок (Home/Чат/Brain/Задачи/Ещё)
  - Index.tsx: расширить View type

Задача 2: DashboardView (Home)
  - Компонент с Brief Card, Tasks, Capsules preview, Quick Stats
  - FAB с expandable меню

Задача 3: BrainView (замена "База")
  - Top tabs: Инбокс / Zettelkasten / Люди / Идеи
  - Перенести Inbox из Index.tsx
  - Реализовать Zettelkasten tab с mock данными
  - Реализовать People tab
  - Реализовать Ideas (swipe cards)

Задача 4: BriefsView
  - Morning Brief полная версия
  - Evening Report

Задача 5: CapsulesView
  - Список + Detail инлайн

Задача 6: ExpertsView
  - Expert Catalog + Background Agents toggle

Задача 7: ProfileView
  - Radar chart (recharts) + домены + тренд

Задача 8: MoreView
  - Экран "Ещё" с навигацией по разделам

Задача 9: Финальная интеграция в Index.tsx
  - Подключить все view, настроить переходы
  - Glass top bars для всех новых экранов
```

---

## Визуальные принципы (из спецификации)

- **Цветовая система**: Primary = текущий `hsl(var(--primary))` (красный). Дополнительные акценты по spec: `#4A9EFF` финансист, `#FF6B9D` маркетолог, `#B77CFF` стратег, `#00D4AA` коуч
- **Glass эффект**: всегда `backdrop-filter: blur(20px)`, `rgba(255,255,255,0.06-0.10)` фон
- **Шрифт Mono**: все метрики, метаданные, лейблы — `font-mono`
- **Разделители**: только `border-white/5` (5% белого), никаких ярких линий
- **Карточки**: `rounded-2xl`, минимальный border `rgba(255,255,255,0.05-0.07)`
- **Radar chart**: через `recharts` (RadarChart + Radar + PolarGrid) — уже в зависимостях

---

## Scope (что делаем / не делаем)

**Делаем:**
- Все 7 новых экранов с полноценными mock данными
- Обновлённую навигацию
- Интерактивность: tabs, detail views (inline), swipe-идеи (CSS), toggles агентов

**Не делаем в этой итерации:**
- Graph View (требует @xyflow/react, отдельная задача)
- Голосовой ввод (требует Web Audio API / MediaRecorder)
- Реальный Radar Chart анимацию (но сам chart рисуем)
- Аналитику (заглушка)
- Desktop-специфичные расширения (не в scope мобильного плана)
