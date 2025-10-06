const asyncHandler = require('express-async-handler');
const { predictAdherenceRisk } = require('../services/aiService');
const { sendEmail } = require('../services/emailService');

const predict = asyncHandler(async (req, res) => {
  const result = await predictAdherenceRisk(req.user._id);
  res.json(result);
});

const sendNudge = asyncHandler(async (req, res) => {
  // Example: send proactive nudge email
  const { to, text } = req.body;
  await sendEmail(to, 'Alchemist Nudge: medication reminder', text || 'Friendly nudge: please take your medicine');
  res.json({ ok: true });
});

module.exports = { predict, sendNudge };
