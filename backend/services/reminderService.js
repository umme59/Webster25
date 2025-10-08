const Reminder = require('../models/Reminder');
const Medication = require('../models/Medication');
const { sendEmail } = require('./emailService');

// basic send notification (email) and mark sentAt
async function sendReminder(reminder) {
  // load medication & user
  await reminder.populate('medicationId').execPopulate?.();
  const med = await Medication.findById(reminder.medicationId);
  // In production: send push notification via web push or firebase
  // Here: send email (if user has email)
  const subject = `Reminder: take ${med.name}`;
  const text = `Time to take ${med.name} - ${med.dosage}. Scheduled: ${new Date(reminder.scheduledTime).toLocaleString()}`;
  try {
    await sendEmail(reminder.userIdEmail || 'unknown@example.com', subject, text);
  } catch (e) {
    console.warn('sendReminder email failed:', e.message);
  }
  reminder.status = 'sent';
  reminder.sentAt = new Date();
  await reminder.save();
}

module.exports = { sendReminder };
