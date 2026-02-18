
## Задача: унифицировать стиль верхних панелей и улучшить FAB-кнопку

### Что нужно сделать

1. **Стиль верхних панелей** — привести все хедеры (в MobileChatList, TasksView, Inbox, Base) к единому стилю "стеклянной" floating-панели, такой же как в активном чате (back + mode pill + settings)
2. **FAB-кнопка** — сделать больше, опустить ниже, добавить эффект полупрозрачности

---

### Текущее состояние (что не так)

- **MobileChatList** (список бесед): обычные кнопки с `bg-card border border-border/40` — выглядят "плоско"
- **TasksView**: свой хедер, совсем другой стиль
- **Inbox/Base**: вовсе без оформленных кнопок вверху
- **FAB**: `w-12 h-12`, позиция `bottom-[72px]` — маловат и высоко

---

### Решение

#### 1. `src/components/MobileChatList.tsx` — унифицировать Top Bar

Применить тот же glass-стиль к кнопкам настроек и нового чата:

```text
СЕЙЧАС:
  bg-card border border-border/40 → обычный серый прямоугольник

СТАНЕТ:
  background: rgba(255,255,255,0.08)
  backdropFilter: blur(20px)
  border: 1px solid rgba(255,255,255,0.10)
  boxShadow: 0 4px 16px rgba(0,0,0,0.3)
  borderRadius: 50%  (круглые, как back/settings в чате)
```

Логотип JARVIS по центру остаётся как есть.

#### 2. `src/pages/Index.tsx` — хедеры для Inbox, Base, Tasks

Для каждого из этих view добавить floating glass top bar аналогичный чату, но упрощённый:
- Левая кнопка: иконка соответствующего раздела (или просто логотип/sparkles)
- Центр: заголовок раздела (JARVIS / ЗАДАЧИ / ИНБОКС / БАЗА)
- Правая кнопка: Settings2 (открыть системную панель)

Все три кнопки в едином glass-стиле.

#### 3. `src/pages/Index.tsx` — улучшить FAB

```text
СЕЙЧАС:
  w-12 h-12
  bottom-[72px] right-4
  background: rgba(255,255,255,0.10)

СТАНЕТ:
  w-16 h-16  (больше)
  bottom-4 right-4  (ниже, прямо над навигацией)
  background: rgba(255,255,255,0.13)
  border: 1px solid rgba(255,255,255,0.18)
  boxShadow: 0 8px 32px rgba(0,0,0,0.5)
  иконка PenLine увеличить до size={22}
```

---

### Технические изменения по файлам

**`src/components/MobileChatList.tsx`**
- Кнопки в top bar (шестерёнка + карандаш): заменить `bg-card border border-border/40` на inline style с glass-эффектом, скруглить до `borderRadius: "50%"`

**`src/pages/Index.tsx`**
- Для `view === "tasks"`: добавить glass top bar с `CheckSquare` иконкой слева, "ЗАДАЧИ" по центру, `Settings2` справа
- Для `view === "inbox"`: убрать нынешний простой `border-b` хедер, заменить на glass top bar с `Inbox` иконкой слева, "ИНБОКС" по центру, `Settings2` справа
- Для `view === "base"`: добавить glass top bar с `Database` иконкой слева, "БАЗА" по центру, `Settings2` справа
- FAB кнопка: увеличить размер до `w-16 h-16`, изменить позицию на `bottom-4`, усилить blur/shadow/opacity
