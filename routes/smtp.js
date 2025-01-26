const router = require('express').Router()
var nodemailer = require('nodemailer')
const Model = require("../models")
const controller = Model.Player
var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'viewon.foodie@gmail.com',
    pass: 'KastamanaProject@2024',
  },
})

router.post('/otpsend', async (req, res) => {
  const {  email } = req.body
  
  
  const otp1 = Math.floor(100000 + Math.random() * 900000)
  await controller.update(
    {otp:otp1},
  {
    where:{email:email }
  }
  )

  const mailOptions = {
    from: 'viewon.foodie@gmail.com',
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
      return res.send(true)
    }
  })
})

module.exports = router