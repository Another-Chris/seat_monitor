const totalSeats = 5;

module.exports = function initSeats() {
  const currDate = new Date();

  return [...Array(totalSeats).keys()].map((no) => ({
    seatNo: no,
    status: "available",
    duration: 0,
    startTime: currDate,
  }));
};
