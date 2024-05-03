const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./middlewares/jwt");
const errorHandler = require("./middlewares/error_handler");
const authorizePostRequests = require("./middlewares/authorization");
require("dotenv/config");

const app = express();
const env = process.env;
const API = env.API_URL;

const hostname = env.HOST;
const port = env.PORT;

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(authJwt());
app.use(authorizePostRequests);
app.use(errorHandler);

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

app.use(`${API}/`, authRouter);
app.use(`${API}/users`, usersRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
