const { renderMainPage } = require("./../controllers/rootControllers");
const router = require("express").Router();

router.get("", renderMainPage);

module.exports = router;
