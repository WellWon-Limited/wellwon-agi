
# Plan: Refinement of WellWon Pro UI based on reference screenshots

## 1. Logo fix -- WELLWON uppercase without changing size

**File:** `src/components/Logo.tsx`

- Change text from `lowercase` to `uppercase`
- Keep the same `text-[38px]` size and `font-semibold` weight
- The "pro" badge stays as-is (already small and compact)

## 2. ChatInput -- Glassmorphism effect (Apple Liquid Glass style)

**File:** `src/components/ChatInput.tsx`  
**File:** `src/index.css` (add glass CSS)

The current two-row card layout stays intact. Add a frosted-glass effect:

- Replace `bg-card` with a semi-transparent background (`bg-white/5`)
- Add `backdrop-blur-xl` for the glass blur effect
- Add a subtle gradient border glow using `ring-1 ring-white/10`
- Add a soft inner shadow and outer glow with custom CSS (`shadow-[0_0_30px_rgba(234,56,87,0.08)]`)
- The send button keeps its red accent, but add a subtle pulsing glow when active

Add to `index.css`:
```css
.glass-input {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 0 0 1px rgba(255,255,255,0.05) inset,
    0 8px 32px rgba(0,0,0,0.4),
    0 0 20px rgba(234,56,87,0.06);
}
```

## 3. Detailed review of each reference screenshot -- elements to align

Based on the 10 uploaded reference images, here is what needs to be matched:

### IMG_6862 -- Home screen
- Logo centered vertically with the input bar at the bottom -- already done
- The avatar button (top-left) should show an actual placeholder image, not just a grey circle
- Library icon (top-right) -- already matches

### IMG_6904 -- Chat response view
- Header has a pill-shaped tab bar (Sparkles / Globe / Image) -- already implemented
- Share button on the right -- already there
- Numbered conclusions list with bold highlights -- already matches
- Follow-up input at the bottom -- present but needs the glass effect applied here too

### IMG_6905 -- Chat response with sources
- Add a "Sources" section at the top of the response with small favicon cards (e.g., numbered circular badges linking to sources)
- Each source is a small horizontal card with a number, site icon, and title
- This is missing from the current `ChatResponseView`

### IMG_6906 -- Library view
- Chat list with title, preview text, time, and tags -- already implemented
- Bottom floating nav bar with "Conversations" and "Spaces" tabs -- present
- Floating "New chat" (PenSquare) button -- present
- Needs visual polish: hover state on chat items should highlight title in red

### IMG_6907 -- Spaces tab in Library
- When "Spaces" tab is selected, show a grid of space cards
- Each card: colored icon, title, description, item count
- This content is currently missing -- need to add a spaces section with mock data

### IMG_6908 -- Settings
- Profile section with avatar and username -- present
- Menu items with icons, labels, toggles, chevrons -- present
- "WellWon Pro" subscription badge -- present
- Looks good, minor polish only

### IMG_6909 -- Mode selection sheet
- Three mode cards (Search, Research, Labs) -- already implemented
- Selected mode has a red border accent -- present
- Each card shows icon, label, PRO badge, description -- matches

### IMG_6910 -- Sources sheet
- Upload buttons grid (Image, Camera, File) -- present
- Source toggles (Web, Academic, Finance, Social) -- present
- Matches reference well

### IMG_6911 -- Home input bar detail
- The input bar should have a pill shape with Plus button on the left, scan/mic/send on the right
- **BUT** user explicitly wants to keep the current two-row card layout (not pill)
- So we keep the card layout but apply the glass effect

### IMG_6912 -- Discover / News feed
- Category tabs at top (For You, Top Stories, Tech, Finance, Sports) -- present
- Article cards with image placeholders -- present
- Reaction buttons (thumbs up/down, share) -- present

## 4. Summary of all changes

| File | Changes |
|------|---------|
| `Logo.tsx` | Change `lowercase` to `uppercase`, keep same size |
| `index.css` | Add `.glass-input` CSS class for glassmorphism |
| `ChatInput.tsx` | Apply glass effect classes to the input card container |
| `ChatResponseView.tsx` | Add sources section with mock data (numbered source cards); apply glass effect to follow-up input |
| `LibraryView.tsx` | Add hover highlight on chat titles; add Spaces tab content with mock space cards |
| `Index.tsx` | Update avatar button to show placeholder image instead of grey div |

## Technical details

- No new dependencies needed -- `backdrop-blur` is native Tailwind
- The glassmorphism effect uses CSS `backdrop-filter` which works in all modern mobile browsers
- Mock data for sources: 4-5 numbered source cards with site names
- Mock data for spaces: 3-4 space cards with icons, titles, and descriptions
- All changes stay within existing component architecture and routing
