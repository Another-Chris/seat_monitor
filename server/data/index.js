let seats = [
  { seatNo: 0, available: true, beenOccupied: 0 },
  { seatNo: 1, available: true, beenOccupied: 0 },
  { seatNo: 2, available: true, beenOccupied: 0 },
  { seatNo: 3, available: true, beenOccupied: 0 },
  { seatNo: 4, available: true, beenOccupied: 0 },
];

const toggleSeats = (seatNo) => {
  seats = seats.map((seat) => {
    if (seat.seatNo === seatNo) {
      return { ...seat, available: !seat.available, beenOccupied: 0 };
    } else {
      return seat;
    }
  });

  return seats;
};

const changeDuration = (seatNo, minutes) => {
  seats = seats.map((seat) => {
    if (seat.seatNo === seatNo) {
      return { ...seat, beenOccupied: seat.beenOccupied + minutes };
    } else {
      return seat;
    }
  });

  return seats;
};

const getSeatInfo = () => seats;

module.exports = { toggleSeats, getSeatInfo, changeDuration };
