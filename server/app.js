const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { initSocket } = require("./socket");

const seatRouter = require("./routes/seatsRouter");

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));
app.use(cors());
app.use("/seats", seatRouter);

const PORT = 8080 || process.env.PORT;
const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server start at port ${PORT}`);
  }
});

initSocket(server);

module.exports = server;
