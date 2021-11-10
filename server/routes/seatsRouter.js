const {
  onToggleSeat,
  onChangeDuration,
} = require("./../controllers/seatsController");

const router = require("express").Router();

router.post("", onToggleSeat);
router.post("/duration", onChangeDuration);

module.exports = router;
