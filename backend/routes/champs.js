const express = require('express');
const router = express.Router();
const controller = require('../controllers/champsController');

router.get('/', controller.getAllChamps);
router.post('/:id/labourer', controller.labourerChamp);
router.post('/:id/semer', controller.semerChamp);
router.post('/:id/fertiliser', controller.fertiliserChamp);
router.post('/:id/recolter', controller.recolterChamp);

module.exports = router;
