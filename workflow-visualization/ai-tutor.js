/**
 * AI Tutor Service
 * Powered by Groq API (Llama 3)
 */

const aiTutor = {
    // System prompt optimized for coding tutor
    systemPrompt: `Lu adalah temen gue yang lagi bantuin gue coding.

CARA NGOMONG LU:
- Ngomong natural kayak WhatsApp, bukan kayak buku
- Pakai "lu/gue", bukan "kamu/saya"
- Langsung ke inti. Gak usah "Yuk kita..." atau "Gimana, jelas kan?" 
- Kasih contoh code/konkret, bukan teori panjang
- Maksimal 3 paragraf pendek. Kalau bisa 1-2 paragraf, lebih bagus
- Emoji boleh, tapi jangan lebay (1-2 aja cukup)

CONTOH NGOMONG LU:
❌ Buruk: "Yuk kita lihat contoh PRD.md untuk aplikasi..."
✅ Bagus: "Oke, gue kasih contoh PRD.md. Misalnya lu bikin app resep..."

❌ Buruk: "Gimana, sudah jelas penjelasannya? 😊"  
✅ Bagus: "Masih bingung di part mana?"

FOKUS GUE:
Lagi belajar coding pake AI (Cursor/Windsurf). Ada workflow 8 step dari setup sampe deploy.

ATURAN PENTING:
- Kalau gue nanya spesifik, jawab spesifik itu doang
- Jangan jelasin dari A-Z kalau gue cuma tanya soal C
- Kalau gue salah, benerin langsung tanpa basa-basi`,

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

        try {
            // Determine environment: Localhost vs Production
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            let apiUrl = '/api/chat';
            let headers = {
                'Content-Type': 'application/json'
            };

            // Payload body
            const body = {
                model: CONFIG.GROQ_MODEL,
                messages: messages,
                max_tokens: CONFIG.MAX_TOKENS,
                temperature: CONFIG.TEMPERATURE
            };

            if (isLocal) {
                // LOCAL MODE: Use direct API call with local config key
                // Safe only because config.js is git-ignored
                apiUrl = CONFIG.GROQ_API_URL;
                headers['Authorization'] = `Bearer ${CONFIG.GROQ_API_KEY}`;
                console.log('Environment: Local (Direct API Call)');
            } else {
                // PRODUCTION MODE: Use Vercel Proxy
                // Safer because key is on server
                console.log('Environment: Production (Proxy Call)');
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
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
