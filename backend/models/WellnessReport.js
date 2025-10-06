const mongoose = require('mongoose');

const wellnessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adherenceRate: { type: Number, default: 0 },
  missedDosesCount: { type: Number, default: 0 },
  trendData: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('WellnessReport', wellnessSchema);
