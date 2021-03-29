const nodemailer = require("nodemailer");

exports.sendVerficationEmail = async function (emailAddress, token, cb) {
  //Create A Test Account on Ethereal
  let testAccount = await nodemailer.createTestAccount();

  //Transporter is the object that sends emails
  // Example Transporter
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  // SendGrid Transport

  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS,
    },
  });
  const url = `http://localhost:5000/api/user/verify/${token}`;
  transporter.sendMail(
    {
      from: '"TrashOverflow" <noreply@trashoverflow.tech>',
      to: emailAddress,
      subject: "TrashOverflow | Email Verification",
      text: "Please click on the link below to verfiy your email",
      html: `'<p>Please click on the link below to verfiy your email</p>
      <a href="${url}">LINK</a>`,
    },
    (err, info) => {
      if (err) throw err;
      console.log(nodemailer.getTestMessageUrl(info));
      cb(err, info);
    }
  );
};
