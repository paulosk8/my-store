const nodemailer = require('nodemailer');

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: 'paulogalarza1993@gmail.com',
    pass: 'shxerifhbetfcyxo',
  },
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: '"Paulo Galarza" <paulogalarza1993@gmail.com>',
    to: 'apgonzalez1@espe.edu.ec',
    subject: 'Hello My Store',
    text: 'Email de prueba de la asigantura de Aplicaciones Distribuidas', // plain‑text body
    html: '<b>Hello world ESPE</b>', // HTML body
  });

  console.log('Message sent:', info.messageId);
})();
