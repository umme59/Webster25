const asyncHandler = require('express-async-handler');
const Reminder = require('../models/Reminder');
const DoseLog = require('../models/DoseLog');
const WellnessReport = require('../models/WellnessReport');

const getReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // compute adherence: taken / (taken + missed) in last 30 days
  const since = new Date(); since.setDate(since.getDate() - 30);
  const logs = await DoseLog.find({ userId, createdAt: { $gte: since } });
  const total = logs.length;
  const taken = logs.filter(l => l.taken).length;
  const missed = total - taken;
  const adherenceRate = total === 0 ? 100 : Math.round((taken / total) * 100);
  // trendData: simple counts per day
  const trend = {};
  for (const l of logs) {
    const day = l.createdAt.toISOString().slice(0,10);
    trend[day] = trend[day] || { taken: 0, missed: 0 };
    if (l.taken) trend[day].taken++; else trend[day].missed++;
  }
  let report = await WellnessReport.findOne({ userId });
  if (!report) {
    report = await WellnessReport.create({ userId, adherenceRate, missedDosesCount: missed, trendData: trend });
  } else {
    report.adherenceRate = adherenceRate;
    report.missedDosesCount = missed;
    report.trendData = trend;
    await report.save();
  }
  res.json({ adherenceRate, missed, total, trend });
});

module.exports = { getReport };
