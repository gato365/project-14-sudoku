// This file will be used to connect to the database
const { connect, connection } = require('mongoose');

// This is the connection to the database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sudokuDB';


  // This will connect us to the database
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// This will log any errors connected to the database
module.exports = connection;