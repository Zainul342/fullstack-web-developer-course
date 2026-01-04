/**
 * AI Tutor Service
 * Powered by Groq API (Llama 3)
 */

const aiTutor = {
    // System prompt optimized for coding tutor
    systemPrompt: `Lu adalah PARTNER DEBAT INTELEKTUAL gue, bukan asisten pasif.
Gaya bahasa: Tetap santai/temen (lu/gue), TAPI otak lu harus tajam & kritis.

PERAN LU:
1. Challenge Asumsi: Jangan telan mentah-mentah ide gue. Tanya "Yakin premisnya bener?"
2. Counter-Argument: Kasih perspektif skeptis. "Seorang senior dev bakal bilang ini bahaya karena X."
3. Stress-Test Logic: Cari celah di logika gue. "Ini nggak nyambung sama poin A tadi."
4. Truth > Agreement: Kalau gue salah, BILANG SALAH. Jangan "iya-iya" doang biar gue seneng.
5. Solutif: Kritik boleh pedas, tapi harus kasih jalan keluar.

CONTOH INTERAKSI:
User: "Gue mau pakai Redux buat app to-do list sederhana biar scalable."
Lu: "Tahan dulu. Yakin butuh Redux? 🤔
Asumsi lu: App bakal kompleks banget.
Realita: Buat to-do list, Context API atau Zustand jauh lebih ringkas. Redux itu overkill & nambah boilerplate doang.
Saran gue: Mulai simple dulu, refactor ke Redux NANTI kalau state management udah chaos. Jangan over-engineer di awal."

FOKUS:
Teaching AI Coding Workflow (Setup -> Deploy).
Gue pakai: Cursor/Windsurf.

RULES:
- Jangan debat kusir. Tujuannya clarity & truth.
- Flag kalau gue bias (confirmation bias).
- Pendek & padat (max 2-3 paragraf).`,

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
        // Get API Key Dynamically
        const apiKey = this.getApiKey();

        if (!apiKey) {
            // Trigger UI to ask for key if implementation allows, or return error message
            // Ideally dispatch an event that UI listens to, but for now we return a helpful message
            this.chatHistory.push({ role: 'user', content: userMessage });
            this.chatHistory.push({
                role: 'assistant',
                content: `⚠️ **API Key Diperlukan**\n\nSaya butuh Groq API Key kamu untuk bekerja. Key ini disimpan AMAN di browser kamu (LocalStorage).\n\n👇 Klik tombol **Settings** di pojok kanan atas panel (atau ikon gear) untuk memasukkan key.`
            });
            return {
                success: false,
                message: 'API Key missing'
            };
        }

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

        try {
            const apiUrl = CONFIG.GROQ_API_URL;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };

            // Payload body
            const body = {
                model: CONFIG.GROQ_MODEL,
                messages: messages,
                max_tokens: CONFIG.MAX_TOKENS,
                temperature: CONFIG.TEMPERATURE
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();

                // Handle invalid key specifically
                if (response.status === 401) {
                    this.chatHistory.push({ role: 'user', content: userMessage });
                    this.chatHistory.push({ role: 'assistant', content: `❌ **API Key Salah/Expired**\n\nSepertinya API Key yang kamu masukkan tidak valid. Silakan update di Settings.` });
                    return { success: false, message: 'Invalid API Key' };
                }

                throw new Error(errorData.error?.message || 'API request failed');
            }

            const data = await response.json();
            const aiMessage = data.choices[0]?.message?.content || 'Maaf, tidak ada respons.';

            // Update chat history
            this.chatHistory.push({ role: 'user', content: userMessage });
            this.chatHistory.push({ role: 'assistant', content: aiMessage });

            return {
                success: true,
                message: aiMessage
            };

        } catch (error) {
            console.error('AI Tutor Error:', error);
            return {
                success: false,
                message: `❌ Error: ${error.message}. Coba lagi nanti.`
            };
        }
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
