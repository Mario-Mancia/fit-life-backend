const { Sequelize } = require('sequelize');

const databaseName = process.env.DATABASE;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;
const databasePort = process.env.DB_PORT;

const sequelize = new Sequelize(
    databaseName,
    databaseUser,
    databasePassword,
    {
        host: databaseHost,
        port: databasePort,
        dialect: 'mysql',
    }
);

module.exports = sequelize;