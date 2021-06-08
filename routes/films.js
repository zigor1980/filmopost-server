const express = require('express');

const router = express.Router();
const controller = require('../controllers/films');

router.get('/', controller.fetch);
router.post('/', controller.create);
router.get('/top', controller.getTopRate);
router.get('/:id', controller.getById);
router.post('/rate', controller.rate);

module.exports = router;
