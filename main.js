const connection = require('./config/connection');
const index = require('./index');
const Department = require('./models/departments');
const Employee = require('./models/employees');
const Role = require('./models/roles');

connection.sync({alter: true})
  .then(() => {
    console.log('Database synced successfully.');
    index.init();
  } )
  .catch((err) => {
    console.error('Error syncing database:', err);
  });