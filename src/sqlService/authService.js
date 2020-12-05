const DBconnection = require("../config/db.js");

exports.checkEmail = async (email) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ? && ?? = ?";
    const inserts = ['users', 'email', email, 'isDeleted', false];
    const findEmail = await DBconnection.query(sql, inserts)
    return findEmail;
}

exports.checkSignInEmail = async (email, role) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ? && ?? = ? && ?? = ?";
    const inserts = ['users', 'email', email, 'isDeleted', false, 'role', role];
    const findEmail = await DBconnection.query(sql, inserts)
    return findEmail;
}

exports.registerUser = async (detail) => {
    const insertQuery = await DBconnection.query('INSERT INTO users SET ?', detail);
    return insertQuery;
}

exports.checkEmailAndOther = async (detail) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ? && ?? = ? && ?? = ?";
    const inserts = ['users', 'email', detail.email, 'isDeleted', detail.isDeleted, 'activationNumber', detail.activationNumber];
    const findEmail = await DBconnection.query(sql, inserts)
    return findEmail;
}

exports.checkuserPasswordById = async (detail) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ? && ?? = ?";
    const inserts = ['users', 'id', detail.id, 'isDeleted', detail.isDeleted];
    const findEmail = await DBconnection.query(sql, inserts)
    return findEmail;
}

exports.updateUser = async (data) => {
    var sql = "UPDATE users SET ? WHERE id = ?";
    const userStatus = await DBconnection.query(sql, [data, data.id]);
    return userStatus;
}

exports.usernameVerification = async (username) => {
    const sql = `SELECT * FROM customers WHERE username = '${username}'`;
    const result = await DBconnection.query(sql);
    return result;
}

exports.emailVerification = async (email) => {
    const sql = `SELECT * FROM customers WHERE email = '${email}'`;
    const result = await DBconnection.query(sql);
    return result;
}

exports.register = async (detail) => {
    const result = await DBconnection.query('INSERT INTO customers SET ?', detail);
    return result;
}