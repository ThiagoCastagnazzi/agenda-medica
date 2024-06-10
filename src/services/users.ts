import { Doctor } from '@/types/Users';
import api from './api';
import { SecretariePOST, SecretariePUT } from '@/types/Secretaries';

export const createDoctorApi = async (user: Doctor) => {
  const response = await api.post('/doctors', user);

  return response.data;
};

export const updateDoctorApi = async (user: Doctor, id: any) => {
  const response = await api.put(`/doctors/${id}`, user);

  return response.data;
};

export const getDoctorByIdApi = async (id: number | undefined) => {
  const response = await api.get(`/doctors/${id}`);

  return response.data;
};

export const createReceptionistApi = async (user: SecretariePOST) => {
  const response = await api.post('/secretaries', user);

  return response.data;
};

export const updateSecretarieApi = async (user: SecretariePUT, id: any) => {
  const response = await api.put(`/secretaries/${id}`, user);

  return response.data;
};
