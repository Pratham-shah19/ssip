const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./User')
require('dotenv').config()

const DishSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide name'],
  },
  imageUrl:{
    type:String,
    required:[true,'Please provide image']
  },
  category:{
    type:String,
    required:[true,'Please provide category'],
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  }
})


module.exports = mongoose.model('Dish',DishSchema)