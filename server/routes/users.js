const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);

// Authenticate a user
router.post('/login', loginUser);

module.exports = router;
