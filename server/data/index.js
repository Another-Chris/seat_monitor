const initSeats = require("./initSeats");

let seats = initSeats();
const seatStatus = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
};

const reInitSeat = () => {
  seats = initSeats();
  return seats;
};

const toggleSeats = (seatNo) => {
  seats = seats.map((seat) => {
    if (seat.seatNo === seatNo) {
      let newSeat;
      const startTime = seat.startTime;
      const dataToBeCollected = {
        startTime,
        duration: seat.duration,
        endTime: new Date(),
      };

      if (seat.status === seatStatus.AVAILABLE) {
        newSeat = {
          ...seat,
          available: [...seat.available, dataToBeCollected],
          status: seatStatus.OCCUPIED,
        };
      } else {
        newSeat = {
          ...seat,
          occupied: [...seat.occupied, dataToBeCollected],
          status: seatStatus.AVAILABLE,
        };
      }
      return { ...newSeat, duration: 0, startTime: new Date() };
    } else {
      return seat;
    }
  });

  return seats;
};

const changeDuration = (seatNo, minutes) => {
  seats = seats.map((seat) => {
    if (seat.seatNo === seatNo) {
      return { ...seat, duration: seat.duration + minutes };
    } else {
      return seat;
    }
  });

  return seats;
};

const getSeatInfo = () => seats;

module.exports = { toggleSeats, getSeatInfo, changeDuration, reInitSeat };
