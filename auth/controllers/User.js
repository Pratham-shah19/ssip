const express = require("express");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const stripe = require("stripe")(
  "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"
);

const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!email || !name || !password || !address) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const userx = await User.findOne({email:req.body.email})
  if(userx){
    throw new BadRequestError("This Email already Exists");
  }
  if(req.body.password.length<8){
    throw new BadRequestError("Minimum size of password should be 8");
  }
  req.body.wallet = 5000;
  const customer = await stripe.customers.create({
    email:email,name:name
  });
  req.body.customerId = customer.id;
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

const forgotPasswordUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  console.log(otp);
  const user = await User.findOneAndUpdate(
    { email: email },
    { otp: otp },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new BadRequestError("Please provide valid email");
  }


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "hetpatel5542@gmail.com",
      pass: "xivslyvrfcrgewtb",
    },
  });

  const mailOptions = {
    from: '"Sachivalaya " <ssip69@outlook.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: "OTP for Reseting Your User App Password ", // Subject line
    text: `Your OTP for reseting the password for User app is ${otp}, please enter this OTP in your User app to reset your password.
-Thanks,
Team Sachivalaya  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    res.status(StatusCodes.OK).json({ otpsent: true });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

module.exports = {
  registerUser,
  forgotPasswordUser,
  loginUser,
};
