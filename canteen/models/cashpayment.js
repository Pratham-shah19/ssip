const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { bool } = require('joi')
require('dotenv').config()

const CashSchema = new mongoose.Schema({
  price:{
    type:Number,
    required:[true,'Please provide amount'],
  },
  isLoading:{
    type:Boolean,
    default:false
  },
  paid:{
    type:Boolean,
    default:false
  }
},{ timestamps: true })



module.exports = mongoose.model('CashPayment',CashSchema)