const renderMainPage = (req, res, next) => {
  res.sendFile("./../build/index.html");
};

module.exports = { renderMainPage };
