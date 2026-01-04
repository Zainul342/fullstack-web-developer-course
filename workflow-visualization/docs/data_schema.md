# Data Schema Reference

## For Workflow Content

**Status**: Draft
**Format**: JSON

---

## 1. Schema Definition

The application relies on a rigid schema to generate the UI.

### Root Object

| Key | Type | Description |
|-----|------|-------------|
| `meta` | Object | Metadata (version, last_updated) |
| `phases` | Array | Ordered list of workflow phases |

### Phase Object

| Key | Type | Description |
|-----|------|-------------|
| `id` | Integer | 0-indexed sequence number |
| `slug` | String | Unique identifier (e.g., "setup-env") |
| `title` | String | Human readable title (Indonesian) |
| `description` | String | Short summary of the phase |
| `tasks` | Array | List of Task Objects |

### Task Object

| Key | Type | Description |
|-----|------|-------------|
| `id` | String | Unique ID (e.g., "p0-t1") |
| `label` | String | Task instruction text |
| `details` | String | (Optional) More info/tooltip |
| `ref_line` | Integer | (Optional) Line number in original markdown |
| `mcp_tool` | String | (Optional) Recommended MCP tool for this task |

---

## 2. Example Data

```json
{
  "meta": {
    "version": "1.0",
    "source": "best-practice-coding-with-ai.md"
  },
  "phases": [
    {
      "id": 1,
      "slug": "discovery",
      "title": "Pahami Masalah",
      "description": "Validasi ide sebelum menulis kode.",
      "tasks": [
        {
          "id": "p1-t1",
          "label": "Identifikasi Needs/Pains/Gains",
          "details": "Gunakan teknik brainstorming dengan AI."
        },
        {
          "id": "p1-t2",
          "label": "Cari Referensi Desain",
          "mcp_tool": "firecrawl"
        }
      ]
    }
  ]
}
```
