const { toggleSeats, changeDuration } = require("./../data");
const { boardcastSeatInfo } = require("./../socket");

const onToggleSeat = (req, res, next) => {
  const seatId = Number(req.query.seatId);

  const seatInfo = toggleSeats(seatId);
  boardcastSeatInfo(seatInfo);
  res.json(seatInfo);
};

const onChangeDuration = (req, res, next) => {
  const { duration, seatId } = req.query;
  const minutes = Math.ceil(Number(duration) / 60);

  const seatInfo = changeDuration(Number(seatId), minutes);
  boardcastSeatInfo(seatInfo);
  res.json(seatInfo);
};

module.exports = { onToggleSeat, onChangeDuration };
