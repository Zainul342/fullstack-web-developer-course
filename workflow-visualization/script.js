/**
 * Focus-Tracker: AI Workflow Visualization
 * Logic: Vanilla JS SPA (State -> UI)
 */

// EMBEDDED WORKFLOW DATA (Enriched)
const WORKFLOW_DATA = {
    "meta": { "version": "3.0", "total_tasks": 47 },
    "phases": [
        {
            "id": 0, "slug": "setup-env", "title": "1. Persiapan Alat Tempur",
            "description": "Siapkan environment sebelum coding agar tidak ada friction teknis.",
            "tasks": [
                {
                    "id": "p0-t1",
                    "label": "Pilih & Install IDE AI",
                    "description": "**Apa itu?**\nCode editor modern yang punya 'otak' AI. Bukan cuma autocomplete, tapi bisa diajak ngoding bareng.\n\n**Rekomendasi 2026:**\n1. **Cursor** (Industry Standard)\nPaling populer. Fitur andalan: *Composer* (bisa edit banyak file sekaligus).\n2. **Windsurf** (Alternatif Kuat)\nPunya fitur *Cascade* yang deeply aware sama context project.\n3. **Antigravity** (Google Ecosystem)\nPower by Gemini 2.0. Cocok kalau suka ekosistem Google.\n\n**Cara Mulai:**\nDownload di website resmi mereka -> Install biasa.\n\n**Pro Tips:**\nPakai Free Tier dulu 1-2 minggu. Jangan buru-buru bayar subscription ($20/bln) sebelum ngerasa cocok sama workflow-nya."
                },
                {
                    "id": "p0-t2",
                    "label": "Pilih Mode Kerja IDE",
                    "description": "**Dua mode utama:**\n\n1. **Chat Mode** — Tanya jawab biasa. AI menjawab tapi tidak mengubah file langsung.\n2. **Agent/Composer Mode** — AI bisa membaca, membuat, dan mengedit banyak file sekaligus.\n\n**Kapan pakai apa?**\n• Chat Mode: Tanya konsep, minta penjelasan, debugging kecil.\n• Agent Mode: Buat fitur baru, refactoring besar, setup project.\n\n**Peringatan:** Agent Mode lebih 'powerful' tapi juga lebih berisiko. Selalu review perubahan sebelum accept."
                },
                {
                    "id": "p0-t3",
                    "label": "Tentukan Model AI Utama",
                    "description": "**Model AI terbaik untuk coding (2026):**\n\n• **Claude 3.5/4 Sonnet** — Raja coding. Paling akurat untuk menulis dan debug kode.\n• **GPT-4o** — Bagus untuk reasoning dan penjelasan konsep.\n• **Gemini 2.0 Flash** — Cepat dan murah, cocok untuk task sederhana.\n\n**Strategi hemat token:**\n1. Pakai model 'mini/flash' untuk task ringan (typo, format).\n2. Pakai model 'pro/sonnet' untuk logic kompleks.\n\n**Di mana setting?** Biasanya di pojok kanan bawah IDE, atau di menu Settings > Model."
                },
                {
                    "id": "p0-t4",
                    "label": "Pahami Kriteria Pemilihan Model",
                    "description": "**3 kriteria utama:**\n\n1. **Akurasi**: Seberapa sering hasilnya benar? (Claude Sonnet menang di sini)\n2. **Kecepatan**: Berapa detik untuk respons? (Flash/Mini lebih cepat)\n3. **Biaya**: Berapa token per request? (Cek pricing di docs masing-masing)\n\n**Tabel keputusan cepat:**\n• Quick fix/typo → Copilot / Model Mini\n• Fitur baru → Claude Sonnet\n• Refactor besar → Claude Code / Agentic Mode"
                },
                {
                    "id": "p0-t5",
                    "label": "Setup MCP: Research Tools",
                    "description": "**Apa itu MCP?** Model Context Protocol — cara AI berkomunikasi dengan tools eksternal.\n\n**Research Tools yang wajib:**\n• **Context7** — Fetch dokumentasi library terbaru langsung ke AI.\n• **Exa** — Search engine khusus untuk developer.\n\n**Cara setup (Cursor/Antigravity):**\n1. Buka Settings > MCP Servers\n2. Tambahkan server dengan format JSON\n3. Restart IDE\n\n**Kenapa penting?** Tanpa ini, AI pakai data training lama dan bisa salah karena library sudah update."
                },
                {
                    "id": "p0-t6",
                    "label": "Setup MCP: Browser Testing",
                    "description": "**Tools untuk testing otomatis via browser:**\n• **Playwright MCP** — AI bisa membuka browser, klik, dan screenshot.\n• **Puppeteer** — Alternatif populer.\n\n**Use case:**\n• AI mengecek apakah button berfungsi\n• Screenshot hasil untuk validasi visual\n• Form submission testing\n\n**Setup:** Install via npm, lalu tambahkan ke MCP config."
                },
                {
                    "id": "p0-t7",
                    "label": "Setup MCP: Database (Optional)",
                    "description": "**Jika project pakai database:**\n• **Supabase MCP** — Untuk PostgreSQL di Supabase\n• **Firebase MCP** — Untuk Firestore\n\n**Fungsi:** AI bisa langsung query database, lihat schema, dan suggest migrations.\n\n**Kapan perlu?** Hanya jika sering kerja dengan database. Skip dulu kalau project frontend-only."
                },
                {
                    "id": "p0-t8",
                    "label": "Buat File Rules Project",
                    "description": "**Apa itu Rules?** File instruksi khusus yang dibaca AI setiap kali memulai task.\n\n**Lokasi file:**\n• Cursor: `.cursorrules`\n• Windsurf: `.windsurfrules`\n• Claude Code: `CLAUDE.md`\n\n**Isi minimal:**\n```\n- Tech stack: [Next.js, Tailwind, etc]\n- Coding style: [Use TypeScript strict]\n- Security: [Never hardcode API keys]\n```\n\n**Tips:** Mulai sederhana, tambahkan rule baru setiap kali AI melakukan kesalahan yang sama."
                },
                {
                    "id": "p0-t9",
                    "label": "Pahami Prinsip Inti AI Coding",
                    "description": "**Kontrak Kolaborasi AI-Human:**\n\n| Kamu (Human) | AI (Assistant) |\n|---|---|\n| Penentu goal & constraint | Executor & suggester |\n| Final decision maker | Tidak punya tanggung jawab |\n| Wajib verifikasi hasil | Bisa salah/halusinasi |\n\n**Aturan emas:**\n1. Jangan commit kode yang tidak kamu mengerti.\n2. AI bisa 'hallucinate' — selalu verify.\n3. Kamu yang bertanggung jawab di production."
                },
                {
                    "id": "p0-t10",
                    "label": "Pahami Klaim Tidak Realistis",
                    "description": "**Ekspektasi vs Realita:**\n\n❌ 'AI bisa bikin app dalam 5 menit'\n✅ AI mempercepat, tapi tetap butuh review manusia.\n\n❌ 'Tinggal copas hasil AI'\n✅ Hasil AI sering perlu adjustment dan debugging.\n\n❌ 'AI menggantikan developer'\n✅ AI adalah multiplier: 0 x 100 = 0. Skill kamu menentukan hasil.\n\n**Mindset yang benar:** AI adalah junior developer yang sangat cepat tapi perlu supervisi ketat."
                }
            ]
        },
        {
            "id": 1, "slug": "discovery", "title": "2. Pahami Masalah (Discovery)",
            "description": "Jangan langsung coding! Validasi dulu ide dan solusinya.",
            "tasks": [
                {
                    "id": "p1-t1",
                    "label": "Brainstorming dengan AI",
                    "description": "**Cara pakai AI sebagai sparring partner:**\n\n**Prompt contoh:**\n```\nAku mau bikin [IDE PRODUK]. Tolong kritik ide ini dari sudut pandang:\n1. Teknis — apa yang sulit diimplementasi?\n2. Bisnis — siapa yang mau bayar?\n3. User — masalah apa yang di-solve?\n```\n\n**Tips:** Minta AI jadi 'Devil's Advocate' untuk menemukan kelemahan ide sebelum mulai coding."
                },
                {
                    "id": "p1-t2",
                    "label": "Riset Realita",
                    "description": "**Validasi apakah masalah ini nyata:**\n\n1. Cari di Google/Reddit apakah orang lain punya masalah yang sama\n2. Cek apakah sudah ada solusi existing\n3. Tanya langsung ke calon user (minimal 3-5 orang)\n\n**Pakai AI untuk riset:**\n```\nCarikan data/statistik tentang [MASALAH] di Indonesia 2024-2025.\n```"
                },
                {
                    "id": "p1-t3",
                    "label": "Validasi Data Pasar",
                    "description": "**Pertanyaan kunci:**\n• Berapa besar market size?\n• Siapa kompetitor utama?\n• Apa unique value proposition kamu?\n\n**Tools gratis untuk riset:**\n• Google Trends\n• SimilarWeb\n• Product Hunt (lihat produk sejenis)"
                },
                {
                    "id": "p1-t4",
                    "label": "Sintesis Jadi Dokumen",
                    "description": "**Output dari fase discovery:**\n\nBuat file `discovery.md` berisi:\n1. Problem statement (1 paragraf)\n2. Target user (persona singkat)\n3. Proposed solution (1 paragraf)\n4. Key risks (3-5 bullet points)\n\n**Prompt untuk AI:**\n```\nBantu aku merangkum hasil riset ini jadi dokumen discovery yang ringkas.\n```"
                },
                { "id": "p1-t5", "label": "Identifikasi Needs (Fitur Wajib)", "description": "**Framework Jobs to be Done (JTBD):**\n\nTanya: 'Ketika user [SITUASI], mereka ingin [OUTCOME] supaya [BENEFIT].'\n\n**Contoh:**\n'Ketika user baru mulai freelance, mereka ingin track invoice supaya tidak lupa tagih client.'\n\n**Output:** List 3-5 'jobs' utama yang harus di-solve." },
                { "id": "p1-t6", "label": "Identifikasi Pains (Masalah User)", "description": "**List pain points:**\n\n• Apa yang bikin user frustrasi dengan solusi existing?\n• Apa yang terlalu mahal/rumit?\n• Apa yang missing dari kompetitor?\n\n**Cara dapat insight:** Baca review 1-3 bintang di App Store/Play Store untuk produk sejenis." },
                { "id": "p1-t7", "label": "Riset Kompetitor", "description": "**Buat tabel kompetitor:**\n\n| Nama | Kelebihan | Kekurangan | Pricing |\n|---|---|---|---|\n| Competitor A | ... | ... | ... |\n\n**Riset 5-10 produk sejenis.** Screenshot fitur menarik untuk referensi." },
                { "id": "p1-t8", "label": "Validasi Tech Stack", "description": "**Pertanyaan:**\n• Apakah tech stack yang dipilih bisa handle kebutuhan?\n• Apakah ada library yang sudah solve problem ini?\n• Apakah tim familiar dengan stack ini?\n\n**Prompt untuk AI:**\n```\nAku mau bikin [DESKRIPSI APP]. Suggest tech stack yang cocok dengan tradeoff-nya.\n```" }
            ]
        },
        {
            "id": 2, "slug": "documentation", "title": "3. Tulis Dokumentasi (PRD)",
            "description": "Tulis rencana sebelum satu baris kode pun dibuat.",
            "tasks": [
                {
                    "id": "p2-t1",
                    "label": "Buat Dokumen PRD.md",
                    "description": "**PRD = Product Requirements Document**\n\nIni adalah 'kitab suci' project yang dibaca AI setiap kali mulai task.\n\n**Isi minimal PRD:**\n1. Overview (1 paragraf)\n2. Goals & Non-goals\n3. User stories (5-10 item)\n4. Technical requirements\n5. Success metrics\n\n**Lokasi:** Simpan di root project sebagai `PRD.md` atau `docs/prd.md`."
                },
                { "id": "p2-t2", "label": "Buat frontend.md", "description": "**Dokumen referensi desain:**\n\n• Link ke Figma/screenshot desain\n• Color palette dan typography\n• Component library yang dipakai (Shadcn, Tailwind, etc)\n• Responsive breakpoints\n\n**Tips:** Sertakan screenshot dari website inspirasi." },
                { "id": "p2-t3", "label": "Buat architecture.md", "description": "**Dokumen arsitektur teknis:**\n\n• Diagram sistem (pakai Mermaid atau Excalidraw)\n• Database schema\n• API endpoints\n• Third-party integrations\n\n**Prompt untuk generate diagram:**\n```\nBuatkan Mermaid diagram untuk arsitektur [DESKRIPSI SISTEM].\n```" },
                { "id": "p2-t4", "label": "Update Rules dengan Konteks PRD", "description": "**Tambahkan ke file rules:**\n\n```\n# Project Context\n- Baca PRD.md sebelum setiap task\n- Follow architecture di architecture.md\n- UI harus konsisten dengan frontend.md\n```\n\n**Kenapa penting?** Supaya AI selalu punya context yang sama di setiap sesi." }
            ]
        },
        {
            "id": 3, "slug": "design", "title": "4. Rancangan & Desain",
            "description": "Visualisasikan solusi sebelum implementasi.",
            "tasks": [
                { "id": "p3-t1", "label": "Gambar Alur Sistem", "description": "**Buat flowchart sistem:**\n\nGunakan Mermaid, Excalidraw, atau Whimsical.\n\n**Prompt:**\n```\nBuatkan flowchart Mermaid untuk proses [NAMA PROSES] dengan langkah-langkah berikut: ...\n```" },
                { "id": "p3-t2", "label": "Gambar User Flow", "description": "**Visualisasi perjalanan user:**\n\nDari landing page → interaksi → goal tercapai.\n\n**Tools gratis:** Figma, Excalidraw, Whimsical." },
                { "id": "p3-t3", "label": "Desain Data Schema", "description": "**Tentukan struktur database:**\n\n• Entities (User, Product, Order, etc)\n• Relationships (one-to-many, many-to-many)\n• Fields dan tipe data\n\n**Prompt:**\n```\nDesain database schema untuk [APP]. Output dalam format SQL atau Prisma schema.\n```" },
                { "id": "p3-t4", "label": "Pahami Context Engineering", "description": "**Context = informasi yang kamu berikan ke AI.**\n\n**Prinsip:**\n• Lebih spesifik = hasil lebih akurat\n• Terlalu banyak = AI 'bingung'\n• Update terus seiring project berkembang\n\n**Teknik Context Pruning:**\n1. Hanya include file yang relevan\n2. Buang node_modules, dist, etc dari context\n3. Summarize file besar" },
                { "id": "p3-t5", "label": "Siapkan Context File Reusable", "description": "**Buat file `active_context.md`:**\n\n```\n# Current Focus\nSedang mengerjakan: [FITUR]\n\n# Recent Changes\n- [Tanggal]: [Perubahan]\n\n# Known Issues\n- [Issue yang belum di-fix]\n```\n\n**Update file ini setiap selesai 1 sesi kerja.**" }
            ]
        },
        {
            "id": 4, "slug": "development", "title": "5. Eksekusi Coding",
            "description": "Saatnya menulis kode! Ikuti best practice.",
            "tasks": [
                {
                    "id": "p4-t1",
                    "label": "Pilih Strategi Development",
                    "description": "**Frontend-first (recommended untuk kebanyakan project):**\n• AI lebih mudah 'mengerti' visual\n• Lebih cepat dapat feedback\n• Backend di-mock dulu\n\n**Backend-first (untuk project data-heavy):**\n• Jika logic sangat kompleks\n• Jika data schema belum stabil"
                },
                { "id": "p4-t2", "label": "Setup Project Structure", "description": "**Struktur folder standar:**\n\n```\n/src\n  /components\n  /pages (atau /app)\n  /lib (utilities)\n  /hooks\n  /types\n/docs\n/tests\n```\n\n**Prompt:**\n```\nSetup project structure untuk [FRAMEWORK] dengan best practices 2026.\n```" },
                { "id": "p4-t3", "label": "Slicing Frontend/UI", "description": "**Langkah:**\n1. Buat layout dasar (header, sidebar, footer)\n2. Pecah ke komponen\n3. Style dengan CSS/Tailwind\n4. Tambahkan interaksi\n\n**Prompt:**\n```\nSlicing UI untuk [HALAMAN] berdasarkan desain di frontend.md.\n```" },
                { "id": "p4-t4", "label": "Implementasi Logic/API", "description": "**Setelah UI jadi, sambungkan ke logic:**\n\n1. Buat API routes\n2. Connect ke database\n3. Handle state management\n4. Error handling\n\n**Gunakan TDD:** Tulis test dulu, baru implementasi." },
                { "id": "p4-t5", "label": "Gunakan Prompting Best Practice", "description": "**Template prompt yang efektif:**\n\n```\nRole: [Senior Developer untuk X]\nContext: [File yang relevan]\nTask: [Spesifik apa yang perlu dilakukan]\nConstraints: [Batasan teknis/bisnis]\nOutput: [Format yang diharapkan]\n```\n\n**Tips:** Selalu verify hasil sebelum accept." },
                { "id": "p4-t6", "label": "Fetch Docs Terbaru via MCP", "description": "**Gunakan Context7 atau tools sejenis:**\n\n```\n@context7 fetch latest docs for [LIBRARY]\n```\n\n**Kenapa penting?** AI terlatih dengan data lama. Library bisa sudah berubah." }
            ]
        },
        {
            "id": 5, "slug": "verification", "title": "6. Verifikasi & Testing",
            "description": "Jangan percaya AI 100%. Cek dan validasi.",
            "tasks": [
                { "id": "p5-t1", "label": "Self-Verification Manual", "description": "**Checklist manual:**\n\n☐ Baca ulang kode, apakah logikanya masuk akal?\n☐ Test happy path (flow normal)\n☐ Test edge cases (input aneh, empty state)\n☐ Cek responsive di mobile" },
                { "id": "p5-t2", "label": "Run Linter & TypeScript", "description": "**Commands:**\n```\nnpm run lint\nnpm run type-check\n```\n\n**Fix semua error sebelum lanjut.** Jangan abaikan TypeScript errors." },
                { "id": "p5-t3", "label": "Auto Testing via Browser", "description": "**Jika sudah setup Playwright/Puppeteer MCP:**\n\n```\nTest flow [NAMA FLOW] dengan membuka browser dan klik setiap step.\n```\n\n**AI akan screenshot hasil untuk validasi visual.**" },
                { "id": "p5-t4", "label": "Security Check", "description": "**Checklist keamanan:**\n\n☐ Tidak ada API key di code (cek .env)\n☐ Input user di-sanitize\n☐ SQL query pakai prepared statements\n☐ npm audit clean\n\n**Command:**\n```\nnpm audit\n```" },
                { "id": "p5-t5", "label": "Code Review", "description": "**Self-review atau minta AI:**\n\n```\nReview kode ini untuk:\n1. Security vulnerabilities\n2. Performance issues\n3. Code smells\n4. Missing error handling\n```" },
                { "id": "p5-t6", "label": "Fix Loop: Iterate Until Pass", "description": "**Jika ada error:**\n\n1. Copy error message lengkap\n2. Sertakan relevant code\n3. Minta AI explain root cause dulu\n4. Baru minta fix\n\n**Jangan langsung accept fix tanpa mengerti kenapa error terjadi.**" }
            ]
        },
        {
            "id": 6, "slug": "deployment", "title": "7. Deploy ke Public",
            "description": "Launch aplikasi ke production.",
            "tasks": [
                { "id": "p6-t1", "label": "Pilih Platform Deploy", "description": "**Opsi populer:**\n\n• **Vercel** — Best untuk Next.js, gratis untuk hobby\n• **Netlify** — Alternatif Vercel\n• **Railway** — Untuk backend/database\n• **Cloudflare Pages** — Gratis, cepat\n\n**Tips:** Mulai dari tier gratis, upgrade kalau sudah butuh." },
                { "id": "p6-t2", "label": "Set Environment Variables", "description": "**Pindahkan secrets dari .env ke platform:**\n\n1. Buka dashboard platform\n2. Cari 'Environment Variables'\n3. Copy semua variable dari .env.local\n\n**JANGAN commit .env ke git!**" },
                { "id": "p6-t3", "label": "Cek HTTPS & Domain", "description": "**Pastikan:**\n\n☐ HTTPS sudah aktif (biasanya otomatis)\n☐ Domain custom sudah pointing\n☐ SSL certificate valid\n\n**Test di:** https://www.ssllabs.com/ssltest/" },
                { "id": "p6-t4", "label": "Setup CI/CD (Optional)", "description": "**Untuk project yang sudah mature:**\n\nSetup GitHub Actions atau platform CI untuk:\n• Auto deploy on push\n• Run tests before deploy\n• Notify on failure" }
            ]
        },
        {
            "id": 7, "slug": "iteration", "title": "8. Iterasi & Feedback",
            "description": "Software is never done. Improve based on data.",
            "tasks": [
                { "id": "p7-t1", "label": "Kumpulkan Feedback User", "description": "**Cara dapat feedback:**\n\n• Tanya langsung ke user\n• Analytics (Vercel Analytics, Posthog)\n• Session recording (Hotjar, Clarity)\n• Form feedback di dalam app" },
                { "id": "p7-t2", "label": "Ukur Metrik Kunci", "description": "**Metrik yang penting:**\n\n• Active users (DAU/WAU/MAU)\n• Retention rate\n• Time to value (berapa lama user dapat benefit)\n• Error rate" },
                { "id": "p7-t3", "label": "Analisa Feedback dengan AI", "description": "**Prompt:**\n```\nAnalisa feedback user berikut dan prioritaskan improvement berdasarkan impact:\n[PASTE FEEDBACK]\n```" },
                { "id": "p7-t4", "label": "Kembali ke Discovery", "description": "**Loop berlanjut:**\n\nSetelah analisa, kembali ke Phase 1 (Discovery) untuk fitur/improvement berikutnya.\n\n**Software development adalah siklus, bukan garis lurus.**" }
            ]
        },
        {
            "id": 8, "slug": "fallback", "title": "⚠️ Fallback Plan",
            "description": "Langkah darurat ketika AI tidak memberikan hasil yang diharapkan.",
            "tasks": [
                { "id": "fb-t1", "label": "Review Konteks", "description": "**AI bingung? Cek:**\n\n☐ Apakah context terlalu banyak/sedikit?\n☐ Apakah instruksi jelas?\n☐ Apakah ada konflik di rules?" },
                { "id": "fb-t2", "label": "Pecah Task Lebih Kecil", "description": "**Jika task terlalu besar:**\n\nPecah jadi 3-5 subtask yang lebih spesifik. AI lebih akurat untuk task kecil." },
                { "id": "fb-t3", "label": "Reset Conversation", "description": "**Context window bisa 'kotor':**\n\nMulai sesi baru, feed context fresh dari docs." },
                { "id": "fb-t4", "label": "Switch Model AI", "description": "**Coba model berbeda:**\n\n• GPT gagal? Coba Claude.\n• Claude gagal? Coba Gemini.\n\nSetiap model punya kelebihan berbeda." },
                { "id": "fb-t5", "label": "Kerjakan Manual", "description": "**Last resort:**\n\nTulis kode sendiri, gunakan AI hanya sebagai 'autocomplete' atau untuk jelaskan konsep.\n\n**Remember:** AI adalah tool, bukan pengganti skill." }
            ]
        }
    ]
};

// 1. STATE OBJECT
const appState = {
    activePhaseId: 0,
    isOverviewMode: false,
    searchQuery: "",
    progress: {},      // { "p0-t1": true }
    data: null         // Loaded from JSON
};

// 2. DATA MANAGER (Persistence)
const dataManager = {
    // Embedded workflow data (for file:// protocol compatibility)
    fetchData: async () => {
        // Data embedded directly since fetch() doesn't work on file:// protocol
        // ENRICH DATA with placeholders if missing
        appState.data = WORKFLOW_DATA;
        appState.data.phases.forEach(phase => {
            phase.tasks.forEach(task => {
                if (!task.description) {
                    task.description = `Panduan detail untuk langkah "${task.label}". Di sini akan dijelaskan konteks, tujuan, dan cara eksekusi yang benar sesuai best practice AI coding.`;
                }
                if (!task.resources) {
                    task.resources = [
                        { type: "article", label: "Dokumen Referensi: " + (task.ref_doc || "General"), url: "#" },
                        { type: "video", label: "Video Tutorial (Coming Soon)", url: "#" }
                    ];
                }
            });
        });
    },

    loadProgress: () => {
        const saved = localStorage.getItem('wf_progress');
        if (saved) appState.progress = JSON.parse(saved);

        const lastPhase = localStorage.getItem('wf_active_phase');
        if (lastPhase) appState.activePhaseId = parseInt(lastPhase, 10);
    },

    saveProgress: () => {
        localStorage.setItem('wf_progress', JSON.stringify(appState.progress));
        localStorage.setItem('wf_active_phase', appState.activePhaseId.toString());
        uiRenderer.updateStats();
    },

    // Export progress to JSON file
    exportProgress: () => {
        const exportData = {
            progress: appState.progress,
            activePhaseId: appState.activePhaseId,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow-progress.json';
        a.click();
        URL.revokeObjectURL(url);
        uiRenderer.showToast('Progress berhasil di-export! 📤');
    },

    // Import progress from JSON file
    importProgress: (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.progress) {
                    appState.progress = data.progress;
                    appState.activePhaseId = data.activePhaseId || 0;
                    dataManager.saveProgress();
                    uiRenderer.renderCards();
                    uiRenderer.showToast('Progress berhasil di-import! 📥');
                } else {
                    throw new Error('Invalid format');
                }
            } catch (err) {
                console.error(err);
                uiRenderer.showToast('File tidak valid. Pastikan format JSON benar.', true);
            }
        };
        reader.readAsText(file);
    }
};

// 3. UI RENDERER (View Layer)
const uiRenderer = {
    renderMinimap: () => {
        const list = document.getElementById('minimap-list');
        if (!list || !appState.data) return;

        list.innerHTML = appState.data.phases.map(p => `
            <li class="minimap-item ${p.id === appState.activePhaseId ? 'active' : ''}" 
                onclick="viewLogic.goToPhase(${p.id})">
                <span class="dot"></span>
                <span class="label">Phase ${p.id}</span>
            </li>
        `).join('');
    },

    renderCards: () => {
        const container = document.getElementById('content-area');
        if (!container || !appState.data) return;

        // Search Filter
        const query = appState.searchQuery.toLowerCase();
        const phasesFiltered = appState.data.phases.filter(p => {
            if (!query) return true;
            return p.title.toLowerCase().includes(query) ||
                p.tasks.some(t => t.label.toLowerCase().includes(query));
        });

        if (phasesFiltered.length === 0) {
            container.innerHTML = `<div class="empty-state"><p>Tidak ada hasil untuk "${appState.searchQuery}"</p></div>`;
            return;
        }

        container.innerHTML = phasesFiltered.map(phase => {
            const isActive = phase.id === appState.activePhaseId;
            const isDimmed = !isActive && !appState.isOverviewMode;

            // Classes
            let cardClass = 'phase-card';
            if (isActive) cardClass += ' active';
            if (isDimmed) cardClass += ' dimmed';

            // Click Handler for Dimmed Cards (to activate them)
            const cardClick = isDimmed ? `onclick="viewLogic.goToPhase(${phase.id})"` : '';

            // Body Visibility
            const showBody = isActive || appState.isOverviewMode;

            return `
            <article class="${cardClass}" id="phase-${phase.id}">
                <div class="card-header" ${cardClick}>
                    <div class="card-number">${String(phase.id).padStart(2, '0')}</div>
                    <div>
                        <h2 class="card-title">${phase.title}</h2>
                        <p class="card-description">${phase.description}</p>
                    </div>
                </div>
                
                <div class="card-body ${showBody ? '' : 'hidden'}">
                    <ul class="task-list">
                        ${phase.tasks.map(task => {
                const taskStatus = appState.taskStatus?.[task.id] || 'pending';
                const statusIcon = taskStatus === 'done' ? '●' : taskStatus === 'in-progress' ? '◐' : taskStatus === 'skip' ? '⊘' : '○';
                return `
                            <li class="task-item status-${taskStatus}" onclick="viewLogic.openTaskDetails('${task.id}', event)">
                                <span class="task-status-icon">${statusIcon}</span>
                                <span class="task-text">${task.label}</span>
                            </li>
                            `;
            }).join('')}
                    </ul>
                </div>

                ${isActive ? `
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="viewLogic.nextPhase()">
                        Lanjut Step ${phase.id + 1} →
                    </button>
                </div>
                ` : ''}
            </article>
            `;
        }).join('');

        // Re-render minimap to sync active state
        uiRenderer.renderMinimap();
        uiRenderer.updateStats();
    },

    updateStats: () => {
        if (!appState.data) return;
        const total = appState.data.phases.reduce((a, p) => a + p.tasks.length, 0);
        const done = Object.keys(appState.progress).filter(k => appState.progress[k]).length;
        const percent = Math.round((done / total) * 100) || 0;

        document.getElementById('progress-text').textContent = `${done} dari ${total} tugas selesai`;
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-fill').style.width = `${percent}%`;
    },

    showToast: (message, isError = false) => {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toast-message');
        if (!toast || !msg) return;

        msg.textContent = message;
        toast.className = `toast ${isError ? 'error' : 'success'}`;

        setTimeout(() => toast.classList.add('hidden'), 3000);
    },

    // Render Detail Panel with Rich Formatting
    renderDetailPanel: (task) => {
        document.getElementById('panel-title').textContent = task.label;

        // Convert markdown to rich HTML
        let html = task.description
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n\n/g, '</p><p>');

        // Parse numbered lists more carefully
        const lines = html.split('\n');
        let inOrderedList = false;
        let inUnorderedList = false;
        let processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Numbered list item
            if (/^\d+\.\s/.test(line)) {
                if (!inOrderedList) {
                    processedLines.push('</p><ol>');
                    inOrderedList = true;
                }
                processedLines.push('<li>' + line.replace(/^\d+\.\s/, '') + '</li>');
            }
            // Bullet list item
            else if (/^•\s/.test(line)) {
                if (inOrderedList) {
                    processedLines.push('</ol><p>');
                    inOrderedList = false;
                }
                if (!inUnorderedList) {
                    processedLines.push('</p><ul>');
                    inUnorderedList = true;
                }
                processedLines.push('<li>' + line.replace(/^•\s/, '') + '</li>');
            }
            // Checklist item
            else if (/^☐\s/.test(line)) {
                if (inOrderedList) {
                    processedLines.push('</ol><p>');
                    inOrderedList = false;
                }
                if (!inUnorderedList) {
                    processedLines.push('</p><ul>');
                    inUnorderedList = true;
                }
                processedLines.push('<li class="checklist">☐ ' + line.replace(/^☐\s/, '') + '</li>');
            }
            // Regular line
            else {
                if (inOrderedList) {
                    processedLines.push('</ol><p>');
                    inOrderedList = false;
                }
                if (inUnorderedList) {
                    processedLines.push('</ul><p>');
                    inUnorderedList = false;
                }

                // Special markers
                if (line.startsWith('❌ ')) {
                    processedLines.push('<p class="wrong">✗ ' + line.substring(2) + '</p>');
                } else if (line.startsWith('✅ ')) {
                    processedLines.push('<p class="correct">✓ ' + line.substring(2) + '</p>');
                } else {
                    processedLines.push(line);
                }
            }
        }

        // Close any open lists
        if (inOrderedList) processedLines.push('</ol><p>');
        if (inUnorderedList) processedLines.push('</ul><p>');

        html = processedLines.join('\n');

        // Wrap sections with h3 headers
        html = html.replace(/\*\*([^*]+):\*\*/g, '</p><h3>$1</h3><p>');

        document.getElementById('panel-description').innerHTML = `<p>${html}</p>`;

        // Hide resources section - content is self-contained
        const resourcesSection = document.getElementById('resources-section');
        if (resourcesSection) resourcesSection.style.display = 'none';

        // Status Select
        const select = document.getElementById('panel-status-select');
        const currentStatus = appState.taskStatus?.[task.id] || 'pending';
        select.value = currentStatus;
        select.setAttribute('data-task-id', task.id);

        // Show Panel
        document.getElementById('side-panel').classList.remove('hidden');
    }
};

// 4. LOGIC CONTROLLER
const viewLogic = {
    init: async () => {
        await dataManager.fetchData();
        dataManager.loadProgress();
        uiRenderer.renderCards();

        // Search Listener
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            appState.searchQuery = e.target.value;
            appState.isOverviewMode = !!e.target.value; // Auto overview on search
            uiRenderer.renderCards();
        });

        // Overview Toggle
        document.getElementById('toggle-overview')?.addEventListener('click', () => {
            // Clear search when manually toggling overview
            appState.searchQuery = '';
            document.getElementById('search-input').value = '';

            appState.isOverviewMode = !appState.isOverviewMode;
            document.getElementById('toggle-overview').textContent =
                appState.isOverviewMode ? '🎯 Focus Mode' : '👁️ Overview';
            uiRenderer.renderCards();
        });

        // Export Button
        document.getElementById('export-btn')?.addEventListener('click', () => {
            dataManager.exportProgress();
        });

        // Import Button (triggers file input)
        document.getElementById('import-btn')?.addEventListener('click', () => {
            document.getElementById('import-input')?.click();
        });

        // Import File Handler
        document.getElementById('import-input')?.addEventListener('change', (e) => {
            if (e.target.files?.length) {
                dataManager.importProgress(e.target.files[0]);
                e.target.value = ''; // Reset for re-import
            }
        });

        // Create Panel Events
        document.getElementById('close-panel')?.addEventListener('click', () => {
            document.getElementById('side-panel').classList.add('hidden');
        });

        document.getElementById('mobile-back-btn')?.addEventListener('click', () => {
            document.getElementById('side-panel').classList.add('hidden');
        });

        // Status Select Handler
        document.getElementById('panel-status-select')?.addEventListener('change', (e) => {
            const taskId = e.target.getAttribute('data-task-id');
            const newStatus = e.target.value;
            if (taskId) {
                // Initialize taskStatus object if needed
                if (!appState.taskStatus) appState.taskStatus = {};
                appState.taskStatus[taskId] = newStatus;

                // Update progress for done status
                appState.progress[taskId] = (newStatus === 'done');
                dataManager.saveProgress();
                uiRenderer.renderCards();
            }
        });

        // ========== AI TUTOR INTEGRATION ==========

        // Tab Switching
        document.getElementById('tab-panduan')?.addEventListener('click', () => {
            viewLogic.switchTab('panduan');
        });

        document.getElementById('tab-ai-tutor')?.addEventListener('click', () => {
            viewLogic.switchTab('ai-tutor');
        });

        // Chat Send Button
        document.getElementById('send-chat-btn')?.addEventListener('click', () => {
            viewLogic.sendChatMessage();
        });

        // Chat Input Enter Key
        document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                viewLogic.sendChatMessage();
            }
        });

        // Setup initial view
        viewLogic.initSidebar();
    },

    initSidebar: () => {
        // Simple CSS for minimap dots
        const style = document.createElement('style');
        style.textContent = `
            .minimap-item { padding: 5px 0; cursor: pointer; display: flex; align-items: center; gap: 8px; color: var(--text-secondary); }
            .minimap-item.active { color: var(--accent-primary); font-weight: bold; }
            .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-subtle); transition: all 0.2s;}
            .minimap-item.active .dot { background: var(--accent-primary); box-shadow: 0 0 5px var(--accent-primary); }
            .ref-badge { font-size: 0.8em; opacity: 0.7; cursor: help; }
        `;
        document.head.appendChild(style);
    },

    goToPhase: (id) => {
        appState.activePhaseId = id;
        if (!appState.searchQuery) appState.isOverviewMode = false; // Back to focus unless searching
        uiRenderer.renderCards();

        // Scroll to card
        setTimeout(() => {
            document.getElementById(`phase-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);

        dataManager.saveProgress();
    },

    toggleTask: (tid) => {
        appState.progress[tid] = !appState.progress[tid];
        dataManager.saveProgress();
        // Force re-render if panel is open to sync state if needed, or just update checkbox
        // (Checkbox sync is handled by renderCards if we re-render, but for performance, we might just update the UI specific to that one checkbox)
        uiRenderer.renderCards();
    },

    // NEW: Open Task Detail
    openTaskDetails: (taskId, event) => {
        if (event) event.preventDefault();

        // Find task data
        let foundTask = null;
        appState.data.phases.forEach(p => {
            const t = p.tasks.find(t => t.id === taskId);
            if (t) foundTask = t;
        });

        if (foundTask) {
            uiRenderer.renderDetailPanel(foundTask);
            // Set AI Tutor context for this task
            viewLogic.setAITutorContext(foundTask);
            // Reset to Panduan tab when opening new task
            viewLogic.switchTab('panduan');
        }
    },

    nextPhase: () => {
        const next = appState.activePhaseId + 1;
        if (next < appState.data.phases.length) {
            viewLogic.goToPhase(next);
        } else {
            // Show celebration (simple alert for MVP)
            const modal = document.getElementById('celebration-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.getElementById('close-modal').onclick = () => modal.classList.add('hidden');
                document.getElementById('reset-progress').onclick = () => dataManager.resetProgress();
            } else {
                alert('🎉 Selamat! Workflow Selesai!');
            }
        }
    },

    // ========== AI TUTOR FUNCTIONS ==========

    // Current active tab
    currentTab: 'panduan',

    // Switch between Panduan and AI Tutor tabs
    switchTab: (tabName) => {
        viewLogic.currentTab = tabName;

        // Update tab button states
        const panduanTab = document.getElementById('tab-panduan');
        const aiTutorTab = document.getElementById('tab-ai-tutor');

        if (tabName === 'panduan') {
            panduanTab?.classList.add('active');
            aiTutorTab?.classList.remove('active');
            document.getElementById('panduan-content')?.classList.remove('hidden');
            document.getElementById('ai-tutor-content')?.classList.add('hidden');
            document.querySelector('.panel-footer-fixed')?.classList.remove('hidden');
        } else {
            panduanTab?.classList.remove('active');
            aiTutorTab?.classList.add('active');
            document.getElementById('panduan-content')?.classList.add('hidden');
            document.getElementById('ai-tutor-content')?.classList.remove('hidden');
            document.querySelector('.panel-footer-fixed')?.classList.add('hidden');

            // Render quick prompts when switching to AI Tutor
            viewLogic.renderQuickPrompts();

            // Scroll chat to bottom
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
    },

    // Send chat message
    sendChatMessage: async () => {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-chat-btn');
        const message = input?.value.trim();

        if (!message) return;

        // Clear input
        input.value = '';

        // Add user message bubble
        viewLogic.addChatBubble(message, 'user');

        // Show typing indicator
        viewLogic.showTypingIndicator();

        // Disable send button
        if (sendBtn) sendBtn.disabled = true;

        // Send to AI
        const response = await aiTutor.sendMessage(message);

        // Hide typing indicator
        viewLogic.hideTypingIndicator();

        // Enable send button
        if (sendBtn) sendBtn.disabled = false;

        // Add AI response bubble
        viewLogic.addChatBubble(response.message, 'ai');

        // Update quick prompts
        viewLogic.renderQuickPrompts();
    },

    // Add a chat bubble to the chat area
    addChatBubble: (content, type) => {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}`;

        // Convert markdown-like syntax to HTML
        let htmlContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        // SVG icons for avatars
        const userIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
        const aiIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`;

        bubble.innerHTML = `
            <div class="bubble-avatar">${type === 'user' ? userIcon : aiIcon}</div>
            <div class="bubble-content">
                <p>${htmlContent}</p>
            </div>
        `;

        chatMessages.appendChild(bubble);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Show typing indicator
    showTypingIndicator: () => {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        // Remove existing typing indicator if any
        viewLogic.hideTypingIndicator();

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <div class="bubble-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 8V4H8"/>
                    <rect width="16" height="12" x="4" y="8" rx="2"/>
                    <path d="M2 14h2"/>
                    <path d="M20 14h2"/>
                    <path d="M15 13v2"/>
                    <path d="M9 13v2"/>
                </svg>
            </div>
            <div class="bubble-content">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;

        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Hide typing indicator
    hideTypingIndicator: () => {
        document.getElementById('typing-indicator')?.remove();
    },

    // Render quick prompt buttons
    renderQuickPrompts: () => {
        const container = document.getElementById('quick-prompts');
        if (!container) return;

        const prompts = aiTutor.getQuickPrompts();

        container.innerHTML = prompts.map(p => `
            <button class="quick-prompt-btn" data-prompt="${encodeURIComponent(p.prompt)}">
                ${p.label}
            </button>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.quick-prompt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = decodeURIComponent(btn.getAttribute('data-prompt'));
                document.getElementById('chat-input').value = prompt;
                viewLogic.sendChatMessage();
            });
        });
    },

    // Set AI Tutor context when opening task details
    setAITutorContext: (task) => {
        // Find the phase for this task
        let foundPhase = null;
        appState.data.phases.forEach(p => {
            if (p.tasks.find(t => t.id === task.id)) {
                foundPhase = p;
            }
        });

        aiTutor.setTaskContext(task, foundPhase);
    }
};

// Export reset for debug
dataManager.resetProgress = () => {
    if (confirm('Reset progress?')) {
        localStorage.clear();
        location.reload();
    }
};

// Start
document.addEventListener('DOMContentLoaded', viewLogic.init);
