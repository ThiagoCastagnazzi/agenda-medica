import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const query = await getDocs(collection(firestore, "patients"));
      const patients = [] as any[];
      query.forEach((doc) => {
        patients.push({ id: doc.id, ...doc.data() });
      });
      return patients;
    },
  });
}

const fetchPatient = async (id: string) => {
  try {
    const query = doc(firestore, "patients", id);
    const patient = await getDoc(query);
    if (patient.exists()) {
      return { id: patient.id, ...patient.data() } as any;
    } else {
      throw new Error("Patient not found");
    }
  } catch (error: any) {
    throw new Error("Error fetching patient: " + error.message);
  }
};

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
}
