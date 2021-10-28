const { getSeatInfo, toggleSeats } = require("./../data");
const { boardcastSeatInfo } = require("./../socket");

const onToggleSeat = (req, res, next) => {
  const seatId = Number(req.query.seatId);

  toggleSeats(seatId);
  const seatInfo = getSeatInfo();

  boardcastSeatInfo(seatInfo);
  res.json(seatInfo);
};

module.exports = { onToggleSeat };
