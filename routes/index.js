const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');
const upload = require('../middleware/upload');

// Define API routes
router.get('/papers', paperController.getAllPapers);

// Protected route with file upload
router.post('/papers', upload.single('pdf'), paperController.createPaper);

module.exports = router;
