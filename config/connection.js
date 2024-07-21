//connection to database
const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize('Social_Network_API_db', 'postgres', 'password',
  {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
}
);

sequelize.authenticate().then(() => {

  // console.log('Database connected successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;