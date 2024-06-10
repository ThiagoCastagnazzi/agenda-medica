import { Appointment } from '@/types/Appointments';
import api from './api';

export const createAppointmentApi = async (appointment: Appointment) => {
  const response = await api.post('/appointments', appointment);

  return response.data;
};

export const updateAppointmentApi = async (
  id: string,
  appointment: Appointment,
) => {
  const response = await api.put(`/appointments/${id}`, appointment);

  return response.data;
};
