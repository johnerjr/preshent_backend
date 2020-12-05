// import dotenv from 'dotenv'
const dotenv = require('dotenv');
dotenv.config();
const config = {
    port :process.env.PORT,
    environment: process.env.NODE_ENV,
    secret: process.env.SECRET,
    role: process.env.role,
    db_host: process.env.DATABASE_HOST,
    db_port: process.env.MYSQL_PORT,
    db_user: process.env.MYSQL_USER,
    db_password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

module.exports = config;