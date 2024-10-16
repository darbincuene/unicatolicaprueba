const Client = require('../models/clienteModel');

exports.createClient = (req, res) => {
  const { name, email, telefono } = req.body;

  Client.create(name, email, telefono, (err, result) => {
    if (err) return res.status(500).send('Error creando el cliente');
    res.status(201).send({ id: result.insertId, name, email, telefono });
  });
};

exports.getClients = (req, res) => {
  Client.findAll((err, results) => {
    if (err) return res.status(500).send('Error obteniendo clientes');
    res.status(200).send(results);
  });
};

exports.updateClient = (req, res) => {
  const { id } = req.params;
  const { name, email, telefono } = req.body;

  Client.update(id, name, email, telefono, (err) => {
    if (err) return res.status(500).send('Error actualizando el cliente');
    res.status(200).send('Cliente actualizado');
  });
};

exports.deleteClient = (req, res) => {
  const { id } = req.params;

  Client.delete(id, (err) => {
    if (err) {
      console.error('Error al eliminar el cliente:', err); 
      if (err.message === 'Cliente no encontrado') {
        return res.status(404).send('Cliente no encontrado');
      }
      return res.status(500).send('Error eliminando el cliente');     }
    res.status(200).send('Cliente eliminado'); 
  });
};
