const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./User')
require('dotenv').config()

const BasketSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:[true,'Please provide user id'],
  },
  items:{
    type:[Object],
    required:[true,'Please provide items']
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  }
})


module.exports = mongoose.model('Basket',BasketSchema)