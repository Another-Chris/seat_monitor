const router = require("express").Router();

const { onToggleSeat } = require("./../controllers/seatsController");

router.post("", onToggleSeat);

module.exports = router;
