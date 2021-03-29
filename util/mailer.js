const nodemailer = require("nodemailer");

exports.sendVerficationEmail = async function (emailAddress, token, cb) {
  //Create A Test Account on Ethereal
  let testAccount = await nodemailer.createTestAccount();

  //Transporter is the object that sends emails
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  transporter.sendMail(
    {
      from: '"TrashOverflow" <noreply@trashoverflow.tech>',
      to: emailAddress,
      subject: "TrashOverflow | Email Verification",
      text: "Please click on the link below to verfiy your email",
      html: '<a href="https://www.twitter.com">LINK</a>',
    },
    cb
  );
};
