require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')

//middleware



// routers
const paymentRouter = require('./routes/payment_routes')

app.use(express.json());
//routes
app.use('/api/v1/payments',paymentRouter)

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 6990;

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
