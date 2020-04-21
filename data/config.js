const mysql = require('mysql');

const config ={
    host: 'localhost',
    user: 'root',
    password: "project",
    database: 'data',
};

const pool = mysql.createPool(config);

module.exports = pool;