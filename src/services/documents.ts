import { DocumentPOST } from '@/types/Documents';
import api from './api';

export const createDocumentApi = async (document: DocumentPOST) => {
  const response = await api.post('/documents', document);

  return response.data;
};

export const updateDocumentApi = async (document: DocumentPOST, id: string) => {
  const response = await api.put(`/documents/${id}`, document);

  return response.data;
};
