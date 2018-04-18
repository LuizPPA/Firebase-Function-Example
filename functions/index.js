const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

exports.sendMail = functions.https.onRequest((request, response) => {
  var message = {
    replyTo: request.body.from, // Address displayed at the "Reply To" field
    to: 'destination@domain.com', // Destination address
    subject: "Message from "+request.body.name+": "+request.body.subject, // Message subject
    text: request.body.message, // Message body as plain text
    html: '<p>'+request.body.message+'</p>' // Message body as html
  }
  var smtpConfig = {
    host: 'smtp.gmail.com', // Your SMTP host address
    port: 587, // Your SMTP port
    secure: false,
    auth: {
      user: 'youremail@domain.com', // Your email
      pass: 'password' // Your password
    }
  }
  let transporter = nodemailer.createTransport(smtpConfig)
  transporter.sendMail(message)
  return response.status(200).send("OK")
})
