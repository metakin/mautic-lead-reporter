const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const nodemailer = require('nodemailer');

module.exports.generateMail = (leads, callback) => {
    if(typeof leads !== 'object') throw Error("It is not object.");
    fs.readFile(path.join(__dirname, "../template/default.html"), (err, data) => {
        var source = data.toString();
        var template = handlebars.compile(source);

        var context = { leads: leads, subject: config.subject };
        var rendered = template(context);
        callback(null, rendered);
    })
}

module.exports.sendMail = rendered => {
    var transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
            user: config.smtp.username,
            pass: config.smtp.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: '"'+ config.mail.fromName +'" <'+ config.mail.from +'>',
        to: config.mail.to,
        subject: config.subject,
        html: rendered
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err;
        console.log(info.response);
    });
}
