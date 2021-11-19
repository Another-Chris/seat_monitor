const getPrediction = async (req, res, next) => {
  const prob = 100 * Math.random().toFixed(2)
  res.json({
    status: prob > 50 ? "available" : "occupied",
    confidence: prob
  });
};

module.exports = { getPrediction };
