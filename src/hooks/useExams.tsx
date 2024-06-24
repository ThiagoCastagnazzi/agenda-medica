import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export function useExams(id: string) {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const query = await getDocs(collection(firestore, "exams"));
      const exams = [] as any[];
      query.forEach((doc) => {
        exams.push({ id: doc.id, ...doc.data() });
      });
      const patientExams = exams.filter((exam) => exam.patient_id == id);
      return patientExams;
    },
  });
}

const fetchExam = async (id: string) => {
  try {
    const query = doc(firestore, "exam", id);
    const exam = await getDoc(query);
    if (exam.exists()) {
      return { id: exam.id, ...exam.data() } as any;
    } else {
      throw new Error("Exam not found");
    }
  } catch (error: any) {
    throw new Error("Error fetching exam: " + error.message);
  }
};

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => fetchExam(id),
    enabled: !!id,
  });
}
