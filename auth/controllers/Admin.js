const Admin = require('../models/Admin')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken') 
const nodemailer = require("nodemailer");



// const registerDeliveryBoy = async (req,res) => {
//   const {name,email,password,address,state,pincode,city}=req.body
//    if(!email || !name || !password || !address || !state || !pincode || !city){
//      throw new BadRequestError('Please provide necessary credentials')
//    }
//   const deliveryboy = await DeliveryBoy.create(req.body)
//   const token = deliveryboy.createJWT()
//   res.status(StatusCodes.CREATED).json({user:{name:deliveryboy.name,id:deliveryboy._id},token})
// }

const forgotPasswordAdmin = async (req,res) => {
  const {email}=req.body;
  const emailv = await Admin.findOne({email})
  if(!email || !emailv){
    throw new BadRequestError('Please provide valid email')
  }
  const otp = Math.floor(Math.random()*(10000-1000+1)+1000)
  console.log(otp)
  const admin = await Admin.findOneAndUpdate({email:email},{otp:otp},{new:true,runValidators:true})
  
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'ssip69@outlook.com',
        pass: 'Password@69'
    }
  });
  const mailOptions = {
    from: '"Sachivalaya" <ssip69@outlook.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: 'OTP for Reseting Your Admin Webapp Password ', // Subject line
    text: `Your OTP for reseting the password for Admin webapp is ${otp}, please enter this OTP in your Admin webapp to reset your password.
-Thanks,
Team Sachivalaya  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    res.status(StatusCodes.OK).json({otpsent:true})
  });

}

const loginAdmin = async (req,res) => {
  const {email,password} = req.body
  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const admin = await Admin.findOne({email})
  if(!admin){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  if(password!==admin.password){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = admin.createJWT()
  res.status(StatusCodes.OK).json({user:{name:admin.name,id:admin._id},token})
}



module.exports = {
  forgotPasswordAdmin,loginAdmin
}