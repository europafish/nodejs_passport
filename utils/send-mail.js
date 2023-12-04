const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "myiron11@gmail.com",
    pass: "",
  },
});

module.exports = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
