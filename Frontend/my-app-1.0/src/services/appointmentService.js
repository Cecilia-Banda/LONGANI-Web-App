export const appointmentService = {
  getAppointments: () => fetch('/api/appointments').then(r => r.json()),
  createAppointment: (data) =>
    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  updateAppointment: (id, data) =>
    fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  deleteAppointment: (id) =>
    fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    }),
};
