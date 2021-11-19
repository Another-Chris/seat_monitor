const router = require("express").Router()
const {getPrediction} = require("./../controllers/predictController")

router.get("", getPrediction)

module.exports = router