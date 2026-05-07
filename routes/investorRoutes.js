const express = require('express');
const router = express.Router();
const investorController = require('../controllers/investorController');
const auth = require('../middleware/auth');

router.post('/register', investorController.register);
router.post('/login', investorController.login);
router.get('/:investorId/networth', auth, investorController.getNetWorth);
router.get('/holdings/:investorId', auth, investorController.getInvestorHoldings);
router.get('/:investorId', auth, investorController.getInvestorById);
router.post('/logout', auth, investorController.logout);

module.exports = router;