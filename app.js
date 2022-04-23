const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ajaykumar-b25b-password-reset.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(
  cors({
    origin: "https://ajaykumar-b25b-password-reset.netlify.app",
    credentials: true,
  })
);

app.options("https://ajaykumar-b25b-password-reset.netlify.app", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
  });
});

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
