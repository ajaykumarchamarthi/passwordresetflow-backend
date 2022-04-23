const express = require("express");
const morgan = require("morgan");
const app = express();

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/errorController");

const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
