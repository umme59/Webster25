const mongoose = require('mongoose');

const doseLogSchema = new mongoose.Schema({
  reminderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taken: { type: Boolean, required: true },
  timeTaken: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('DoseLog', doseLogSchema);
