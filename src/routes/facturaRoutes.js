const express = require('express');
const invoiceController = require('../controllers/facturaController');
const router = express.Router();

router.post('/factura', invoiceController.createInvoice);
router.get('/factura', invoiceController.getInvoices);
router.put('/factura/:id', invoiceController.updateInvoice);
router.delete('/factura/:id', invoiceController.deleteInvoice);

module.exports = router;
