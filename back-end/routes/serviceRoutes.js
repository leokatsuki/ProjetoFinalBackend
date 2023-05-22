const express = require('express');
const router = express.Router();

const serviceController = require('../controller/serviceFileController');

router.get('/', serviceController.getServices)
router.get('/:id', serviceController.getServicesDetails)
router.post('/new', serviceController.addServices)
router.put('/:id', serviceController.updateServices)
router.delete('/:id', serviceController.deleteServices)

module.exports = router