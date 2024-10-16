const db = require('../config/db');

const User = {
  create: (username, hashedPassword, callback) => {
    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], callback);
  },

  findAll: (callback) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, callback);
  },

  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(sql, [username], (err, results) => {
      if (err) {
        return callback(err);
      }
      
      console.log("Resultados de la consulta:", results);
      
      callback(null, results);
    });
  },
  

  update: (id, username, hashedPassword, callback) => {
    const sql = 'UPDATE usuarios SET username = ?, password = ? WHERE id = ?';
    db.query(sql, [username, hashedPassword, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = User;
