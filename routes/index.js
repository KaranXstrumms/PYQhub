const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');

// Define API routes
router.get('/papers', paperController.getAllPapers);
router.post('/papers', paperController.createPaper);

module.exports = router;
