# Frontend Implementation Guide

## Visual Style: "Dark Modern Glass" (Ref: VoiceLabs)

**Status**: Draft
**Reference**: VoiceLabs UI (Bento Grid, Dark Mode, Neon Accents)

---

## 1. Design Tokens

### Colors

- **Background**: `#0a0a0a` (Near Black)
- **Surface (Card)**: `#171717` (Dark Grey)
- **Border**: `#333333` (Subtle)
- **Primary Accent**: `#22c55e` (Neon Green - like 'Try for free' button)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#a3a3a3`

### Typography

- **Font Family**: 'Inter', sans-serif
- **Headings**: Semibold/Bold, tighter spacing.
- **Body**: Regular, relaxed line-height.

### Effects

- **Glassmorphism**: Backdrop-filter blur(10px) on sticky headers/overlays.
- **Glow**: Subtle radial-gradient behind active cards.
- **Grid Pattern**: Background visual noise (dots/lines) low opacity (5%).

---

## 2. Layout Structure (Bento Style)

### Main Container

- Max-width: 1200px
- Centered
- Grid gap: 24px

### Components

#### Sidebar (Minimap)

- Fixed position (desktop) / Drawer (mobile).
- Visual: Vertical line with dots (timeline style).
- Active dot: Neon Green glow.

#### Task Card (The "Bento" Box)

- Rounded corners: `1.5rem` (24px).
- Border: 1px solid var(--border).
- **Idle State**: Opacity 0.4, Grayscale.
- **Active State**: Opacity 1, White Text, Green Border Glow.
- **Done State**: Opacity 0.6, Green Checkmark icon.

#### Progress Bar

- Top fixed.
- Thin line with Neon Green fill.

---

## 3. Atomic Components (HTML Structure)

```html
<!-- Card Structure -->
<div class="card phase-card active">
  <div class="card-header">
    <span class="phase-id">01</span>
    <h3>Pahami Masalah</h3>
    <div class="status-icon">...</div>
  </div>
  
  <div class="card-body">
    <!-- Checklist Items -->
    <label class="task-item">
      <input type="checkbox">
      <span class="custom-checkbox"></span>
      <span class="task-text">Analisa Kompetitor</span>
    </label>
  </div>

  <div class="card-footer">
    <button class="btn-primary">Next Step →</button>
  </div>
</div>
```

---

## 4. Animations (CSS)

- **Expand/Collapse**: `transition: grid-template-rows 0.3s ease-out`.
- **Hover**: Subtle lift `transform: translateY(-2px)`.
- **Selection**: Checkbox tick animation (scale in).

---

*Verified against VoiceLabs reference image.*
