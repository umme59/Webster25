const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUpcomingReminders, markCompleted, markMissed } = require('../controllers/reminderController');

router.use(protect);
router.get('/upcoming', getUpcomingReminders);
router.post('/:id/complete', markCompleted);
router.post('/:id/miss', markMissed);

module.exports = router;
