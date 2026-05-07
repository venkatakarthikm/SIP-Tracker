const express = require('express');
const router = express.Router();
const sipController = require('../controllers/sipController');
const auth = require('../middleware/auth');

router.post('/:sipId/process', auth, sipController.processSIP);
router.get('/transactions/:investorId', auth, sipController.getTransactions);
router.get('/:sipId', auth, sipController.getSipById);
router.post('/', auth, sipController.createSIP);

module.exports = router;