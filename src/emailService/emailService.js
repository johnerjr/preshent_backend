let fs = require('fs');
let constant = require('../config/constant');
let environment = require('../environments/environment');

exports.signUp = function(email, firstName, accountType, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/signup.html`).toString();
  mailBody = mailBody.replace(/{{firstName}}/g, firstName);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.signup,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer create signup');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer create signup');
      return callBack(null,res);
    }
  })
}

exports.signUp_backup = function(email, link, firstName, accountType, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/signup_backup.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{link}}/g, link);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.signup,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer create signup');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer create signup');
      return callBack(null,res);
    }
  })
}

exports.resetPassword = async (email, link, firstName, callBack)=> {

  // console.log(email, " email ", firstName, " firstName ", link, '----link');
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/resetpassword.html`).toString();
  // console.log(mailBody, " mailBody ");
  
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{link}}/g, link);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.resetPassword,
    html: mailBody
  };

  // console.log(mailOptions, " mailOptions ");

  const newNodemailer = await environment.nodemailer.transporter.sendMail(mailOptions);
  // console.log(newNodemailer, 'resp in newNodemailer reset password');
  if(newNodemailer){
    // console.log(newNodemailer, 'resp in nodemailer reset password');
    return (null,newNodemailer);
  } else {
    // console.log(err, 'err in nodemailer reset password');
    return (err, null);
  }
}

exports.createUser = function(email, password, firstName, accountType, callBack){
    // console.log('account type in email service', accountType);
    let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/createuser.html`).toString();
    mailBody = mailBody.replace(/{{firstname}}/g, firstName);
    mailBody = mailBody.replace(/{{accountType}}/g, accountType);
    mailBody = mailBody.replace(/{{email}}/g, email);
    // mailBody = mailBody.replace(/{{password}}/g, password);
    let mailOptions = {
      from: environment.nodemailer.from,
      to: email,
      subject: constant.emailSubject.accountCreated,
      html: mailBody
    };
    environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
      if(err){
        console.log(err, 'err in nodemailer creating account');
        return callBack(err, null);
      }
      else{
        console.log(res, 'resp in nodemailer creating account');
        return callBack(null,res);
      }
    })
}

exports.sendOtp = function(email, otp, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/sendotp.html`).toString();
  mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{otp}}/g, otp);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.otpHelp,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer otpHelp');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer otpHelp');
      return callBack(null,res);
    }
  })
}


exports.extendTime = function(email, link, firstName, zone, address, zoneName, transactionId, endTime, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/extendtime.html`).toString();
  // mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{firstName}}/g, firstName);
  // mailBody = mailBody.replace(/{{zone}}/g, zone);
  // mailBody = mailBody.replace(/{{address}}/g, address);
  // mailBody = mailBody.replace(/{{zoneName}}/g, zoneName);
  mailBody = mailBody.replace(/{{link}}/g, link);
  // mailBody = mailBody.replace(/{{transactionId}}/g, transactionId);
  // mailBody = mailBody.replace(/{{endTime}}/g, endTime);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.extendParkingTime,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer extendParkingTime');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer extendParkingTime');
      return callBack(null,res);
    }
  })
}