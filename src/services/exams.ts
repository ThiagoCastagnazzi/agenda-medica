import { collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const createExamFirebase = async (exam: any) => {
  try {
    const docRef = await addDoc(collection(firestore, "exams"), exam);
    return { id: docRef.id, ...exam };
  } catch (error) {
    throw new Error("Error adding document: " + error);
  }
};

export const updateExamFirebase = async (id: string, exam: any) => {
  try {
    await setDoc(doc(firestore, "exams", id), exam);
    return { id, ...exam };
  } catch (error: any) {
    throw new Error("Error updating patient: " + error.message);
  }
};

export const deleteExamFirebase = async (examId: string) => {
  try {
    await deleteDoc(doc(firestore, "exams", examId));
  } catch (error) {
    throw new Error("Error adding document: " + error);
  }
};
