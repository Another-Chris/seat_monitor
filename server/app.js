const express = require("express");
const http = require("http");
const cors = require("cors");
const { initSocket } = require("./socket");

const seatRouter = require("./routes/seatsRouter");

const app = express();
app.use(cors());
app.use("/seats", seatRouter);

const PORT = 8080 || process.env.PORT;
const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server started");
  }
});

initSocket(server);

module.exports = server;
