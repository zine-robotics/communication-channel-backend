const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

require("dotenv").config();

const URI = "mongodb+srv://test:test@cluster0.2g4y1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost:27017/zinedb";

const connectWithRetry = (uris, options, maxAttempts = 5) => {
  connectWithRetry.timeout = connectWithRetry.timeout || 0;
  return mongoose.connect(uris, options, (err) => {
    if (err)
      if (connectWithRetry.timeout <= (maxAttempts - 1) * 5000) {
        console.error(
          `Failed to connect to mongo on startup - retrying in ${
            (connectWithRetry.timeout += 5000) / 1000
          } sec`,
          connectWithRetry.previousError != "" + err
            ? `\n${(connectWithRetry.previousError = err)}`
            : ""
        );
        setTimeout(connectWithRetry, connectWithRetry.timeout, uris, options);
      } else process.exit(1);
    else console.log("Connected to MongoDB successfully!");
  });
};

connectWithRetry(URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

var app = express();

app.use(helmet());
app.use(cors());
app.disable("etag");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/api"));
app.use("/api", require("./routes/admin/auth"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/chat"));
app.use("/api", require("./routes/info"));
app.use("/api", require("./routes/delete"));
app.use("/api", require("./routes/add"));

/* eslint-disable */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(422).send({ success: false, error: err.message });
});
/* eslint-enable */

module.exports = app;
