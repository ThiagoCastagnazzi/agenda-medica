import { Refraction, RefractionPOST } from '@/types/Refractions';
import api from './api';

export const createRefractionApi = async (refraction: RefractionPOST) => {
  const response = await api.post('/refractions', refraction);

  return response.data;
};

export const updateRefractionApi = async (
  refraction: RefractionPOST,
  id: string,
) => {
  const response = await api.put(`/refractions/${id}`, refraction);

  return response.data;
};

export const getRefractions = async () => {
  const response = await api.get('/refractions');

  return response.data as Refraction[];
};
