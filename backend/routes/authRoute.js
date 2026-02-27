const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// Décommenter pour pouvoir creer un admin
// router.post('/signup', authController.signup);

module.exports = router;