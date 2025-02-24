const router = require('express').Router()
var nodemailer = require('nodemailer')
const model = require('../models')
var controller = model.User
require('dotenv').config();

var smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'rateliciouss@gmail.com',
    pass: process.env.APP_PASS,
  },
})

router.post('/otpsend/:id', async (req, res) => {
  const {  email } = req.body
  const { id } = req.params
  const otp1 = Math.floor(100000 + Math.random() * 900000)

  await controller.update(
    {otp:otp1},
  {
    where:{email:email, id:id }
  }
  )

  const mailOptions = {
    from: 'rateliciouss@gmail.com',
    to: email,
    subject: 'Account Verification Code',
    html: ` <h4>Dear ${email},</h4>
                <h4>Your verification code is: <span style="font-size:20px;">${otp1}</span>,</h4>
                <h4>Please enter this code to verify your account.</h4>
                <h4>Thank you.</h4>`,
  }

  smtpTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent:', info.response);
      return res.send(true)
    }
  })
})

module.exports = router