const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getReport } = require('../controllers/wellnessController');

router.use(protect);
router.get('/report', getReport);

module.exports = router;
