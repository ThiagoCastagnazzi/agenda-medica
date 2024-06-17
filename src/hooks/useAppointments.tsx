import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await api.get(`/appointments`);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

const fetchAppointment = async (id: string) => {
  const res = await api.get(`/appointments/${id}`);

  return res.data.data;
};

export const useAppointment = (patient_id: string) => {
  return useQuery({
    queryKey: ["appointment", patient_id],
    queryFn: () => fetchAppointment(patient_id),
  });
};
