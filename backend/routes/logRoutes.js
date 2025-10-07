const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { listLogs } = require('../controllers/doseLogController');

router.use(protect);
router.get('/', listLogs);

module.exports = router;
