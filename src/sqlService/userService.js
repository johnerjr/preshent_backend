const DBconnection = require("../config/db.js");

exports.selectUser = async (data) => {
    const sql = "SELECT * FROM ?? WHERE ?? = ?";
    const selectUser = ['users', 'id', data.id];
    const userStatus = await DBconnection.query(sql, selectUser);
    return userStatus;
    
}

exports.updateUser = async(data) => {
    var sql = "UPDATE users SET ? WHERE id = ?";
    const userStatus = await DBconnection.query(sql, [data, data.id]);
    return userStatus;
}