const nodemailer = require("nodemailer");
let testAccount = nodemailer.createTestAccount();

//Transporter is the object that sends emails
let transporter = nodemailer.createTransporter({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});

exports.sendVerficationEmail = function (emailAddress, token) {
  transporter.sendMail(
    {
      from: '"TrashOverflow" <noreply@trashoverflow.tech>',
      to: emailAddress,
      subject: "TrashOverflow | Email Verification",
      text: "Please click on the link below to verfiy your email",
      html: "<a href='www.twitter.com'>LINK</a>",
    },
    (err, info) => {
      if (err) throw err;
      console.log(info);
    }
  );
};
