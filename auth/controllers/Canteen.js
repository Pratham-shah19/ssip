const Canteen = require('../models/Canteen')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken') 
const nodemailer = require('nodemailer')

// const registerUser = async (req,res) => {
//   const {name,email,password,address,state,pincode,city}=req.body
//    if(!email || !name || !password || !address || !state || !pincode || !city){
//      throw new BadRequestError('Please provide necessary credentials')
//    }
//   const mainuser = await MainUser.create(req.body)
//   const token = mainuser.createJWT()
//   res.status(StatusCodes.CREATED).json({user:{name:mainuser.name,id:mainuser._id},token})
// }

const forgotPasswordCanteen = async (req,res) => {
  const {email}=req.body;
  const emailv = await Canteen.findOne({email})
  if(!email || !emailv){
    throw new BadRequestError('Please provide valid email')
  }
  const otp = Math.floor(Math.random()*(10000-1000+1)+1000)
  console.log(otp)
  const canteen = await Canteen.findOneAndUpdate({email:email},{otp:otp},{new:true,runValidators:true})
  
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
    from: '"Sachivalaya " <ssip69@outlook.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: 'OTP for Reseting Your Canteen WebApp Password ', // Subject line
    text: `Your OTP for reseting the password for Canteen webapp is ${otp}, please enter this OTP in your canteen webapp to reset your password.
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

const loginCanteen = async (req,res) => {
  const {email,password} = req.body
  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const canteen = await Canteen.findOne({email})
  if(!canteen){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  if(password!==canteen.password){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = canteen.createJWT()
  res.status(StatusCodes.OK).json({user:{name:canteen.name,id:canteen._id},token})
}



module.exports = {
  forgotPasswordCanteen,loginCanteen
}