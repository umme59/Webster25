const asyncHandler = require('express-async-handler');
// This is a simple proxy stub for connecting to Google NLP API or your chosen NLP service
const axios = require('axios');

const chat = asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question) { res.status(400); throw new Error('Question required'); }

  // STUB: in production send question to Google NLP / Dialogflow / other and return answer.
  // For now, return a canned response.
  const answer = `I received your question: "${question}". (Chatbot stub - integrate Google NLP/Dialogflow here.)`;
  res.json({ answer });
});

module.exports = { chat };
