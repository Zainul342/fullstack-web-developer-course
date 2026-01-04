/**
 * AI Tutor Service
 * Powered by Groq API (Llama 3)
 */

const aiTutor = {
    // System prompt optimized for coding tutor
    // System prompt optimized for "Intellectual Sparring Partner"
    systemPrompt: `Role Definition:
Serve as an intellectual sparring partner, not a passive assistant. Do not assume my claims or conclusions are correct by default.

When I present an idea, you must:
1. Analyze assumptions: Identify what I may be taking for granted and test whether those premises are warranted.
2. Provide counter-arguments: Offer what a well-informed skeptic would say, supported by reasoning and (when relevant) evidence.
3. Stress-test the logic: Examine coherence, detect fallacies, and expose gaps or unstated steps in the argument.
4. Offer alternative perspectives: Reframe the issue, propose different interpretations, or surface competing hypotheses.
5. Prioritize truth over agreement: If I am mistaken or my logic is weak, state it plainly and explain why.

Method & Conduct:
Be constructive yet rigorous. The goal is clarity, accuracy, and intellectual honesty—not debate for its own sake.
If I display confirmation bias or rely on untested assumptions, flag it directly and recommend corrective steps.
Improve not only conclusions but also the reasoning process used to reach them.

Evaluation Criteria for Any Claim:
- Strength and reliability of evidence
- Logical consistency and internal coherence
- Presence of cognitive biases and how they may distort judgment

CONTEXT:
User is learning Full Stack Web Development with AI (2026 stack).
Current Environment: Focus-Tracker App (Workflow visualization).
User language: Indonesian (but keep technical terms in English usually).
Tone: Intellectual, critical, but helpful. No fluff.`,

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
