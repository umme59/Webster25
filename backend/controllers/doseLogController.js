const asyncHandler = require('express-async-handler');
const DoseLog = require('../models/DoseLog');

const listLogs = asyncHandler(async (req, res) => {
  const logs = await DoseLog.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(200);
  res.json(logs);
});

module.exports = { listLogs };
