import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const query = await getDocs(collection(firestore, "appointments"));
      const appointments = [] as any[];
      query.forEach((doc) => {
        appointments.push({ id: doc.id, ...doc.data() });
      });
      return appointments;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

const fetchAppointment = async (id: string) => {
  try {
    const query = doc(firestore, "appointments", id);
    const appointments = await getDoc(query);
    if (appointments.exists()) {
      return { id: appointments.id, ...appointments.data() };
    } else {
      throw new Error("Appointment not found");
    }
  } catch (error: any) {
    throw new Error("Error fetching appointment: " + error?.message);
  }
};

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: () => fetchAppointment(id),
    enabled: !!id,
  });
};
