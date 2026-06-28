const express = require('express');
const router = express.Router();
const regisController = require('../controllers/auth'); // Path to your controller

// This keeps your routes file very short and readable
router.post('/register', regisController.createMember);
router.post('/login', regisController.loginMember);
router.patch('/forget', regisController.resetPassword);

module.exports = router;

