
# Удаление всех эмодзи из кодовой базы

## Что найдено

### ProfileView.tsx — объект `traits` (строки 47–59)
Эмодзи используются как `icon` поля в данных и рендерятся через `<span className="text-[18px]">{t.icon}</span>`

| Эмодзи | Заменить на |
|---|---|
| `🧠` (Системное мышление) | `<Brain size={16} />` |
| `⚡` (Инициативность) | `<Zap size={16} />` |
| `🔍` (Рефлексия) | `<Search size={16} />` |
| `📊` (Данные) | `<BarChart2 size={16} />` |
| `✦` (Перфекционизм) | `<Sparkles size={16} />` |
| `🚀` (Автономность) | `<ArrowUpRight size={16} />` |
| `🌙` (Творческие блоки) | `<Moon size={16} />` |
| `☀` (Пик энергии) | `<Sun size={16} />` |

Изменение в данных: `icon: "🧠"` → `icon: <Brain size={16} />` (тип `React.ReactNode`)

Рендер уже корректный — достаточно поменять тип и значения.

### ExpertsView.tsx — поле `icon` в экспертах (строки 43, 62, 79, 97)
Иконка рендерится через `<div className="...text-[20px]">{e.icon}</div>`

| Эксперт | Эмодзи | Заменить на |
|---|---|---|
| ЯРВИС | `✦` | `<Sparkles size={20} />` |
| АННА | `✍` | `<PenLine size={20} />` |
| МАРК | `📊` | `<BarChart2 size={20} />` |
| ЕЛЕНА | `🎯` | `<Target size={20} />` |

Тип `icon: string` → `icon: React.ReactNode`, рендер уже через `{e.icon}`.

### DiscoverView.tsx — строка 76
```tsx
<span className="text-[13px] text-muted-foreground">✦ {article.source}</span>
```
Заменить `✦` на `<Sparkles size={11} className="inline mr-1" />` или просто убрать символ.

### BrainView.tsx — строка 169
```tsx
✓ Готово
```
Заменить на `<Check size={10} /> Готово` (иконка `Check` из lucide-react уже импортирована).

## Технические изменения

### ProfileView.tsx
1. Добавить импорты: `Search, BarChart2, Moon, Zap` (часть уже есть — проверить)
2. Изменить тип `icon` в `traits`: `icon: string` → `icon: React.ReactNode`
3. Заменить 8 строк с эмодзи на JSX-элементы

### ExpertsView.tsx
1. Добавить импорты: `PenLine, Target` (Sparkles, BarChart2 — проверить наличие)
2. Изменить тип `icon: string` → `icon: React.ReactNode` в интерфейсе `Expert`
3. Заменить 4 строки с эмодзи

### DiscoverView.tsx
1. Добавить импорт `Sparkles` если не импортирован
2. Заменить `✦` на иконку

### BrainView.tsx
1. Заменить `✓ Готово` на `<Check size={10} /> Готово` (Check уже импортирован)

## Файлы к изменению
- `src/components/ProfileView.tsx`
- `src/components/ExpertsView.tsx`
- `src/components/DiscoverView.tsx`
- `src/components/BrainView.tsx`
