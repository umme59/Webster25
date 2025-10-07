const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { predict, sendNudge } = require('../controllers/aiController');
const { chat } = require('../controllers/chatbotController');

router.use(protect);
router.get('/predict', predict);
router.post('/nudge', sendNudge);
router.post('/chat', chat);

module.exports = router;
