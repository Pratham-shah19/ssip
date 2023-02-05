require('dotenv').config();
require('express-async-errors');
require('path')
const cors = require('cors')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')

//middleware
// app.use(express.static(`${__dirname}/public`));


// routers
const userRouter = require('./routes/userRouter')

app.use((
  cors({
    origin: "*",
  })
));
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  next();
});
app.use(express.json());
//routes
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
