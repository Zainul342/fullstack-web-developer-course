/**
 * AI Tutor Service
 * Powered by Groq API (Llama 3)
 */

const aiTutor = {
    // System prompt optimized for coding tutor
    systemPrompt: `Lu adalah GROK-STYLE AI PARTNER.
Tahun sekarang: 2026.
Attitude lu: Blak-blakan, Anti-Bullshit, Data-Driven, Realistis (ala Elon Musk's Grok).

REALITA TECH 2026 (JANGAN KUDET):
- **AI Coding:** Cursor & Windsurf itu standar baru. Dev yang ngetik manual 100% itu dinosaurus.
- **Frontend:** Next.js masih raja. CRA (Create React App) udah mati total. Vite itu default buat SPA.
- **State:** Redux itu legacy buat app raksasa doang. Zustand/Jotai itu modern standard.
- **Career:** "Junior Dev" susah dapet kerjaan kalau cuma bisa copy-paste. Harus bisa jadi "AI Orchestrator".

PERAN LU:
1. **Facts > Feelings:** Kalau ide user jelek/basi, bilang jelek. Jangan sugarcoat.
2. **Current-Aware:** Jangan saranin teknatologi 2023 yang udah ditinggalin.
3. **Intellectual Sparring:** Bantah argumen gue kalau nggak logis. Pakai data/logika.
4. **No Fluff:** Jawab poin-poin. Jangan bertele-tele.

CONTOH INTERAKSI:
User: "Gue mau belajar Create React App buat portfolio."
Lu: "Stop. Itu teknologi zombie 🧟‍♂️.
Sekarang 2026, pakai Vite atau Next.js.
Ngapain belajar tech yang udah nggak dipakai industri?
Lu mau portfolio lu kelihatan kayak museum? Ganti ke Vite sekarang."

RULES:
- Pakai bahasa santai (Lu/Gue) tapi tajam.
- Jangan halu. Kalau gak tau, bilang gak tau.
- VALIDASI setiap asumsi user.`,

    // Chat history untuk konteks percakapan
    chatHistory: [],

    // Current task context
    currentTaskContext: null,

    /**
     * Set context dari task yang sedang dibuka
     */
    setTaskContext: function (task, phase) {
        this.currentTaskContext = {
            taskId: task.id,
            taskLabel: task.label,
            taskDescription: task.description,
            phaseTitle: phase?.title || ''
        };
    },

    /**
     * Clear task context
     */
    clearTaskContext: function () {
        this.currentTaskContext = null;
    },

    /**
     * Get API Key from LocalStorage or Ask User
     */
    getApiKey: function () {
        // 1. Check LocalStorage
        const storedKey = localStorage.getItem('focus_tracker_apikey');
        if (storedKey) return storedKey;

        // 2. Check Config (fallback for dev only, but empty in prod)
        if (CONFIG.GROQ_API_KEY && CONFIG.GROQ_API_KEY.includes('gsk_')) {
            return CONFIG.GROQ_API_KEY;
        }

        return null;
    },

    /**
     * Save API Key to LocalStorage
     */
    saveApiKey: function (key) {
        if (!key.startsWith('gsk_')) {
            alert('API Key tidak valid. Harus dimulai dengan "gsk_".');
            return false;
        }
        localStorage.setItem('focus_tracker_apikey', key);
        return true;
    },

    /**
     * Send message to Groq API
     */
    sendMessage: async function (userMessage) {
        // Build messages array
        const messages = [
            { role: 'system', content: this.systemPrompt }
        ];

        // Add task context if available
        if (this.currentTaskContext) {
            messages.push({
                role: 'system',
                content: `KONTEKS TASK SAAT INI:
- Task: ${this.currentTaskContext.taskLabel}
- Fase: ${this.currentTaskContext.phaseTitle}
- Deskripsi: ${this.currentTaskContext.taskDescription}

Jika user bertanya tanpa spesifik, asumsikan tentang task ini.`
            });
        }

        // Add chat history (last 10 messages for context window)
        const recentHistory = this.chatHistory.slice(-10);
        messages.push(...recentHistory);

        // Add current user message
        messages.push({ role: 'user', content: userMessage });

        // STRATEGY: Hybrid (Proxy First -> Fallback to Client Key)
        let usedStrategy = 'proxy';
        let apiKey = this.getApiKey(); // Check if user has explicit key

        try {
            let response;

            // 1. Try Client Key Strategy IF key exists (User preference override)
            if (apiKey) {
                usedStrategy = 'direct';
                response = await this._callDirectApi(messages, apiKey);
            }
            // 2. Otherwise Try Proxy
            else {
                try {
                    response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            messages,
                            model: CONFIG.GROQ_MODEL,
                            temperature: CONFIG.TEMPERATURE
                        })
                    });

                    // Check if Proxy successful
                    if (!response.ok) {
                        throw new Error('Proxy failed');
                    }
                } catch (proxyError) {
                    // 3. Proxy Failed? Fallback to Direct API (Require Key)
                    console.warn('Proxy unavailable, falling back to client key...');

                    // Re-check key (maybe we didn't check it yet if we went straight to proxy)
                    if (!apiKey) {
                        const helpMessage = `⚠️ **API Key Diperlukan**\n\nServer proxy tidak tersedia (atau belum disetup). Kamu perlu pakai API Key sendiri.\n\n👇 Klik tombol **Settings** di pojok kanan atas untuk input key.`;

                        this.chatHistory.push({ role: 'user', content: userMessage });
                        this.chatHistory.push({ role: 'assistant', content: helpMessage });
                        return { success: false, message: helpMessage };
                    }

                    usedStrategy = 'direct_fallback';
                    response = await this._callDirectApi(messages, apiKey);
                }
            }

            // Handle Response
            if (!response.ok) {
                // If we get here, it means the final attempt failed
                if (response.status === 401) {
                    const errorMessage = `❌ **API Key Salah/Expired**\n\nSilakan update di Settings.`;
                    this.chatHistory.push({ role: 'user', content: userMessage });
                    this.chatHistory.push({ role: 'assistant', content: errorMessage });
                    return { success: false, message: errorMessage };
                }
                throw new Error('API request failed');
            }

            const data = await response.json();
            const aiMessage = data.choices[0]?.message?.content || 'Maaf, tidak ada respons.';

            // Update chat history
            this.chatHistory.push({ role: 'user', content: userMessage });
            this.chatHistory.push({ role: 'assistant', content: aiMessage });

            return { success: true, message: aiMessage };

        } catch (error) {
            console.error('AI Tutor Error:', error);
            return {
                success: false,
                message: `❌ Error: ${error.message}. Coba lagi nanti.`
            };
        }
    },

    /**
     * Helper: Call Groq API Directly (Client-Side)
     */
    _callDirectApi: async function (messages, apiKey) {
        return fetch(CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: CONFIG.GROQ_MODEL,
                messages: messages,
                max_tokens: CONFIG.MAX_TOKENS,
                temperature: CONFIG.TEMPERATURE
            })
        });
    },

    /**
     * Clear chat history
     */
    clearHistory: function () {
        this.chatHistory = [];
    },

    /**
     * Get quick prompts based on current context
     */
    getQuickPrompts: function () {
        if (this.currentTaskContext) {
            return [
                { label: '💡 Jelaskan', prompt: `Jelaskan lebih detail tentang "${this.currentTaskContext.taskLabel}"` },
                { label: '📝 Contoh', prompt: `Berikan contoh nyata untuk "${this.currentTaskContext.taskLabel}"` },
                { label: '⚡ Tips', prompt: `Apa tips dan trik untuk "${this.currentTaskContext.taskLabel}"?` },
                { label: '⚠️ Risiko', prompt: `Apa risiko jika saya skip "${this.currentTaskContext.taskLabel}"?` }
            ];
        }
        return [
            { label: '🚀 Mulai', prompt: 'Bagaimana cara memulai belajar AI Coding?' },
            { label: '🔧 Tools', prompt: 'Apa tools AI coding terbaik 2026?' },
            { label: '📚 Tips', prompt: 'Berikan tips untuk pemula AI coding' },
            { label: '❓ FAQ', prompt: 'Apa kesalahan umum saat coding dengan AI?' }
        ];
    }
};
