const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./User')
require('dotenv').config()

const OrderSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:[true,'Please provide user id'],
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
  }
})


module.exports = mongoose.model('Order',OrderSchema)