const nodemailer = require('nodemailer');
// let transport = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//         user: 'fff4477f7ffe0b',
//         pass: 'ebdff92b5ba0a8'
//     }
// });

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "contentmanagementsystemusers@gmail.com",
        pass: "Welcome123@"
    }
});

const message = {
    from: 'contentmanagementsystemusers@gmail.com', // Sender address
    to: 'karthikajeyaraj2002@gmail.com',         // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};
smtpTransport.sendMail(message, function(err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
});
// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
//
// var transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'karthikajeyaraj2002@gmail.com',
//         pass: 'jeyadevi'
//     }
// }));
//
// var mailOptions = {
//     from: 'karthikajeyaraj2002@gmail.com',
//     to: 'saranya199511@gmail.com',
//     subject: 'Sending Email using Node.js[nodemailer]',
//     text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
