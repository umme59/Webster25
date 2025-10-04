export function getSchedules() {
  return JSON.parse(localStorage.getItem("schedules") || "[]");
}

export function saveSchedule(item) {
  const schedules = getSchedules();
  schedules.push(item);
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

export function deleteSchedule(index) {
  const schedules = getSchedules();
  schedules.splice(index, 1);
  localStorage.setItem("schedules", JSON.stringify(schedules));
}
