const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fundController');
const auth = require('../middleware/auth');

router.get('/', auth, fundController.getFunds);
router.post('/', auth, fundController.addFund);
router.put('/:fundId/nav', auth, fundController.updateNav);

module.exports = router;