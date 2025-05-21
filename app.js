require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database.js');
const userRoutes = require('./routes/Users.js');
const recordRoutes = require('./routes/UserRecords.js')

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', recordRoutes);

const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.ADDRESS || '';

(async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa con la base de datos');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://${ADDRESS}:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo establecer la conexión con la base de datos: ', error.message);
    }
})();