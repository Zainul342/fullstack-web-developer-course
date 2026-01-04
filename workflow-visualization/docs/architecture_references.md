# Architecture References & Design Patterns

**Status**: Research Documentation  
**Created**: 2026-01-04  
**Purpose**: Referensi arsitektur dan design patterns untuk Workflow Visualization App

---

## 🎯 **Alur Sistem Lengkap (User Journey)**

### **Step 1: User Buka Website**

```
User ketik URL → Browser load index.html
  ↓
Load style.css + script.js
  ↓
JavaScript cek localStorage
  ├─ Ada data → Load progress terakhir (misal: Phase 3, 15/47 tasks)
  └─ Tidak ada → Mulai dari Phase 0 (fresh start)
```

### **Step 2: Landing Page (Dashboard)**

User melihat **3 area utama**:

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
│  🚀 AI Workflow [2026]  [🔍 Search] [👁️ Overview]  │
├─────────────────────────────────────────────────────┤
│  PROGRESS BAR                                       │
│  ████████░░░░░░░░░░░░  15 dari 47 tugas (32%)      │
├──────────┬──────────────────────────────────────────┤
│ SIDEBAR  │  CONTENT AREA                            │
│          │                                           │
│ Phase 0  │  ┌─────────────────────────────┐         │
│ Phase 1  │  │ 📦 Phase 0: Persiapan Alat  │ ← AKTIF│
│ Phase 2  │  │ ☑ Install VS Code           │         │
│ Phase 3  │  │ ☐ Buat rules.md             │         │
│ ...      │  │ [Lanjut ke Step Berikutnya] │         │
│          │  └─────────────────────────────┘         │
│          │                                           │
│          │  ┌─────────────────────────────┐         │
│          │  │ 📝 Phase 1: ... (dimmed)    │ ← BLUR │
│          │  └─────────────────────────────┘         │
└──────────┴──────────────────────────────────────────┘
```

### **Step 3: User Interaksi**

#### **Skenario A: Centang Task**

```
User klik checkbox "Install VS Code" 
  ↓
JavaScript update state: progress['p0-t1'] = true
  ↓
Save ke localStorage
  ↓
Update progress bar: 15 → 16 tasks (32% → 34%)
  ↓
Checkbox berubah hijau ✅
```

#### **Skenario B: Search**

```
User ketik "MCP" di search bar
  ↓
JavaScript filter semua phase & tasks
  ↓
Hanya tampilkan phase yang punya kata "MCP"
  ↓
Auto-scroll ke hasil pertama
  ↓
Highlight card yang match
```

#### **Skenario C: Klik "Lanjut ke Step Berikutnya"**

```
User klik button di Phase 0
  ↓
Phase 0 collapse (opacity 0.4, blur)
  ↓
Phase 1 expand (opacity 1, highlight border)
  ↓
Auto-scroll smooth ke Phase 1
  ↓
Update sidebar: Phase 1 jadi active (warna biru)
```

#### **Skenario D: Klik Task untuk Detail**

```
User klik task label atau info button (ℹ️)
  ↓
Side panel slide dari kanan
  ↓
Tampilkan:
  - Task title
  - Description lengkap
  - Resources & links
  - Checkbox untuk mark complete
  ↓
User bisa centang langsung dari panel
```

---

## 📚 **Referensi Arsitektur (Proven Patterns)**

### **1. Roadmap.sh** ⭐⭐⭐ (PALING MIRIP)

🔗 <https://roadmap.sh/frontend>

**Arsitektur yang Dipakai:**

- **Client-Server dengan Rich Frontend**: Frontend handle semua rendering & interaksi
- **Data-Driven Visualization**: Roadmap di-generate dari structured data (JSON/Graph DB)
- **Modular Design**: Setiap roadmap adalah module independen
- **API-Centric**: Frontend fetch data via API
- **Integration dengan External Resources**: Link ke tutorials, courses, dll

**Pattern yang Bisa Dipelajari:**

- ✅ Click task → muncul side panel dengan detail
- ✅ Progress tracking dengan checkbox
- ✅ Focus mode (1 section active, others dimmed)
- ✅ Minimap sidebar untuk navigasi
- ✅ Interactive flowchart-style visualization

**Key Takeaways:**

- Progressive disclosure: Info ditampilkan bertahap
- Persistent state: Progress disimpan di browser
- Guided navigation: User dipandu step-by-step

---

### **2. Linear.app** ⭐⭐

🔗 <https://linear.app>

**Design System yang Dipakai:**

- **Glassmorphism**: Custom "frosted glass material" dengan precise blur & masking
- **Dark Mode First**: Dark theme sebagai default
- **Custom Theming**: User bisa set background, text, accent colors
- **Liquid Glass Effect**: Bespoke implementation (bukan standard CSS backdrop-filter)
- **Focus on Clarity**: Glassmorphism tanpa refraction untuk maintain readability

**Pattern yang Bisa Dipelajari:**

- ✅ Glassmorphism design (blur, transparency)
- ✅ Smooth transitions & animations
- ✅ Command palette (search dengan keyboard)
- ✅ Dark mode premium aesthetic
- ✅ Custom color system yang generate harmonious shades

**Key Takeaways:**

- Command-K Pattern: Search cepat dengan keyboard shortcut
- Optimistic UI: Update UI dulu, save data belakangan
- Micro-interactions: Hover effects, smooth scrolling
- Depth through lighting: Bukan hanya blur, tapi juga lighting effects

**CSS Implementation Notes:**

```css
/* Linear-style Glassmorphism */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

### **3. Progressive Disclosure Pattern** ⭐⭐⭐

🔗 <https://www.nngroup.com/articles/progressive-disclosure/>

**Prinsip Utama:**

1. **Reduced Cognitive Load**: Tampilkan high-level overview dulu, detail kemudian
2. **Enhanced Focus**: Sembunyikan fitur advanced sampai diminta
3. **Improved Usability**: Gradual reveal = easier learning curve
4. **Strategic Information Architecture**: Complexity introduced in measured doses

**UI Patterns untuk Implementasi:**

| Pattern | Use Case | Contoh di Aplikasi |
|---------|----------|-------------------|
| **Drill-through Pages** | Navigate dari overview ke detail | Klik phase → expand detail |
| **Tooltips** | Supplementary info on hover | Hover task → preview tooltip |
| **Expandable Sections (Accordions)** | Hide detail under heading | Phase cards collapse/expand |
| **Conditional Visibility** | Show elements based on state | Search results filter cards |
| **Wizards/Steppers** | Multi-step processes | Phase 0 → 1 → 2 progression |
| **"Show More" Links** | Reveal additional content | "Lanjut ke Step Berikutnya" |
| **Blurring** | Draw attention to important details | Inactive phases dimmed |

**Best Practices:**

- ✅ Prioritize key metrics: Display critical info prominently
- ✅ Maintain simplicity: Max 3 disclosure layers
- ✅ User-centric: Provide data that helps decisions
- ✅ Consistency: Apply patterns consistently

---

### **4. Notion** ⭐⭐

🔗 <https://notion.so>

**Pattern yang Bisa Dipelajari:**

- ✅ Checkbox dengan persistent state
- ✅ Collapsible sections (expand/collapse)
- ✅ Sidebar navigation
- ✅ Export/Import data

**Arsitektur Pattern:**

- **Block-Based UI**: Setiap element adalah "block" independen
- **Local-First**: Data disimpan lokal dulu, sync belakangan
- **Keyboard Navigation**: Bisa navigate tanpa mouse

---

### **5. Trello** ⭐

🔗 <https://trello.com>

**Pattern yang Bisa Dipelajari:**

- ✅ Card-based layout (Bento grid)
- ✅ Drag & drop (future feature untuk reorder phases)
- ✅ Progress visualization

**Arsitektur Pattern:**

- **Kanban Board**: Visual workflow management
- **Card Metaphor**: Setiap task adalah "card" yang bisa dipindah

---

## 🎨 **Design Patterns yang Digunakan**

| **Pattern** | **Penjelasan** | **Contoh di Aplikasi** |
|-------------|----------------|------------------------|
| **Focus Mode** | Hanya 1 item aktif, sisanya blur | Phase aktif opacity 1, lainnya 0.4 |
| **Progressive Disclosure** | Info ditampilkan bertahap | Hover 2 detik → muncul preview tooltip |
| **Persistent State** | Data tersimpan meski browser ditutup | localStorage auto-save setiap checkbox |
| **Guided Navigation** | User dipandu step-by-step | Button "Lanjut ke Step Berikutnya" |
| **Search & Filter** | Cari keyword untuk jump ke topik | Search "MCP" → filter & highlight |
| **Minimap Navigation** | Visual overview untuk quick jump | Sidebar Phase 0-7 |
| **Export/Import** | Backup data manual | Download JSON file |
| **Side Panel Detail** | Click item → show detail panel | Roadmap.sh style task detail |

---

## 🔍 **Cara Mencari Referensi Lebih Lanjut**

### **Di Google:**

```
"progressive disclosure UI pattern"
"focus mode dashboard design"
"roadmap visualization interactive"
"glassmorphism dark mode CSS"
"workflow tracker dashboard design"
```

### **Di Dribbble/Behance:**

```
"workflow tracker dashboard"
"learning path visualization"
"progress tracker UI"
"dark mode glassmorphism"
```

### **Di GitHub:**

```
"roadmap visualization"
"interactive checklist"
"focus tracker"
"workflow dashboard"
```

### **Di YouTube:**

```
"build roadmap.sh clone"
"glassmorphism CSS tutorial"
"progressive disclosure UX"
```

---

## 📖 **Recommended Reading**

1. **Progressive Disclosure**
   - <https://www.nngroup.com/articles/progressive-disclosure/>
   - <https://www.interaction-design.org/literature/article/progressive-disclosure>

2. **Focus Mode Design**
   - <https://www.smashingmagazine.com/2021/02/designing-better-focus-modes/>
   - <https://uxplanet.org/focus-mode-in-ui-design-8c7d3e8e7e8e>

3. **Glassmorphism**
   - <https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9>
   - <https://css-tricks.com/glassmorphism/>

4. **Dashboard Design Patterns**
   - <https://www.patterns.dev/>
   - <https://ui-patterns.com/patterns/Dashboard>

---

## ✅ **Implementation Checklist**

Berdasarkan referensi di atas, aplikasi workflow-visualization sudah mengimplementasikan:

- [x] Progressive Disclosure (expand/collapse phases)
- [x] Focus Mode (1 active phase, others dimmed)
- [x] Persistent State (localStorage)
- [x] Search & Filter
- [x] Minimap Navigation (sidebar)
- [x] Export/Import Progress
- [x] Glassmorphism Design (dark mode)
- [x] Side Panel Detail (roadmap.sh style)
- [x] Smooth Transitions
- [x] Progress Visualization (progress bar)

**Future Enhancements (dari referensi):**

- [ ] Command-K Pattern (keyboard shortcut untuk search)
- [ ] Drag & Drop (reorder phases)
- [ ] Keyboard Navigation (arrow keys untuk navigate)
- [ ] Custom Theming (user-defined colors)
- [ ] PWA Offline Support
- [ ] Analytics Integration

---

## 📝 **Notes**

- Aplikasi ini menggunakan **kombinasi best practices** dari Roadmap.sh (structure), Linear.app (design), dan Progressive Disclosure pattern (UX)
- Arsitektur **client-side only** cocok untuk deployment di static hosting (GitHub Pages, Vercel, Netlify)
- **localStorage** sebagai persistence layer cukup untuk use case personal/small team
- Untuk scale ke enterprise, consider: IndexedDB, Backend API, Cross-device sync

---

**Last Updated**: 2026-01-04  
**Maintained by**: Development Team
