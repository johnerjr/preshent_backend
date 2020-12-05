let nodemailer = require('nodemailer');
// let twilio = require('twilio');

let twilioAccountSid = '';
let twilioAuthToken = '';
let twilioNumber = '';

let environment = {

    app_name: process.env.NODE_ENV === 'production' ? 'Preshent' : 'Preshent',

    api_url: 'http://18.225.0.47:4252/',
    web_url: 'http://18.225.0.47:4252/',
    nodemailer: {
        transporter: nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'pawarganeshsingh789@gmail.com', // SMTP username
                pass: 'pawarganeshsinghgmail' // SMTP password
            }
        }),
        from: 'preshent@gmail.com'
    },
    // twilio: {
    //     client: new twilio(twilioAccountSid, twilioAuthToken),
    //     from: twilioNumber
    // }
    
};

module.exports = environment;
