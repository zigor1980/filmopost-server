const express = require('express');

const router = express.Router();
const controller = require('../controllers/genre');

router.get('/', controller.fetch);

module.exports = router;
