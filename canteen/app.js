require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const CashPaymentRoute = require('./routes/CashPaymentRoute')

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static(`${__dirname}/public`));

// routers
const authenticationMiddleware = require("./middleware/authentication");
const CanteenRoute = require("./routes/CanteenRoute");
const Dish = require("./models/Dish");
const OTPValidateRoute = require("./routes/OTPValidateRoute");
const PasswordChangeRoute = require("./routes/PasswordChangeRoute");
const billRoute = require("./routes/billRoute");

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
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });

//routes canteen
app.use("/api/v1/canteen", CanteenRoute);

app.use("/api/v1/bill", authenticationMiddleware, billRoute);

//routes adddish
app.use("/api/v1/adddish", upload.single("imageUri"), async (req, res) => {
  const obj = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    imageUrl: req.file.filename,
  };
  const dish = await Dish.create(obj);
  res.status(StatusCodes.CREATED).json({ res: "Success", data: dish });
});
//cash payment route
app.use("/api/v1/cashpayment",CashPaymentRoute);
//routes otpvalidation
app.use("/api/v1/canteenotpvalidate", OTPValidateRoute);

//routes passwordchange
app.use("/api/v1/canteenpasswordchange", PasswordChangeRoute);

app.get("/image/files/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "public/files/" + filename);
  return res.sendFile(fullfilepath);
});


// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 6500 || process.env.PORT;

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
