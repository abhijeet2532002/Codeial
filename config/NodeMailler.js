const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'abhijeetkumar3252002@gmail.com',
        pass: 'imklagqlgrghwlvt'
    }
});

let renderTemplate = (data,relatedPath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relatedPath),
        data,
        function(err, template) {
            if(err) {
                console.log('error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}