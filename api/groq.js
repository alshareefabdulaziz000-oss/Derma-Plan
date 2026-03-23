export default async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

const GROQ_KEY = process.env.GROQ_API_KEY;

if (!GROQ_KEY) {
console.error(‘GROQ_API_KEY environment variable is not set’);
return res.status(500).json({ error: ‘API key not configured’ });
}

try {
const { messages } = req.body;

```
if (!messages || !Array.isArray(messages)) {
  return res.status(400).json({ error: 'Invalid request: messages array required' });
}

const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + GROQ_KEY
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: messages,
    temperature: 0.3,
    max_tokens: 4000
  })
});

const data = await response.json();

if (!response.ok) {
  console.error('Groq API error:', response.status, data);
  return res.status(response.status).json(data);
}

return res.status(200).json(data);
```

} catch (error) {
console.error(‘Server error:’, error.message);
return res.status(500).json({ error: error.message });
}
}
