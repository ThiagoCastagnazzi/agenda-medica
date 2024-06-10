import api from './api';
import { MedicalRecordPOST, MedicalRecordPUT } from '@/types/MedicalRecords';

export const createMedicalRecordApi = async (
  medicalRecord: MedicalRecordPOST,
) => {
  const response = await api.post('/medical_records', medicalRecord);

  return response.data;
};

export const updateMedicalRecordApi = async (
  id: string,
  medicalRecord: MedicalRecordPUT,
) => {
  const response = await api.put(`/medical_records/${id}`, medicalRecord);

  return response.data;
};
