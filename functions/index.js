const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

exports.sendMail = functions.https.onRequest((request, response) => {
  // Setting response headers
  response.set('Access-Control-Allow-Origin', "*")
  response.set('Access-Control-Allow-Methods', 'GET, POST')
  response.set('Access-Control-Allow-Headers', 'content-type')

  // Allowing preflight requests
  if (request.method === "OPTIONS") {
    response.status(200).send("OK")
    return
  }

  let from = request.body.from // Email to which reply the message
  let to = request.body.to // Destination address
  let name = request.body.name // Sender name
  let subject = request.body.subject || "No Subject" // Message subject
  let message = request.body.message // Message text
  if (from === undefined || name === undefined || subject === undefined || message === undefined || to === undefined) {
    return response.status(403).send('Please, provide the required info')
    return
  }
  var email = {
    replyTo: from, // Address displayed at the "Reply To" field
    to: to, // Destination address
    subject: "Message from "+name+": "+subject, // Message subject
    text: message, // Message body as plain text
    html: '<p>'+message+'</p>' // Message body as html
  }
  var smtpConfig = {
    host: 'smtp.gmail.com', // Your SMTP host address e.g.: Gmail
    port: 587, // Your SMTP port
    secure: false,
    auth: {
      user: 'youremail@domain.com', // Your email
      pass: 'password' // Your password
    }
  }
  let transporter = nodemailer.createTransport(smtpConfig)
  transporter.sendMail(email)
  return response.status(200).send("OK")
})
