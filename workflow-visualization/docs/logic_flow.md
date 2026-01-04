# System Flow & Logic Design (v2.0)

## Focus-Tracker Workflow Visualization

**Status**: Production  
**Reference**: [architecture.md](./architecture.md), [prd.md](./prd.md)

---

## Application Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Initializing: Page Load
    Initializing --> Ready: Data Loaded
    Ready --> Interacting: User Action
    Interacting --> Ready: Action Complete
    Ready --> [*]: Page Close
```

---

## Core User Flows

### 1. First-Time User Flow

```mermaid
flowchart TD
    A([Open App]) --> B{localStorage exists?}
    B -->|No| C[Initialize default state]
    B -->|Yes| D[Load saved progress]
    C --> E[Render Phase 0 as active]
    D --> F[Render last active phase]
    E --> G[Show onboarding hint]
    F --> H[Resume from saved state]
    G --> I([Ready to interact])
    H --> I
```

### 2. Task Learning Flow

```mermaid
flowchart TD
    A([View Dashboard]) --> B[Click task item]
    B --> C[Open side panel]
    C --> D{User choice}
    
    D -->|Read Guide| E[View Panduan tab]
    D -->|Ask AI| F[Switch to AI Tutor tab]
    
    E --> G[Read task description]
    G --> H[Mark status: Done/Skip]
    
    F --> I[Type question]
    I --> J[AI responds with context]
    J --> K{Understood?}
    K -->|Yes| H
    K -->|No| I
    
    H --> L[Progress saved]
    L --> M[Update progress bar]
```

### 3. Search & Navigation Flow

```mermaid
flowchart LR
    A[Type in search] --> B[Debounce 300ms]
    B --> C[Filter phases]
    C --> D{Results found?}
    D -->|Yes| E[Show matching phases]
    D -->|No| F[Show empty state]
    E --> G[Auto-enable Overview mode]
    F --> H[Clear search option]
```

---

## Feature Logic Details

### Focus Mode Toggle

```mermaid
flowchart TD
    A{isOverviewMode?} -->|true| B[All phases expanded]
    A -->|false| C[Only activePhaseId expanded]
    
    B --> D[Apply .phase-card class]
    C --> E[Apply .phase-card.dimmed to others]
    C --> F[Apply .phase-card.active to current]
```

**State Transitions:**

| Trigger | From | To |
|---------|------|-----|
| Click "Overview" | Focus | Overview |
| Click dimmed card | Focus | Focus (new active) |
| Search input | Any | Overview |
| Clear search | Overview | Focus |

### Task Status Management

```mermaid
flowchart TD
    A[Task Status Change] --> B{New Status?}
    B -->|pending| C[Reset progress]
    B -->|in-progress| D[Mark working]
    B -->|done| E[Mark complete + update progress]
    B -->|skip| F[Mark skipped]
    
    C --> G[Update localStorage]
    D --> G
    E --> G
    F --> G
    
    G --> H[Re-render cards]
    H --> I[Update progress bar]
```

**Status Icons:**

| Status | Icon | Visual |
|--------|------|--------|
| pending | ○ | Default gray |
| in-progress | ◐ | Yellow/amber |
| done | ● | Green + strikethrough |
| skip | ⊘ | Red + dimmed |

### AI Tutor Context Flow

```mermaid
flowchart TD
    A[Open task details] --> B[setAITutorContext]
    B --> C[Store task info]
    C --> D[Store phase info]
    
    E[User sends message] --> F{Context available?}
    F -->|Yes| G[Include task context in prompt]
    F -->|No| H[Use generic prompts]
    
    G --> I[Send to Groq API]
    H --> I
    
    I --> J[Receive response]
    J --> K[Render chat bubble]
    K --> L[Update quick prompts]
```

**Context Object:**

```javascript
{
    taskId: "p0-t1",
    taskLabel: "Pilih & Install IDE AI",
    taskDescription: "**Apa itu?** IDE AI adalah...",
    phaseTitle: "1. Persiapan Alat Tempur"
}
```

---

## State Transitions

### Application State Machine

```mermaid
stateDiagram-v2
    [*] --> Idle: App Loaded
    
    Idle --> Browsing: User scrolls/clicks
    Idle --> Searching: User types
    Idle --> TaskView: Click task
    
    Browsing --> Idle: No action 5s
    Searching --> Filtered: Results found
    Searching --> Empty: No results
    
    Filtered --> Idle: Clear search
    Empty --> Idle: Clear search
    
    TaskView --> Panduan: Default tab
    TaskView --> AIChat: Switch tab
    
    Panduan --> TaskView: Change status
    AIChat --> Waiting: Send message
    Waiting --> AIChat: Response received
    
    TaskView --> Idle: Close panel
```

---

## Error Handling

```mermaid
flowchart TD
    subgraph "localStorage Errors"
        A1[Write fails] --> B1[Show toast warning]
        B1 --> C1[Suggest Export backup]
    end
    
    subgraph "Import Errors"
        A2[Invalid JSON] --> B2[Show parse error]
        A2 --> C2[Keep current state]
    end
    
    subgraph "AI API Errors"
        A3[API timeout] --> B3[Hide typing indicator]
        B3 --> C3[Show error bubble]
        C3 --> D3[User can retry]
    end
```

| Error Type | User Message | Recovery |
|------------|--------------|----------|
| localStorage full | "Storage penuh. Export data." | Use Export feature |
| Invalid import | "File tidak valid." | Retry with correct file |
| API timeout | "❌ Error: timeout" | Retry message |
| Network error | "❌ Error: network" | Check connection |

---

## Performance Considerations

### Rendering Optimization

```mermaid
flowchart LR
    A[State Change] --> B{What changed?}
    B -->|Progress| C[Partial update]
    B -->|Phase| D[Re-render cards]
    B -->|Search| E[Filter + re-render]
    
    C --> F[Update specific checkbox]
    D --> G[Full card rebuild]
    E --> G
```

### Debounce Strategy

| Event | Debounce | Reason |
|-------|----------|--------|
| Search input | 300ms | Reduce filter calls |
| localStorage write | 0ms | Immediate persist |
| Scroll | N/A | Native browser |

---

## Module Communication

```mermaid
graph TD
    subgraph "Event Flow"
        DOM[DOM Events] --> VL[viewLogic]
        VL --> AS[appState]
        AS --> UR[uiRenderer]
        UR --> DOM
    end
    
    subgraph "Data Flow"
        VL --> DM[dataManager]
        DM --> LS[(localStorage)]
        DM --> AS
    end
    
    subgraph "AI Flow"
        VL --> AT[aiTutor]
        AT --> API[(Groq API)]
    end
```
