const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dbconfig = require("./config/dbconfig");
const imageKit = require("./utils/imagekit");

// user router
const userRoutes = require("./routes/userRoutes");

// admin routes
const adminRoutes = require("./routes/adminRoutes");

// blog routes
const blogRoutes  = require('./routes/blogRoutes')

// error middleware
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// initilizing server
const app = express();

// database initialize
dbconfig(process.env.DBURL);

app.use(errorHandler);

// in built middlware
app.use(
  cors({
    origin: process.env.CLIENTURL,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// setting routes
app.use("/api/auth", userRoutes);
app.use("/api", adminRoutes);
app.use('/api/blog' , blogRoutes);

app.get("/", (req, res) => {
  return res.send({ message: "server is working" });
});

// imagekit authentication
app.get("/api/imagekit/auth", (req, res) => {
  const authenticationParams = imageKit.getAuthenticationParameters();
  return res.json({ authenticationParams });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("server started at " + process.env.PORT);
});

// application error handler
process.on("uncaughtException", (err) => {
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason, promise);
  process.exit(1);
});
