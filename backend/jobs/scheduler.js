const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const Medication = require('../models/Medication');
const { sendReminder } = require('../services/reminderService');
const DoseLog = require('../models/DoseLog');

/**
 * Scheduler: runs every minute, finds reminders scheduled ~now and sends notifications.
 * Mark reminders as missed after a grace period (e.g., 30 minutes) if not completed.
 */
function start() {
  // run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
      const inOneMinute = new Date(now.getTime() + 60 * 1000);

      // Find reminders scheduled within last 1 minute to next 1 minute and pending
      const reminders = await Reminder.find({
        scheduledTime: { $lte: inOneMinute },
        status: 'pending'
      }).limit(50);

      for (const rem of reminders) {
        // send notification (non-blocking)
        sendReminder(rem).catch(err => console.error('sendReminder err', err));
      }

      // Mark missed: those scheduled more than 30 minutes ago and still pending
      const thirtyMinsAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const missed = await Reminder.find({
        scheduledTime: { $lte: thirtyMinsAgo },
        status: 'pending'
      }).limit(100);
      for (const m of missed) {
        m.status = 'missed';
        await m.save();
        // auto-log as missed
        await DoseLog.create({
          reminderId: m._id,
          userId: m.userId,
          taken: false,
          timeTaken: new Date()
        });
      }
    } catch (err) {
      console.error('Scheduler error', err);
    }
  }, { timezone: 'UTC' });

  console.log('Scheduler started');
}

module.exports = { start };
