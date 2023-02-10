require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//middleware
app.use(express.static(`${__dirname}/public`));

// routers
const AdminForgotPasswordRouter = require("./routes/AdminForgotPasswordRouter");
const AdminLoginRouter = require("./routes/AdminLoginRouter");
const UserForgotPasswordRouter = require("./routes/UserForgotPasswordRouter");
const UserLoginRouter = require("./routes/UserLoginRouter");
const UserRegisterRouter = require("./routes/UserRegisterRouter");
const CanteenForgotPasswordRouter = require("./routes/CanteenForgotPasswordRouter");
const CanteenLoginRouter = require("./routes/CanteenLoginRouter");

app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// const upload = multer({ storage: multerStorage })

//routes user
app.use("/api/v1/user/login", UserLoginRouter);
app.use("/api/v1/user/register", UserRegisterRouter);
app.use("/api/v1/user/forgotpassword", UserForgotPasswordRouter);

//routes admin
app.use("/api/v1/admin/login", AdminLoginRouter);
app.use("/api/v1/admin/forgotpassword", AdminForgotPasswordRouter);

//routes canteen
app.use("/api/v1/canteen/login", CanteenLoginRouter);
app.use("/api/v1/canteen/forgotpassword", CanteenForgotPasswordRouter);

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

//connecting to database
start();
