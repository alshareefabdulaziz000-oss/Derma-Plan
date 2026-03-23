module.exports = async (req, res) => {
if (req.method !== ‘POST’) {
return res.status(200).json({ status: ‘ok’, key_exists: !!process.env.GROQ_API_KEY });
}

var key = process.env.GROQ_API_KEY;
if (!key) {
return res.status(500).json({ error: ‘no key’ });
}

try {
var body = JSON.stringify({
model: ‘llama-3.3-70b-versatile’,
messages: req.body.messages,
temperature: 0.3,
max_tokens: 4000
});

```
var r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
  body: body
});

var data = await r.json();
return res.status(200).json(data);
```

} catch (e) {
return res.status(500).json({ error: e.message });
}
};
