// Stubbed Google Calendar service; implement OAuth and token refresh in production
async function syncEventForMedication(user, medication, reminders) {
  // reminders: array of { scheduledTime, reminderId }
  console.log('calendarService.syncEventForMedication - stub', {
    user: user.email,
    medication: medication.name,
    remindersCount: reminders.length
  });
  // TODO: use googleapis package, OAuth2, create events
  return true;
}

module.exports = { syncEventForMedication };
