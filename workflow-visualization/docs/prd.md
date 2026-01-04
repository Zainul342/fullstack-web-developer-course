# Product Requirements Document

## 1. Overview

Aplikasi web interaktif untuk memvisualisasikan workflow **"Best Practice Coding with AI 2026"**. Tool ini mengatasi masalah "buta arah" dan "information overload" dari dokumen Markdown 1300 baris dengan pendekatan **Focus-Tracker**: guided navigation dengan progress tracking.

Sumber Kebenaran: `.agent/workflows/best-practice-coding-with-ai.md`

## 2. User Personas

- **Beginner**: Baru belajar coding, butuh panduan step-by-step dan bahasa yang disederhanakan agar tidak overwhelmed.
- **Intermediate**: Developer yang sudah punya dasar, butuh navigasi cepat ke topik spesifik (MCP, Agentic).
- **Personal**: Creator sendiri, butuh alat bantu untuk melacak progress belajar agar tidak lupa posisi terakhir.

## 3. User Stories

- **As a Beginner**, I want to see only the current step relevant to me, so that I don't feel overwhelmed by 1300 lines of text.
- **As a Developer**, I want to check off tasks I've completed, so that I can track my progress across different days.
- **As a Personal User**, I want to search for specific tools (like "MCP"), so that I don't waste time scrolling.
- **As a Visual Learner**, I want to see the workflow in a "VoiceLabs" style dashboard, so that the learning experience feels premium and engaging.

## 4. Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Custom Properties).
- **Backend**: None (Client-side logic only).
- **Database**: localStorage (Browser) + JSON Export/Import for persistence.
- **Assets**: Google Fonts (Inter), VoiceLabs-inspired Design Tokens.

## 5. Fitur Utama

1. **Hybrid Focus Mode**: Tampilan default fokus ke fase aktif, dengan opsi toggle "Overview" untuk melihat keseluruhan.
2. **Search & Filter**: Pencarian keyword instan untuk menemukan topik atau tool tertentu.
3. **Persistent Checklist**: Centang tugas selesai, simpan otomatis di browser (localStorage).
4. **Backup Data**: Fitur Export/Import progress dalam format JSON untuk keamanan data.
5. **Sidebar Minimap**: Navigasi visual cepat untuk melompat antar fase (Phase 0-7).
6. **Responsive Bento UI**: Tampilan grid modern (Dark Glassmorphism) yang adaptif di desktop dan mobile.

## 6. Timeline

- **Phase 3 (Rancangan)**: 30 menit (Data Schema & UI Arch).
- **Phase 4 (Development)**: 2-3 jam (Coding HTML/CSS/JS).
- **Phase 5 (Testing)**: 30 menit (Cross-browser, Mobile check).
- **Phase 6 (Deploy)**: 15 menit (Deploy to Static Host).
