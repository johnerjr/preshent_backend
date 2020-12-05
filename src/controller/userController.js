const constant = require('../config/constant');
const userService = require("../sqlService/userService")

exports.adminDetail = async (req, res) => {
    try {
        const userStatus = await userService.selectUser(req.user);
        if (userStatus.length > 0) {
            userResponse = {
                'name': userStatus[0].name,
                'email': userStatus[0].email,
                'id': userStatus[0].id,
                'role': userStatus[0].role,
                'firstName': userStatus[0].firstName,
                'lastName': userStatus[0].lastName
            }
            res.status(constant.httpCode.success).json({ "message": constant.message.userFound, "data": userResponse, "success": true });
        } else {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.userNotFound,
                data: []
            });
        }
    }
    catch (error) {
        res.status(constant.httpCode.internalServerError).json(error);
    }
};

exports.updateProfile = async (req, res) => {
    try{
        const userStatus = await userService.updateUser(req.body);
        if (userStatus. affectedRows > 0) {
            res.status(constant.httpCode.success).json({ "message": constant.message.userUpdated, "success": true });
        } else {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.userNotFound,
                data: []
            });
        }
    } 
    catch(error){
        res.status(constant.httpCode.internalServerError).json({"message": error})
    }
}
