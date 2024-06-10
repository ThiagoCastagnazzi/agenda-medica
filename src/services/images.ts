import api from './api';

export const createImageAPI = async (image: any) => {
  const response = await api.post('/imaging_examinations', image);

  return response.data;
};
