# System Architecture (v2.0)

## Focus-Tracker Workflow Visualization

**Status**: Production  
**Type**: Client-Side SPA + AI Integration

---

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Browser"
        UI["UI Layer<br/>index.html + style.css"]
        Logic["Business Logic<br/>script.js"]
        AIService["AI Service<br/>ai-tutor.js"]
        Config["Configuration<br/>config.js"]
        Data["Embedded Data<br/>WORKFLOW_DATA"]
        Storage["Persistence<br/>localStorage"]
    end
    
    subgraph "External Services"
        Groq["Groq API<br/>Llama 3.3 70B"]
    end
    
    User([User]) --> UI
    UI --> Logic
    Logic --> Data
    Logic --> Storage
    Logic --> AIService
    AIService --> Config
    AIService --> Groq
```

---

## Component Architecture

```mermaid
graph LR
    subgraph "script.js"
        AppState["appState<br/>(Global State)"]
        DataManager["dataManager<br/>(Persistence)"]
        UIRenderer["uiRenderer<br/>(View)"]
        ViewLogic["viewLogic<br/>(Controller)"]
    end
    
    subgraph "ai-tutor.js"
        AiTutor["aiTutor<br/>(AI Service)"]
    end
    
    ViewLogic --> AppState
    ViewLogic --> DataManager
    ViewLogic --> UIRenderer
    ViewLogic --> AiTutor
    DataManager --> AppState
    UIRenderer --> AppState
```

---

## File Structure

```
workflow-visualization/
├── index.html          # Entry point & DOM structure
├── style.css           # Design tokens & components (1200+ lines)
├── script.js           # Core logic (750+ lines)
│   ├── WORKFLOW_DATA   # Embedded JSON (47 tasks)
│   ├── appState        # Runtime state
│   ├── dataManager     # localStorage CRUD
│   ├── uiRenderer      # DOM rendering
│   └── viewLogic       # Event handlers & business logic
├── config.js           # API keys & settings
├── ai-tutor.js         # Groq API integration
├── /data
│   └── workflow.json   # (Legacy, now embedded)
└── /docs
    ├── prd.md
    ├── architecture.md
    ├── frontend.md
    ├── logic_flow.md
    └── data_schema.md
```

---

## Data Flow

### 1. Application Initialization

```mermaid
sequenceDiagram
    participant Browser
    participant script.js
    participant localStorage
    participant UI
    
    Browser->>script.js: DOMContentLoaded
    script.js->>script.js: Load WORKFLOW_DATA
    script.js->>localStorage: Load saved progress
    script.js->>UI: Render minimap
    script.js->>UI: Render phase cards
    script.js->>UI: Update progress bar
```

### 2. Task Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant viewLogic
    participant uiRenderer
    participant aiTutor
    
    User->>UI: Click task item
    UI->>viewLogic: openTaskDetails()
    viewLogic->>aiTutor: setTaskContext()
    viewLogic->>uiRenderer: renderDetailPanel()
    uiRenderer->>UI: Show side panel
    
    User->>UI: Click AI Tutor tab
    UI->>viewLogic: switchTab('ai-tutor')
    viewLogic->>UI: Show chat interface
```

### 3. AI Chat Flow

```mermaid
sequenceDiagram
    participant User
    participant viewLogic
    participant aiTutor
    participant GroqAPI
    
    User->>viewLogic: Send message
    viewLogic->>viewLogic: addChatBubble(user)
    viewLogic->>viewLogic: showTypingIndicator()
    viewLogic->>aiTutor: sendMessage()
    aiTutor->>GroqAPI: POST /chat/completions
    GroqAPI-->>aiTutor: AI response
    aiTutor-->>viewLogic: {success, message}
    viewLogic->>viewLogic: hideTypingIndicator()
    viewLogic->>viewLogic: addChatBubble(ai)
```

---

## State Management

### Runtime State Object

```javascript
const appState = {
    activePhaseId: 0,       // Current expanded phase
    isOverviewMode: false,  // Focus vs Overview toggle
    searchQuery: "",        // Active search filter
    progress: {},           // { "p0-t1": true, ... }
    taskStatus: {},         // { "p0-t1": "done", ... }
    data: null              // Loaded WORKFLOW_DATA
};
```

### AI Tutor State

```javascript
const aiTutor = {
    systemPrompt: "...",      // Tutor personality
    chatHistory: [],          // Conversation context
    currentTaskContext: null  // Active task info
};
```

### Persistence Strategy

| Data | Storage | Trigger |
|------|---------|---------|
| Task progress | localStorage | On checkbox change |
| Active phase | localStorage | On phase navigation |
| Chat history | Memory only | Per session |
| API key | config.js | Static |

---

## Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| **appState** | Single source of truth for UI state |
| **dataManager** | localStorage read/write, export/import |
| **uiRenderer** | DOM manipulation, template rendering |
| **viewLogic** | Event handling, business logic, AI integration |
| **aiTutor** | Groq API communication, context management |

---

## Security Considerations

| Concern | Mitigation |
|---------|------------|
| XSS | Use `.textContent` for user input, sanitize markdown |
| API Key Exposure | `config.js` excluded from git, client-side only |
| CORS | Groq API allows browser requests |
| Data Loss | Export/import JSON backup feature |

---

## Performance Optimizations

| Technique | Implementation |
|-----------|----------------|
| Embedded data | No fetch() latency, file:// compatible |
| CSS containment | Scoped repaints on filter |
| Debounced search | 300ms input delay |
| Lazy rendering | Only active phase expanded |
| Smooth animations | CSS transforms, will-change |

---

## Future Architecture (v3.0)

```mermaid
graph TB
    subgraph "Enhanced Architecture"
        PWA["PWA Shell"]
        SW["Service Worker"]
        IDB["IndexedDB"]
        Analytics["Plausible Analytics"]
        i18n["Internationalization"]
    end
    
    PWA --> SW
    SW --> IDB
    PWA --> Analytics
    PWA --> i18n
```

| Feature | Priority | Status |
|---------|----------|--------|
| PWA offline support | High | Planned |
| IndexedDB fallback | Medium | Planned |
| Multi-language | Low | Backlog |
| Usage analytics | Low | Backlog |
