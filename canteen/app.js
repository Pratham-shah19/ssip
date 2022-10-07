require('dotenv').config();
require('express-async-errors');
const { StatusCodes } = require('http-status-codes')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const path=require('path')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')

//middleware
app.use(express.static(`${__dirname}/public`));


// routers
const authenticationMiddleware = require('./middleware/authentication')
const CanteenRoute = require('./routes/CanteenRoute')
const OTPValidateRoute = require('./routes/OTPValidateRoute')
const PasswordChangeRoute = require('./routes/PasswordChangeRoute')


app.use(express.json());
app.set('trust proxy',1)
app.use(rateLimit({
  windowMs:15*60*1000, // 15 minutes
  max: 100,
}))

//routes canteen
app.use('/api/v1/canteen',authenticationMiddleware,CanteenRoute)

//routes otpvalidation
app.use('/api/v1/canteenotpvalidate',OTPValidateRoute)

//routes passwordchange
app.use('/api/v1/canteenpasswordchange',PasswordChangeRoute)

app.get('/image/files/:filename',(req,res)=>{
  const {filename} = req.params
  const dirname = path.resolve()
  const fullfilepath = path.join(dirname,'public/files/'+filename)
  return res.sendFile(fullfilepath)
})


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

//connecting to database
start()
