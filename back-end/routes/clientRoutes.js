const express = require('express');
const router = express.Router();

const clientController = require('../controller/clientFileController');

router.get('/', clientController.getClients)
router.get('/:id', clientController.getClientsDetails)
router.post('/new', clientController.addClients)
router.put('/:id', clientController.updateClients)
router.delete('/:id', clientController.deleteClients)

module.exports = router