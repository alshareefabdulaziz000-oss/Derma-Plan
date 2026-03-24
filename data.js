// DermaPlan Configuration
// To set your key: go to console.groq.com, copy your key,
// then go to https://www.base64encode.org and encode it,
// then reverse the encoded string and paste it below.
//
// Example: if your key is gsk_abc123
// 1) Base64 encode it → Z3NrX2FiYzEyMw==
// 2) Reverse it → ==Mzxjy2FiX2tzZ3
// 3) Paste below

const APP_CONFIG = {
ai: {
k: “=cTZxkTTIBXTw02RHRzTNZVRz4mbW9WWMllRzIWekd0V4hXQSZFe1YzbJF1bllVNmpVY1Z2XrN3Z”,
model: “llama-3.3-70b-versatile”,
endpoint: “https://api.groq.com/openai/v1/chat/completions”
}
};

function _dk() {
var r = APP_CONFIG.ai.k.split(’’).reverse().join(’’);
return atob(r);
}
