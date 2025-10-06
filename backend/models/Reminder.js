const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledTime: { type: Date, required: true },
  status: { type: String, enum: ['pending','sent','completed','missed'], default: 'pending' },
  sentAt: { type: Date },
  acknowledgedAt: { type: Date }
}, { timestamps: true });

reminderSchema.index({ userId: 1, scheduledTime: 1 });

module.exports = mongoose.model('Reminder', reminderSchema);
