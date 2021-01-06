const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const sender = 'sweetsimi2097@gmail.com';

module.exports.sendMail = function (data) {
    return new Promise((resolve, reject) => {
        try {
            var options = {
                from: sender,
                subject: data.subject,
                to: data.to,
                // attachments: [
                //     {
                //         filename: data.fileName,
                //         content: data.buffer
                //     }
                // ],
                html: data.body
            };
            if(data.buffer){
                options.attachments =  [
                    {
                        filename: data.fileName,
                        content: data.buffer
                    }
                ]
            }
            
            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'sweetsimi2097@gmail.com',
                  pass: 'simluvpa'
                }
              }));

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve('done');
                }
            });
        } catch (err) {
            return reject(err);
        }
    });
};