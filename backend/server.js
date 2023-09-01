require("dotenv").config();
require("express-async-errors");

//config
const config = require("./config");

//imports********************
const express = require("express");
const app = express();
const port = config.port;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

//db
const connectDb = require("./db/connect");

//importing routers

// error handler middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//*******************************

//middleware
app.use(
  cors({
    credentials: true,
    origin: `${config.frontendUrl}`,
    sameSite: "none",
  })
);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to Database...\n");

    app.listen(port, () => {
      console.log(`Backend Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
