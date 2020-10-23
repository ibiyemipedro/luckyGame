const { Sequelize } = require('sequelize');

const { dbDetails } = require('./config')


// Connection parameters
const database = new Sequelize(dbDetails.database, dbDetails.username, dbDetails.password, {
  host: 'localhost',
  dialect: 'postgres',
  // logging: (...msg) => console.log(msg),
});


// Connection to db
const dbConnection = async () => {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    return true
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = { database, dbConnection };
