const asyncHandler = require('express-async-handler');
const Reminder = require('../models/Reminder');
const DoseLog = require('../models/DoseLog');

const getUpcomingReminders = asyncHandler(async (req, res) => {
  const now = new Date();
  const upcoming = await Reminder.find({
    userId: req.user._id,
    scheduledTime: { $gte: now }
  }).sort({ scheduledTime: 1 }).limit(50);
  res.json(upcoming);
});

const markCompleted = asyncHandler(async (req, res) => {
  const rem = await Reminder.findById(req.params.id);
  if (!rem) { res.status(404); throw new Error('Reminder not found'); }
  if (rem.userId.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  rem.status = 'completed';
  rem.acknowledgedAt = new Date();
  await rem.save();
  await DoseLog.create({ reminderId: rem._id, userId: req.user._id, taken: true, timeTaken: new Date() });
  res.json({ message: 'Marked completed' });
});

const markMissed = asyncHandler(async (req, res) => {
  const rem = await Reminder.findById(req.params.id);
  if (!rem) { res.status(404); throw new Error('Reminder not found'); }
  if (rem.userId.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  rem.status = 'missed';
  await rem.save();
  await DoseLog.create({ reminderId: rem._id, userId: req.user._id, taken: false, timeTaken: new Date() });
  res.json({ message: 'Marked missed' });
});

module.exports = { getUpcomingReminders, markCompleted, markMissed };
