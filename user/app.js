require('dotenv').config();
require('express-async-errors');
require('path')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')

//middleware
// app.use(express.static(`${__dirname}/public`));


// routers
const authenticationMiddleware = require('./middleware/authentication')
const userRouter = require('./routes/userRouter')

app.use(express.json());
//routes canteen
app.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  console.log(options.root);
  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
app.use('/api/v1/user',userRouter)

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 8000;

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
