const mysql = require('mysql2');

//connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // personal mysql user
        user: 'root',
        //personal mysql password
        password: 'password',
        database: 'companydb'
    },
    console.log('Connection to companydb database established.')
);

module.exports = db