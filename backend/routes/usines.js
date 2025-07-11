const express = require('express');
const router = express.Router();
const controller = require('../controllers/usinesController');

router.post('/:id/transformer', controller.transformerUsine);
router.get('/', controller.listerUsines);

module.exports = router;
