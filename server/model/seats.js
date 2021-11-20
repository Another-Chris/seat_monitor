const mongoose = require("mongoose");

const SeatsSchema = mongoose.Schema({
  seatNo: Number,
  availability: [
    { startTime: Date, endTime: Date, statusCode: Number, duration: Number },
  ],
  status: String,
  duration: Number,
  startTime: Date,
});

const SeatsModel = mongoose.model("seats", SeatsSchema);

module.exports = SeatsModel;
