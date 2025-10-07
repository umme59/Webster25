const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createMedication, listMedications, updateMedication, deleteMedication } = require('../controllers/medicationController');

router.use(protect);
router.post('/', createMedication);
router.get('/', listMedications);
router.put('/:id', updateMedication);
router.delete('/:id', deleteMedication);

module.exports = router;
