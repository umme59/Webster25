const asyncHandler = require('express-async-handler');
const Medication = require('../models/Medication');
const Reminder = require('../models/Reminder');
const { combineDateAndTime } = require('../utils/dateUtils');

// create medication and generate reminders
const createMedication = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, dosage, frequency, timesOfDay, startDate, endDate } = req.body;
  if (!name || !timesOfDay || !Array.isArray(timesOfDay) || timesOfDay.length === 0) {
    res.status(400); throw new Error('name and timesOfDay are required');
  }
  const med = await Medication.create({
    userId, name, dosage, frequency, timesOfDay, startDate, endDate
  });

  // generate reminders for next 7 days as a simple strategy (adjust as needed)
  const start = startDate ? new Date(startDate) : new Date();
  const days = 7;
  const reminders = [];
  for (let d = 0; d < days; d++) {
    const day = new Date(start.getTime());
    day.setDate(start.getDate() + d);
    for (const timeStr of timesOfDay) {
      const scheduledTime = combineDateAndTime(day, timeStr);
      reminders.push({ medicationId: med._id, userId, scheduledTime });
    }
  }
  await Reminder.insertMany(reminders);

  res.status(201).json({ medication: med, generated: reminders.length });
});

const listMedications = asyncHandler(async (req, res) => {
  const meds = await Medication.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(meds);
});

const updateMedication = asyncHandler(async (req, res) => {
  const med = await Medication.findById(req.params.id);
  if (!med) { res.status(404); throw new Error('Medication not found'); }
  if (med.userId.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  const updates = req.body;
  Object.assign(med, updates);
  await med.save();
  res.json(med);
});

const deleteMedication = asyncHandler(async (req, res) => {
  const med = await Medication.findById(req.params.id);
  if (!med) { res.status(404); throw new Error('Medication not found'); }
  if (med.userId.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Forbidden'); }
  await Reminder.deleteMany({ medicationId: med._id });
  await med.deleteOne();
  res.json({ message: 'Medication deleted' });
});

module.exports = { createMedication, listMedications, updateMedication, deleteMedication };
