const Joi = require("joi");
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const bcrypt = require("bcrypt");
// const randomize = require('randomatic');

const config = require('../config/config');
const constant = require('../config/constant');
const validate = require('../validate/validate');
const UserModule = require("../model/userModel.js");
const authService = require("../sqlService/authService");
const userService = require("../sqlService/userService");
const emailService = require('../emailService/emailService');
const environment = require('../environments/environment');

const cryptr = new Cryptr(constant.secretKeys.cryptrSecretKey);

exports.adminSignUp = async (req, res) => {
    try {
        const { email, password, name, role, firstName, lastName } = req.body;
        const { value, error } = validate.signup(req.body);
        if (!value) {
            return res.status(constant.httpCode.notFound).json({ "essage": result.error['details'][0].message })
        } else {
            const emailStatus = await authService.checkEmail(email);
            if (emailStatus.length > 0) {
                res.status(constant.httpCode.notFound).json({ "message": constant.message.emailAllreadyExist });
            } else {
                const salt = await bcrypt.genSalt(10);
                let newPassword = await bcrypt.hash(password, salt);

                const post = {
                    'name': name,
                    'password': newPassword,
                    'email': email,
                    'role': role,
                    'firstName': firstName,
                    'lastName': lastName
                }
                const insertQuery = await authService.registerUser(post);
                if (insertQuery.affectedRows > 0) {
                    res.status(constant.httpCode.success).json({ "message": constant.message.accountCreated });
                } else {
                    res.status(constant.httpCode.notFound).json({ "message": constant.message.allMandatoryFieldRequired });
                }
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
};

exports.adminSignIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const findEmail = await authService.checkSignInEmail(email, role);
        if (findEmail.length > 0) {
            let isMatchedPassword = await bcrypt.compare(password, findEmail[0].password);
            if (isMatchedPassword) {
                const token = jwt.sign({
                    id: findEmail[0].id,
                    name: findEmail[0].name,
                    role: findEmail[0].role
                }, config.secret);
                const findEmailUser = {
                    name: findEmail[0].name,
                    email: findEmail[0].email,
                    role: findEmail[0].role,
                    id: findEmail[0].id,
                }
                return res.status(constant.httpCode.success).json({
                    "data": {
                        'token': token,
                        'user': findEmailUser
                    },
                    "message": constant.message.signInSuccess,
                    'success': true
                });
            } else {
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.invalidInputs,
                    data: []
                });
            }
        } else {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.invalidInputs,
                data: []
            });
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
};


//new Changes//
exports.userMediaLogin = async (req, res) => {
    const newUser = req.body;
   const email = newUser.loginMediaDetail.email;
   const role = newUser.role;

   const name = newUser.loginMediaDetail.name;
   const firstName = newUser.loginMediaDetail.first_name;
   const lastName = newUser.loginMediaDetail.last_name;
   const loginID = newUser.loginMediaDetail.id;
   const findEmail = await authService.checkSignInEmail(email, role);
   if (findEmail.length > 0) {
           const token = jwt.sign({
               id: findEmail[0].id,
               name: findEmail[0].name,
               role: findEmail[0].role
           }, config.secret);
           const findEmailUser = {
               name: findEmail[0].name,
               email: findEmail[0].email,
               role: findEmail[0].role,
               id: findEmail[0].id,
           }
           return res.status(constant.httpCode.success).json({
               "data": {
                   'token': token,
                   'user': findEmailUser
               },
               "message": constant.message.signInSuccess,
               'success': true
           });
   } else {
       const post = {
           'name': name,
           'email': email,
           'role': role,
           'firstName': firstName,
           'lastName': lastName,
           'loginID': loginID,
           'isDeleted':false
       }
       const insertQuery = await authService.registerUser(post);
       if (insertQuery.affectedRows > 0) {

           const token = jwt.sign({
               // id: findEmail[0].id,
               name: name,
               role: role
           }, config.secret);
           const findEmailUser = {
               name: name,
               email: email,
               role: role,
               id: loginID
           }
           return res.status(constant.httpCode.success).json({
               "data": {
                   'token': token,
                   'user': findEmailUser
               },
               "message": constant.message.signInSuccess,
               'success': true
           });

           res.status(constant.httpCode.success).json({ "message": constant.message.accountCreated });
       } else {
           res.status(constant.httpCode.notFound).json({ "message": constant.message.allMandatoryFieldRequired });
       }

   }


}

// before Logged In //
exports.forgotPass = async (req, res) => {
    try {
        const { email, role } = req.body;
        const { value, error } = validate.forgotPassword({ email: req.body.email });
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            return res.status(constant.httpCode.success).json({
                success: false,
                statusCode: constant.httpCode.badRequest,
                message: constant.message.validationError,
                data: errorArray
            });
        }
        else {
            let { email } = value;
            const activationNumber = constant.function.generateActivationNumber();
            const findEmail = await authService.checkSignInEmail(email, role);
            if (findEmail.length > 0) {
                userUpdate = {
                    'id': findEmail[0].id,
                    'activationNumber': activationNumber,
                }
                const userStatus = await userService.updateUser(userUpdate);
                if (userStatus.affectedRows > 0) {
                    const encryptedEmail = cryptr.encrypt(email);
                    let link = `${environment.web_url}resetPassword?jpn=${activationNumber}&etl=${encryptedEmail}`;
                    const resetNewPassword = await emailService.resetPassword(email, link, findEmail[0].firstName);
                    if (resetNewPassword) {
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.resetPasswordNow,
                            data: resetNewPassword
                        });
                    } else {
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorSendingEmail,
                            data: err
                        });
                    }
                } else {
                    return res.status(constant.httpCode.notFound).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.errorOccur,
                        data: []
                    });
                }
            } else {
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.userNotFound,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
};

// before Logged In //
exports.setPassword = async (req, res) => {
    try {
        const { value, error } = validate.setPassword(req.body);
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else {
            const decryptedEmail = cryptr.decrypt(value.etl);
            const activationNumber = value.jpn;
            const detail = { 'email': decryptedEmail, 'isDeleted': false, 'activationNumber': activationNumber };
            const findEmail = await authService.checkEmailAndOther(detail);
            if (findEmail.length > 0) {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.setPasswordNow,
                    //changes//
                    data: [{ 'email': findEmail[0].email, 'role': findEmail[0].role }]
                });
            } else {
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.unauthorized,
                    message: constant.message.unauthorized,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

// After Logged In //
exports.changePassword = async (req, res) => {
    try {
        const { value, error } = validate.changePassword(req.body);
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else {
            let loggedInUser = req.body.id;
            let { currentPassword, newPassword, confirmNewPassword } = value;
            const detail = { 'id': loggedInUser, 'isDeleted': false }
            const findEmail = await authService.checkuserPasswordById(detail);
            if (findEmail.length > 0) {
                let resultPass = await bcrypt.compare(currentPassword, findEmail[0].password);
                if (!resultPass) {
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.unauthorized,
                        message: constant.message.errorInPasswordChange,
                        data: []
                    });
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(newPassword, salt);
                    const activationNumber = constant.function.generateActivationNumber();
                    const detail = { 'id': loggedInUser, 'isDeleted': false }
                    const updateUser = await authService.checkuserPasswordById(detail);
                    if (updateUser.length > 0) {
                        const data = {
                            'id': loggedInUser,
                            'password': hash,
                            'activationNumber': activationNumber
                        }
                        const userStatus = await authService.updateUser(data);
                        if (userStatus.affectedRows > 0) {
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.passwordChangedSuccessfully,
                                data: []
                            });
                        } else {
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorCreatingPassword,
                                data: []
                            });
                        }
                    } else {
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingPassword,
                            data: []
                        });
                    }
                }
            } else {
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.userNotFound,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.postSetPassword = async (req, res) => {
    try {
        const { value, error } = validate.postSetPassword(req.body);
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else {
            const decryptedEmail = value.email;
            const password = value.password;
            const role = value.role;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const activationNumber = constant.function.generateActivationNumber();
            const detail = { 'email': decryptedEmail, 'isDeleted': false, 'role': role };
            //change//
            const findEmail = await authService.checkSignInEmail(detail.email, detail.role);
            if (findEmail.length > 0) {
                const data = {
                    'id': findEmail[0].id,
                    'password': hash,
                    'activationNumber': activationNumber
                }
                const userStatus = await authService.updateUser(data);
                if (userStatus.affectedRows > 0) {
                    const token = jwt.sign(data, config.secret);
                    return res.header('x-auth-token', token).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.passwordChangedSuccessfully
                    });
                } else {
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingPassword,
                        data: []
                    });
                }
            } else {
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.unauthorized,
                    message: constant.message.unauthorized,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

////////////////////////////////////////////////////////////
// CUSTOMER SIGNUP/REGISTRATION
////////////////////////////////////////////////////////////
exports.register = async (req, res) => {
    const username = validate.username(req.body.username);
    if (username) return res.status(200).send({ success: false, code: 400, param: 'Username', message: username});

    const email = validate.email(req.body.email);
    if (email) return res.status(200).send({ success: false, code: 400, param: 'Email', message: email});

    const password = validate.password(req.body.password);
    if (password) return res.status(200).send({ success: false, code: 400, param: 'Password', message: password});

    const firstName = validate.firstname(req.body.firstName);
    if (firstName) return res.status(200).send({ success: false, code: 400, param: 'First Name', message: firstName});

    const lastName = validate.lastname(req.body.lastName);
    if (lastName) return res.status(200).send({ success: false, code: 400, param: 'Last Name', message: lastName});

    const phone = validate.phone(req.body.phone);
    if (phone) return res.status(200).send({ success: false, code: 400, param: 'Phone', message: phone});

    const usernameStatus = await authService.usernameVerification(req.body.username);
    if (usernameStatus.length > 0) return res.status(200).send({ success: false, code: 401, message: 'usernameExists' });

    const emailStatus = await authService.emailVerification(req.body.email);
    if (emailStatus.length > 0) return res.status(200).send({ success: false, code: 402, message: 'emailExists' });

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    const titles        = (req.body.titles) ? req.body.titles : 1;
    const company       = (req.body.company) ? req.body.company.toLowerCase() : '';
    // const street        = (req.body.street) ? req.body.street : '';
    // const streetno      = (req.body.streetno) ? req.body.streetno : '';
    // const city          = (req.body.city) ? req.body.city : '';
    // const postal        = (req.body.postal) ? req.body.postal : '';
    const subscription  = (req.body.subscription) ? Number(req.body.subscription) : 1;
    const about         = (req.body.about) ? req.body.about : 1;
    const looking       = (req.body.looking) ? req.body.looking : 1;

    const inputData = {
        username:       req.body.username,
        email:          req.body.email.toLowerCase(),
        password:       hashedPassword,
        firstName:      req.body.firstName.toLowerCase(),
        lastName:       req.body.lastName.toLowerCase(),
        phone:          Number(req.body.phone),
        titles:         titles,
        company:        company,
        subscription:   subscription,
        about:          about,
        looking:        looking
    }
    const sql = await authService.register(inputData);
    if (sql.affectedRows > 0) {
        return res.status(200).send({ success: true, code: 200, message: 'Success'});
    } else {
        return res.status(200).send({ success: false, code: 400, message: 'SomethingWrong'});
    }
};

exports.login = async (req, res) => {
    const username = validate.username(req.body.username);
    if (username) return res.status(200).send({ success: false, code: 400, param: 'Username', message: username});

    const password = validate.password(req.body.password);
    if (password) return res.status(200).send({ success: false, code: 400, param: 'Password', message: password});

    const usernameStatus = await authService.usernameVerification(req.body.username);
    if (usernameStatus.length > 0) {
        const isMatchedPassword = await bcrypt.compare(req.body.password, usernameStatus[0].password);
        if (isMatchedPassword) {
            const token = jwt.sign({
                id: usernameStatus[0].id,
                name: `${usernameStatus[0].firstName} ${usernameStatus[0].lastName}`,
                role: 3
            }, config.secret);
            const loggedinUser = {
                id: usernameStatus[0].id,
                firstName: usernameStatus[0].firstName,
                lastName: usernameStatus[0].lastName,
                email: usernameStatus[0].email
            }
            return res.status(200).send({
                success: true,
                code: 200,
                message: 'Success',
                data: { token: token, user: loggedinUser }
            });
        } else {
            return res.status(200).send({ success: false, code: 402, message: 'invalidInputs' });
        }
    } else {
        return res.status(200).send({ success: false, code: 401, message: 'usernameNotExists' });
    }
};