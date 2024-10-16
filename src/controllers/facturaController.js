const Invoice = require('../models/facturaModel');

exports.createInvoice = (req, res) => {
  const { id_cliente, fecha, descripcion, detalle, monto_total } = req.body;

  console.log("Datos recibidos para crear factura:", { id_cliente, fecha, descripcion, detalle, monto_total });

  if (!id_cliente || !fecha || !descripcion || !detalle || !monto_total) {
    return res.status(400).send('Todos los campos son requeridos.');
  }

  Invoice.create(id_cliente, fecha, descripcion, detalle, monto_total, (err, result) => {
    if (err) {
      console.error("Error al crear la factura:", err); 
      return res.status(500).send('Error creando la factura');
    }
    res.status(201).send({ id_factura: result.insertId, id_cliente, fecha, descripcion, detalle, monto_total });
  });
};

exports.getInvoices = (req, res) => {
  Invoice.findAll((err, results) => {
    if (err) {
      console.error("Error obteniendo las facturas:", err); 
      return res.status(500).send('Error obteniendo las facturas');
    }
    res.status(200).send(results);
  });
};

exports.updateInvoice = (req, res) => {
  const { id } = req.params;
  const { id_cliente, fecha, descripcion, detalle, monto_total } = req.body;

  Invoice.update(id, id_cliente, fecha, descripcion, detalle, monto_total, (err) => {
    if (err) {
      console.error("Error al actualizar la factura:", err);
      return res.status(500).send('Error actualizando la factura');
    }
    res.status(200).send('Factura actualizada');
  });
};

exports.deleteInvoice = (req, res) => {
  const { id } = req.params;

  Invoice.delete(id, (err) => {
    if (err) {
      console.error("Error al eliminar la factura:", err); 
      return res.status(500).send('Error eliminando la factura');
    }
    res.status(200).send('Factura eliminada');
  });
};
