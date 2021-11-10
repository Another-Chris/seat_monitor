const initSeats = require("./initSeats");
const Seat = require("./../model/seats");

let seats = initSeats();

const reInitSeat = async () => {
  seats = initSeats();
  await Seat.deleteMany({});
  await Seat.insertMany(seats);
  return seats;
};

const toggleSeats = async (seatNo) => {
  const seat = await Seat.findOne({ seatNo });
  const startTime = seat.startTime;
  const dataToBeCollected = {
    startTime,
    duration: seat.duration,
    endTime: new Date(),
  };
  const pushDoc =
    seat.status === "available"
      ? { available: dataToBeCollected }
      : { occupied: dataToBeCollected };

  await Seat.findOneAndUpdate(
    { seatNo },
    {
      $push: pushDoc,
      $set: {
        duration: 0,
        status: seat.status === "available" ? "occupied" : "available",
      },
    },
    { new: true }
  );

  const seats = await Seat.find({});

  return seats;
};

const changeDuration = async (seatNo, minutes) => {
  await Seat.findOneAndUpdate(
    { seatNo },
    { $inc: { duration: 1 } },
    { new: true }
  );
  return await Seat.find({});
};

const getSeatInfo = async () => await Seat.find({});

module.exports = { toggleSeats, getSeatInfo, changeDuration, reInitSeat };
