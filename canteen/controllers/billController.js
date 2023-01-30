const Order = require('../models/Orders')
const User = require('../models/User')
const Dish = require('../models/Dish')
const Canteen = require('../models/Canteen')
const {StatusCodes} = require('http-status-codes')
const ejs = require('ejs');
const pdf = require('html-pdf')
const fs = require('fs');
const nodemailer = require('nodemailer')
const {BadRequestError,NotFoundError} = require('../errors')

const billController = async (req,res) => {
  const {oid} = req.params
  if(!oid){
    throw new BadRequestError('Please Provide Dish id')
  }
  const order = await Order.findOneAndUpdate({_id:oid} , {status:'COMPLETED'} , {
    new: true,
    runValidators: true,
  })

  const user = await User.findOne({_id:order.userId})
  const path = __dirname + `\\bill-${oid}.pdf`
  let qty = 0
  var name = [];
  let i=0
  order.items.forEach(async(obj)=>{
    qty = qty + obj.qty
    const dish = await Dish.findOne({_id:obj.dishId})
    name[i] = {names:dish.name,qty:obj.qty,price:obj.qty*dish.price}
    i++
    console.log(name)
  })
  setTimeout(() => {
    console.log(name)
    const data = {
      orders:{order,qty,name,uname:user.name}
    }
    const filepathname = __dirname+'\\bill.ejs'
    const htmlstring = fs.readFileSync(filepathname).toString()
    const options = {
      format:'Letter'
    }
    const ejsdata = ejs.render(htmlstring,data)
        pdf.create(ejsdata,options).toFile(`bill-${oid}.pdf`,(err,response)=>{
          if(err) console.log(err)
    
          console.log('File Generated')
          const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'ssip109@outlook.com',
                pass: 'Password@69'
            }
          });
          const mailOptions = {
            from: '"Sachivalaya " <ssip109@outlook.com>', // sender address (who sends)
            to: `${user.email}`, // list of receivers (who receives)
            subject: `Your Order Reciept for order id  ${oid}`, // Subject line
            text: `Your Order's reciept with order id ${oid} is attatched below.
    -Thanks,
    Team Sachivalaya  `,
            attachments:[
              {
                path:`bill-${oid}.pdf`
              }
            ]
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
        
            res.status(StatusCodes.OK).json({res:'Success'})
          });
  
  
        })
  }, 100);
  
 
}

module.exports = {billController}