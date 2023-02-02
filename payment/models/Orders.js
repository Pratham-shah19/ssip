const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./User')
const { boolean } = require('joi')
require('dotenv').config()

const OrderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  status:{
    type:String,
    default: "NEW",
    enum: [
      "NEW",
      "COMPLETED"
    ]
  },
  items:{
    type:[Object],
    required:[true,'Please provide items']
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  },
  otp:{
    type:Number,
    default:0
  },
  button:{
    type:Boolean,
    default:false
  },
  paymentmode:{
    type:String,
    default:'KOT',
    enum:[
      'KOT',
      'ONLINE',
      'CASH'
    ]
  }
})


module.exports = mongoose.model('Order',OrderSchema)