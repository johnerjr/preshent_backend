let jwt = require('jsonwebtoken');
let constant = require('../config/constant');
const config = require('../config/config');
const auth = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(constant.httpCode.success).json({
            success: false,
            code: constant.httpCode.networkConnectTimeout, // 599 code
            message: constant.message.accessDenied,
            data: []
        });
    }
    else{
        try{
            const decoded = jwt.verify(token, config.secret);
            req.user = decoded;
            next();
        } catch(err){
            console.log(err, 'Error session out');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.networkConnectTimeout, // 599 code
                message: constant.message.sessionTimeout,
                data: []
            });
        }
    }
}

module.exports = auth;