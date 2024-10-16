const bcrypt = require('bcryptjs');
const User = require('../models/usuarioModel');

exports.createUser = (req, res) => {
  const { username, password } = req.body;

/////////s
  if (!username || !password) {
    return res.status(400).send('Username y password son requeridos.');
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  User.create(username, hashedPassword, (err, result) => {
    if (err) {
      return res.status(500).send('Error creando el usuario');
    }
    res.status(201).send({ id: result.insertId, username });
  });
};

exports.getUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo usuarios');
    }
    res.status(200).send(results);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!id || !username) {
    return res.status(400).send('ID y username son requeridos.');
  }

  const hashedPassword = password ? bcrypt.hashSync(password, 8) : undefined;

  User.update(id, username, hashedPassword, (err) => {
    if (err) {
      return res.status(500).send('Error actualizando el usuario');
    }
    res.status(200).send('Usuario actualizado');
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
  }

  User.findByUsername(username, (err, results) => {
    if (err) {
      console.error("Error buscando el usuario:", err);
      return res.status(500).json({ error: 'Error buscando el usuario' });
    }

    console.log("Resultados de la búsqueda:", results);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    console.log("Usuario encontrado:", user);

    
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username } });
  });
};



exports.deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('ID es requerido para eliminar el usuario.');
  }

  User.delete(id, (err) => {
    if (err) {
      return res.status(500).send('Error eliminando el usuario');
    }
    res.status(200).send('Usuario eliminado');
  });
};
