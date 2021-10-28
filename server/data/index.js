let seats = [
  { seatNo: 0, available: true },
  { seatNo: 1, available: true },
  { seatNo: 2, available: true },
  { seatNo: 3, available: true },
  { seatNo: 4, available: true },
];

const toggleSeats = (seatNo) => {
  seats = seats.map((seat) => {
    if (seat.seatNo === seatNo) {
      return { ...seat, available: !seat.available };
    } else {
      return seat;
    }
  });

  return seats;
};

const getSeatInfo = () => seats;

module.exports = { toggleSeats, getSeatInfo };
