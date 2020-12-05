const mysql = require("mysql");
var util = require('util');
const config = require('./config');

// const DBconnetons = mysql.createConnection({
//     host: config.db_host,
//     port: config.db_port,
//     user: config.db_user,
//     password: config.db_password,
//     database: config.database
// });

const DBconnetons = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'preshent'
});

// // console.log(DBconnetons, "DBconnetons Connection!");
DBconnetons.connect((error) => {
    if (error) return console.log("Connection Lost!", {
        host: process.env.DATABASE_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }, error);
    console.log("Databse Connected Successfully!");
});
DBconnetons.query = util.promisify(DBconnetons.query);
// console.log(DBconnetons.query, " DBconnetons.query")





// let DBconnetons;
/* function handleDisconnect() {

    DBconnetons.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    DBconnetons.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect(); */



module.exports = DBconnetons;