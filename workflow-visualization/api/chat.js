export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { messages, model, temperature, max_tokens } = await request.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: { message: 'Server configuration error: Missing API Key' } }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model || 'llama-3.3-70b-versatile',
                messages: messages,
                max_tokens: max_tokens || 1024,
                temperature: temperature || 0.7
            })
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return new Response(JSON.stringify({ error: { message: 'Internal Server Error' } }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
