const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.get('/check', controller.check);
router.post('/sign-up', controller.signUp);

module.exports = router;
