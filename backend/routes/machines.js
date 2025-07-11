const express = require('express');
const router = express.Router();
const controller = require('../controllers/machinesController');

router.get('/', controller.getAllMachines);
router.post('/:id/reserver', controller.reserverMachine);

module.exports = router;
