const express = require('express');
const clientController = require('../controllers/clienteController');
const router = express.Router();

router.post('/clients', clientController.createClient);
router.get('/clients', clientController.getClients);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;
