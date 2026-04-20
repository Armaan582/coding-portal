const express = require('express');
const router = express.Router();
const { getProblems, getProblem } = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProblems);
router.get('/:slug', protect, getProblem);

module.exports = router;
