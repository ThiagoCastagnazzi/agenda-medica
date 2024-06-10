import { Patient } from '@/types/Patients';
import api from './api';

export const createPatientApi = async (patient: Patient) => {
  const response = await api.post('/patients', patient);

  return response.data;
};

export const updatePatientApi = async (id: string, patient: Patient) => {
  const response = await api.put(`/patients/${id}`, patient);

  return response.data;
};

export const toggleStatusPatientApi = async (id: string, status: boolean) => {
  const response = await api.patch(`/patients/${id}/update_status`, {
    status,
  });

  return response.data;
};
