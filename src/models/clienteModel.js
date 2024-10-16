const db = require('../config/db');

const Client = {
  create: (name, email, telefono, callback) => {
    const sql = 'INSERT INTO clientes (nombre_cliente, email, telefono) VALUES (?, ?, ?)';
    db.query(sql, [name, email, telefono], callback);
  },

  findAll: (callback) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, callback);
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
    db.query(sql, [id], callback);
  },

  update: (id, name, email, telefono, callback) => {
    const sql = 'UPDATE clientes SET nombre_cliente = ?, email = ?, telefono = ? WHERE id_cliente = ?';
    db.query(sql, [name, email, telefono, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err); 
      
      if (result.affectedRows === 0) {
        return callback(new Error('Cliente no encontrado')); 
      }
      callback(null, result);
    });
  }
  
};

module.exports = Client;
