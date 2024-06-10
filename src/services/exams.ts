import { Exam, ExamPOST, ExamPUT } from '@/types/Exams';
import api from './api';

export const createExamApi = async (exam: ExamPOST[]) => {
  const response = await api.post('/exams', exam);

  return response.data;
};

export const updateExamApi = async (exam: ExamPUT, id: string) => {
  const response = await api.put(`/exams/${id}`, exam);

  return response.data;
};

export const getExamApi = async () => {
  const response = await api.get('/exams');

  return response.data as Exam[];
};
