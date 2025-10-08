const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// send simple email (synchronous-like)
async function sendEmail(to, subject, text, html) {
  if (!process.env.EMAIL_USER) {
    console.warn('Email credentials missing - skipping sendEmail.');
    return;
  }
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });
}

module.exports = { sendEmail };
