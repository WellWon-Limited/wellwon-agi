

# Plan: Logo fix + UX document integration + UI polish

## 1. Logo: WELLWON uppercase, compact, with rectangular PRO badge

**File:** `src/components/Logo.tsx`

Based on the reference image (image-2.png), the logo needs:
- "WELLWON" in uppercase, **bold/heavy weight** (`font-extrabold` or `font-black`), keeping compact size
- The text should use `text-[32px]` (slightly smaller, "grounded/flat" look as requested)
- "PRO" badge must be **rectangular with slight rounding** (`rounded-lg`, NOT `rounded-md` or `rounded-full`) -- currently it has `rounded-md` which is too circular per user complaint
- PRO badge should be **solid red background** (`bg-primary`) with white text, not the current semi-transparent style
- PRO badge height should visually match the text height (vertically centered, same line)
- Font: keep Inter but go heavier weight

```
WELLWON [PRO]        <-- PRO is a small filled red rectangle
Цифровой сотрудник   <-- subtitle below, muted
```

## 2. Header layout remains: history (left), avatar (right)

Per the memory note `ux/layout-header`, the history icon is on the left, avatar on the right -- this is already correct in the current `Index.tsx`. No changes needed.

## 3. Integrate key patterns from UX document

The uploaded `11-mobile-web-app-ux.md` is a comprehensive design spec for a "Venom" app. We adapt relevant patterns to WellWon's design (dark theme with red accent). Key additions:

### 3a. ChatInput improvements

**File:** `src/components/ChatInput.tsx`

- Increase bottom rounding further to `rounded-[28px]` for a more premium pill-card feel
- Keep the glass-input effect
- Add a subtle animation: when the textarea is focused, the border glow intensifies slightly (red glow increases)
- Add a focused CSS variant `.glass-input-focused` with stronger red glow

### 3b. ChatResponseView -- full Perplexity-style response

**File:** `src/components/ChatResponseView.tsx`

Based on the UX doc patterns and the reference screenshots, enhance:
- **Sources section**: Add horizontal scrollable source cards at top of response (already partially done, but ensure numbered badges with favicons)
- **Follow-up suggestions**: Add pill-shaped suggestion chips below the answer (e.g., "Показать полный источник", "Искать связанные темы")
- **Action buttons row**: Keep Share, Regenerate, Copy, More -- already present
- **Follow-up input**: Keep the glass pill input at bottom -- already present

### 3c. Bottom navigation pattern from UX doc

The UX doc recommends a 4-5 tab bottom navigation. Currently WellWon uses header-based navigation (history icon left, avatar right) which works well for a simpler app. We keep the current approach but ensure the Library view's internal bottom nav (Conversations/Spaces) follows the pill-style pattern properly with enough spacing.

**File:** `src/components/LibraryView.tsx`

- Ensure bottom nav buttons have proper spacing and don't overlap the "New chat" button
- Reduce font size of "Пространства" if it overflows

## 4. CSS additions

**File:** `src/index.css`

Add focused glass variant:
```css
.glass-input-focused {
  border: 1px solid rgba(234, 56, 87, 0.25);
  box-shadow: 
    0 0 0 1px rgba(234,56,87,0.1) inset,
    0 8px 32px rgba(0,0,0,0.4),
    0 0 30px rgba(234,56,87,0.12);
}
```

## Summary of all changes

| File | Changes |
|------|---------|
| `Logo.tsx` | WELLWON uppercase + heavier font weight + PRO badge: solid red rectangle with `rounded-lg`, not circular |
| `index.css` | Add `.glass-input-focused` variant with stronger red glow |
| `ChatInput.tsx` | Increase rounding to `rounded-[28px]`, add focus state class toggle |
| `ChatResponseView.tsx` | Add follow-up suggestion chips below the answer |
| `LibraryView.tsx` | Fix bottom nav spacing to prevent overlap |

## Technical details

- No new dependencies
- Logo font weight changes from `font-semibold` to `font-extrabold` for the heavy look in the reference
- PRO badge changes from `bg-primary/20 text-primary border border-primary/30 rounded-md` to `bg-primary text-white rounded-lg` (solid filled rectangle)
- PRO badge uses `text-[11px]` with `px-2.5 py-1` for proper rectangular proportions matching WELLWON height
- Follow-up suggestion chips: horizontal scroll of `rounded-full bg-card border border-border` pills

