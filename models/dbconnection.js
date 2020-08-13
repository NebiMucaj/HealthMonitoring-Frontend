var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "1234",
    database : 'hm',
    
    
  }); 

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  });

  exports.connection=connection;