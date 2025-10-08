// AI prediction stub. Replace with actual model or a call to Google NLP + custom logic.
async function predictAdherenceRisk(userId) {
  // Dummy: returns random risk for demonstration
  const risk = Math.random() < 0.2 ? 'high' : 'low';
  const reasons = risk === 'high' ? ['misses evening doses'] : ['no risky pattern yet'];
  return { risk, reasons };
}

module.exports = { predictAdherenceRisk };
