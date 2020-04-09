const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

// Register and enroll user
router.post('/', controller.registerUser);
// Authenticate user
router.post('/authenticate', controller.authenticate);

module.exports = router;
