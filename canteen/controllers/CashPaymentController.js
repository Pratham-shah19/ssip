const Order = require('../models/Orders')
const User = require('../models/User')
const Dish = require('../models/Dish')
const Canteen = require('../models/Canteen')
const CashPayment = require('../models/cashpayment')
const {StatusCodes} = require('http-status-codes')
const ejs = require('ejs');
const pdf = require('html-pdf')
const fs = require('fs');
const nodemailer = require('nodemailer')
const {BadRequestError,NotFoundError} = require('../errors')

const adminHistory = async (req,res) => {
  const payment = await CashPayment.find({paid:true})
  res.status(StatusCodes.OK).json({ res: "Success",data:payment });
}
const canteenAccept = async (req,res) => {
  const {pid} = req.params;
  if(!pid){
    throw new BadRequestError("Please Provide Price ID");
  }
  const obj = {
    isLoading:false,
    paid:true
  }
  const payment = await CashPayment.findOneAndUpdate({_id:pid},obj,{
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ res: "Success" });
}
const adminRequest = async(req,res) => {
  const {price} = req.body;
  if(!price){
    throw new BadRequestError("Please Provide Price");
  }
  req.body.isLoading = true;
  const payment = await CashPayment.create(req.body);
  res.status(StatusCodes.OK).json({ res: "Success" });
}
const canteenView = async (req,res) => {
  const payment = await CashPayment.find({isLoading:true});
  res.status(StatusCodes.OK).json({ res: "Success",data:payment });
}

module.exports = {adminRequest,canteenAccept,adminHistory,canteenView}