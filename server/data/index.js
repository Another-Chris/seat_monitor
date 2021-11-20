const initSeats = require("./initSeats");
const Seat = require("./../model/seats");

let seats = initSeats();

const reInitSeat = async () => {
  seats = initSeats();
  await Seat.deleteMany({});
  await Seat.insertMany(seats);
  return seats;
};

const toggleSeats = async (seatNo, status) => {
  const seat = await Seat.findOne({ seatNo });
  if (seat.status === status) {
    return;
  }

  // calculate seat availability
  let statusCode;
  if (seat.status === "available") {
    statusCode = 1;
  } else if (seat.status === "occupied") {
    statusCode = 0;
  } else if (seat.status === "suspicious") {
    statusCode = -1;
  }

  // check if a seat has been stable for greater or equal then 1 minutes
  if (seat.duration > 0) {
    const startTime = seat.startTime;
    const pushDoc = {
      startTime,
      duration: seat.duration,
      endTime: new Date(),
      statusCode,
    };

    // if so, change the status, and set the duration to 0
    await Seat.findOneAndUpdate(
      { seatNo },
      {
        $push: { availability: pushDoc },
        $set: {
          duration: 0,
          status,
        },
      }
    );
  } else {
    // if not, just change the status
    await Seat.findOneAndUpdate(
      { seatNo },
      {
        $set: {
          status,
        },
      }
    );
  }

  const seats = await Seat.find({});
  return seats;
};

const changeDuration = async (seatNo) => {
  await Seat.findOneAndUpdate(
    { seatNo },
    { $inc: { duration: 1 } },
    { new: true }
  );
  return await Seat.find({});
};

const getSeatInfo = async () => await Seat.find({});

module.exports = { toggleSeats, getSeatInfo, changeDuration, reInitSeat };
