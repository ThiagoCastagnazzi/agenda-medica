import api from '@/services/api';
import { PatientResponse, PatientsResponse } from '@/types/Patients';
import { useQuery } from '@tanstack/react-query';

interface UsePatientsProps {
  pageNumber?: number;
  text?: string;
  patientsPerPage?: number;
}

const fetchPatients = async (
  pageNumber: number,
  text: string,
  patientsPerPage: number,
) => {
  const textIsNumber = /^\d+$/.test(text);

  if (textIsNumber) {
    const res = await api.get(
      `/patients?page=${pageNumber}&per_page=${patientsPerPage}&cpf=${text}`,
    );

    const newReponse = {
      data: res.data.data,
      meta: res.data.meta,
    };

    return newReponse as PatientsResponse;
  } else {
    const res = await api.get(
      `/patients?page=${pageNumber}&per_page=${patientsPerPage}&full_name=${text}`,
    );

    const newReponse = {
      data: res.data.data,
      meta: res.data.meta,
    };

    return newReponse as PatientsResponse;
  }
};

export function usePatients({
  pageNumber,
  text,
  patientsPerPage,
}: UsePatientsProps) {
  const newPageNumber = pageNumber ? pageNumber : 1;
  const newPatientsPerPage = patientsPerPage ? patientsPerPage : 50;
  const newText = text ? text : '';
  return useQuery({
    queryKey: ['patients', pageNumber],
    queryFn: () => fetchPatients(newPageNumber, newText, newPatientsPerPage),
  });
}

export function usePatient(id: string | undefined) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      if (id) {
        const res = await api.get(`/patients/${id}`);
        return res.data.data as PatientResponse;
      } else {
        return null;
      }
    },
  });
}
