const asyncHandler = require('express-async-handler');
const Medication = require('../models/Medication');
const Reminder = require('../models/Reminder');


function combineDateAndTime(date, timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

const createMedication = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, dosage, frequency, timesOfDay, startDate, endDate } = req.body;

  if (!name || !Array.isArray(timesOfDay) || timesOfDay.length === 0) {
    res.status(400);
    throw new Error('Medication name and times of day are required');
  }

  
  const med = await Medication.create({
    userId,
    name,
    dosage,
    frequency,
    timesOfDay,
    startDate,
    endDate
  });

  
  const start = startDate ? new Date(startDate) : new Date();
  const reminders = [];

  for (let d = 0; d < 7; d++) {
    const currentDay = new Date(start);
    currentDay.setDate(start.getDate() + d);

    for (const timeStr of timesOfDay) {
      const scheduledTime = combineDateAndTime(currentDay, timeStr);
      reminders.push({
        medicationId: med._id,
        userId,
        scheduledTime
      });
    }
  }

  await Reminder.insertMany(reminders);

  res.status(201).json({
    message: 'Medication created successfully',
    medication: med,
    remindersGenerated: reminders.length
  });
});


const listMedications = asyncHandler(async (req, res) => {
  const meds = await Medication.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(meds);
});


const updateMedication = asyncHandler(async (req, res) => {
  const med = await Medication.findById(req.params.id);
  if (!med) {
    res.status(404);
    throw new Error('Medication not found');
  }
  if (med.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  Object.assign(med, req.body);
  await med.save();
  res.json({ message: 'Medication updated', medication: med });
});


const deleteMedication = asyncHandler(async (req, res) => {
  const med = await Medication.findById(req.params.id);
  if (!med) {
    res.status(404);
    throw new Error('Medication not found');
  }
  if (med.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await Reminder.deleteMany({ medicationId: med._id });
  await med.deleteOne();

  res.json({ message: 'Medication and reminders deleted' });
});

module.exports = {
  createMedication,
  listMedications,
  updateMedication,
  deleteMedication
};
