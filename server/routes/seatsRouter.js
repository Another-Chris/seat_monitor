const {
  onToggleSeat,
  onChangeDuration,
  onGetSeatInfo,
  onInitSeats,
} = require("./../controllers/seatsController");

const router = require("express").Router();

router.post("", onToggleSeat);
router.post("/duration", onChangeDuration);
router.get("", onGetSeatInfo);
router.post("/init", onInitSeats);

module.exports = router;
