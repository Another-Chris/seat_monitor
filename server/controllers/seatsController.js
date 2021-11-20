const {
  toggleSeats,
  changeDuration,
  getSeatInfo,
  reInitSeat,
} = require("./../data");
const { boardcastSeatInfo } = require("./../socket");

const onToggleSeat = async (req, res, next) => {
  const seatId = Number(req.query.seatId);
  const status = req.query.status;

  const seatInfo = await toggleSeats(seatId, status);
  if (!seatInfo) {
    return res.json("invalid status update");
  }
  boardcastSeatInfo(seatInfo);
  res.json(seatInfo);
};

const onChangeDuration = async (req, res, next) => {
  const { seatId } = req.query;
  const seatInfo = await changeDuration(Number(seatId));
  boardcastSeatInfo(seatInfo);
  res.json(seatInfo);
};

const onGetSeatInfo = async (req, res, next) => {
  const seats = await getSeatInfo();
  res.json(seats);
};

const onInitSeats = async (req, res, next) => {
  const password = Number(req.query.password);
  if (password != 123321) {
    res.json("auth failed");
    return;
  }
  const seats = await reInitSeat();
  res.json(seats);
};

module.exports = { onToggleSeat, onChangeDuration, onGetSeatInfo, onInitSeats };
