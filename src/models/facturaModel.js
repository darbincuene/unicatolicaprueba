const db = require('../config/db');

const Invoice = {
  create: (id_cliente, fecha, descripcion, detalle, monto_total, callback) => {
    const sql = 'INSERT INTO facturas (id_cliente, fecha, descripcion, detalle, monto_total) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [id_cliente, fecha, descripcion, detalle, monto_total], (err, result) => {
      if (err) {
        console.error("Error en consulta SQL:", err); 
        return callback(err);
      }
      callback(null, result);
    });
  },

  findAll: (callback) => {
    const sql = `
      SELECT 
        f.id_factura, 
        f.fecha, 
        f.descripcion, 
        f.detalle, 
        f.monto_total, 
        c.nombre_cliente 
      FROM 
        facturas f 
      JOIN 
        clientes c ON f.id_cliente = c.id_cliente
    `;
    db.query(sql, callback);
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM facturas WHERE id_factura = ?';
    db.query(sql, [id], callback);
  },

  update: (id, id_cliente, fecha, descripcion, detalle, monto_total, callback) => {
    const sql = 'UPDATE facturas SET id_cliente = ?, fecha = ?, descripcion = ?, detalle = ?, monto_total = ? WHERE id_factura = ?';
    db.query(sql, [id_cliente, fecha, descripcion, detalle, monto_total, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM facturas WHERE id_factura = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Invoice;
