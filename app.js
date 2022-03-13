const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./Routes/userRoutes");
const globalErrorHandler = require("./Controller/errorController");
const collegeRouter = require("./Routes/collegeRoutes");
const canteenRouter = require("./Routes/canteenRoutes");
const orderRouter = require("./Routes/orderRoutes");
const AppError = require("./utils/appError");

dotenv.config();

const app = express();

// const allowList = [process.env.ALLOWED_URL_1, process.env.ALLOWED_URL_2];
// console.log(process.env.ALLOWED_URL_2)

// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions = {
//     credentials: true,
//   };

//   if (allowList.indexOf(req.header("Origin")) !== -1) {
//     corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions.origin = false; // disable CORS for this request
//   }

//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const sessionStore = MongoStore.create({
  mongoUrl: DB,
  dbName: "hackathon",
  ttl: 36000 * 1000,
  autoRemove: "native",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(cors());

console.log(process.env.NODE_ENV);

app.use("/test", (req, res) => {
  res.send("Working");
});

app.use(express.json({ limit: "8mb" }));

//All the routes comes here
app.use("/api/v1/user", userRouter);
app.use("/api/v1/college", collegeRouter);
app.use("/api/v1/canteen", canteenRouter);
app.use("/api/v1/orders", orderRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//This is the global error handler
app.use(globalErrorHandler);

module.exports = app;
