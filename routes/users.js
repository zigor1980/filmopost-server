const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);
router.get('/:id', userController.getById);
router.post('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
