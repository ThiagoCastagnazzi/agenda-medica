import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Patient } from "../types/Patients";
import { firestore } from "../firebase/firebase";

export const createPatientFirebase = async (patient: Patient) => {
  try {
    const docRef = await addDoc(collection(firestore, "patients"), patient);
    return { id: docRef.id, ...patient };
  } catch (error: any) {
    throw new Error("Error adding patient: " + error.message);
  }
};

export const updatePatientFirebase = async (id: string, patient: Patient) => {
  try {
    await setDoc(doc(firestore, "patients", id), patient);
    return { id, ...patient };
  } catch (error: any) {
    throw new Error("Error updating patient: " + error.message);
  }
};
