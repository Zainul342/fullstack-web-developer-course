/**
 * AI Tutor Service
 * Powered by Groq API (Llama 3)
 */

const aiTutor = {
    // System prompt optimized for coding tutor
    systemPrompt: `Kamu adalah AI Tutor yang membantu user mempelajari workflow AI Coding 2026.

ATURAN PENTING:
1. Jawab dalam Bahasa Indonesia yang santai tapi informatif
2. Gunakan emoji untuk membuat penjelasan lebih engaging 🚀
3. Berikan contoh konkret jika memungkinkan
4. Jika user bertanya tentang task tertentu, fokus pada konteks task tersebut
5. Jangan terlalu panjang - maksimal 3-4 paragraf kecuali diminta detail
6. Gunakan formatting markdown: **bold**, \`code\`, bullet points

KONTEKS APLIKASI:
- Ini adalah workflow tracker untuk belajar AI-assisted coding
- Ada 8 fase: Setup, Discovery, Documentation, Design, Development, Verification, Deployment, Iteration
- User sedang belajar best practices coding dengan AI tools seperti Cursor, Windsurf, Claude Code

Jika user mengirim konteks task, gunakan itu untuk memberikan penjelasan yang relevan.`,

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
            const response = await fetch(CONFIG.GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.GROQ_MODEL,
                    messages: messages,
                    max_tokens: CONFIG.MAX_TOKENS,
                    temperature: CONFIG.TEMPERATURE
                })
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
