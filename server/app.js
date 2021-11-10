const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "/", ".env") });
const mongoose = require("mongoose");
const { initSocket } = require("./socket");
const seatRouter = require("./routes/seatsRouter");

const dbUri = process.env.DATABASE_URI;
const PORT = process.env.PORT || 8080;

// mongoose.set("debug", true);

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));
app.use(cors());
app.use("/seats", seatRouter);

const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server start at port ${PORT}`);
    mongoose.connect(dbUri, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("db connected");
      }
    });
  }
});

initSocket(server);
