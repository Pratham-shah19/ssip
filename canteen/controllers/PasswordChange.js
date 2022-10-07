const Order = require('../models/Orders')
const User = require('../models/User')
const Dish = require('../models/Dish')
const Canteen = require('../models/Canteen')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
const bcrypt = require('bcryptjs')

const canteenPasswordChange = async (req,res) => {
  const {email} = req.params
  let {password} = req.body
  if(!password){
    throw new BadRequestError('Please Provide Password')
  }
  if(!email){
    throw new BadRequestError('Please Provide email')
  }
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password,salt)
  const canteen = await Canteen.findOneAndUpdate({email},{password},{new:true,runValidators:true})
  if(!canteen){
    throw new BadRequestError('Please Provide Valid email')
  }
  res.status(StatusCodes.OK).json({res:'Success',data:canteen})

}

module.exports = {canteenPasswordChange}