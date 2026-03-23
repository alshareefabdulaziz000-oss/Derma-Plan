const https = require(‘https’);

module.exports = function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

var GROQ_KEY = process.env.GROQ_API_KEY;

if (!GROQ_KEY) {
return res.status(500).json({ error: ‘API key not configured’ });
}

var messages = req.body && req.body.messages;
if (!messages) {
return res.status(400).json({ error: ‘Missing messages’ });
}

var postData = JSON.stringify({
model: ‘llama-3.3-70b-versatile’,
messages: messages,
temperature: 0.3,
max_tokens: 4000
});

var options = {
hostname: ‘api.groq.com’,
port: 443,
path: ‘/openai/v1/chat/completions’,
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘Authorization’: ’Bearer ’ + GROQ_KEY,
‘Content-Length’: Buffer.byteLength(postData)
}
};

var apiReq = https.request(options, function (apiRes) {
var body = ‘’;
apiRes.on(‘data’, function (chunk) { body += chunk; });
apiRes.on(‘end’, function () {
try {
var data = JSON.parse(body);
res.status(apiRes.statusCode).json(data);
} catch (e) {
res.status(500).json({ error: ‘Invalid response from API’ });
}
});
});

apiReq.on(‘error’, function (e) {
res.status(500).json({ error: e.message });
});

apiReq.write(postData);
apiReq.end();
};
