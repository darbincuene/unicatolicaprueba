
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/usuariosRoues');
const clientRoutes = require('./routes/clienteRoutes');
const invoiceRoutes = require('./routes/facturaRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', clientRoutes);
app.use('/api',invoiceRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
