const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerficationEmailSendGrid = (recipientEmail, token, cb) => {
  const url = `http://localhost:5000/api/user/verify/${token}`;

  const msg = {
    to: recipientEmail, // Change to your recipient
    from: "noReply@TrashOverflow.tech", // Change to your verified sender
    subject: "TrashOverflow | Email Verification",
    text: "Please click on the link below to verfiy your email LINK",
    html: `'<p>Please click on the link below to verfiy your email</p>
    <a href="${url}">LINK</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${recipientEmail}`);
      cb(null);
    })
    .catch((error) => {
      console.error(error);
      cb(error);
    });
};

exports.sendPasswordRecovery = (recipientEmail, token, cb) => {
  const url = `http://localhost:5000/api/user/forgot_password/${token}`;

  const msg = {
    to: recipientEmail, // Change to your recipient
    from: "noReply@TrashOverflow.tech", // Change to your verified sender
    subject: "TrashOverflow | Password Recovery",
    text: "Please click on the link below to recover your password LINK",
    html: `'<p>Please click on the link below to verfiy your email</p>
    <a href="${url}">LINK</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to ${recipientEmail}`);
      cb(null);
    })
    .catch((error) => {
      console.error(error);
      cb(error);
    });
};

exports.sendVerficationEmailNodeMail = async function (
  emailAddress,
  token,
  cb
) {
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
