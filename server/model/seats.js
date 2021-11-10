const mongoose = require("mongoose");

const SeatsSchema = mongoose.Schema({
  seatNo: Number,
  available: [
    {
      startTime: Date,
      duration: Number,
      endTime: Date,
    },
  ],
  occupied: [
    {
      startTime: Date,
      duration: Number,
      endTime: Date,
    },
  ],
  status: String,
  duration: Number,
  startTime: Date,
});

const SeatsModel = mongoose.model("seats", SeatsSchema);

module.exports = SeatsModel;
