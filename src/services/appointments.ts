import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const createAppointmentFirebase = async (appointmentData: any) => {
  try {
    const docRef = await addDoc(
      collection(firestore, "appointments"),
      appointmentData
    );
    return docRef.id;
  } catch (error) {
    throw new Error("Error adding document: " + error);
  }
};

export const updateAppointmentFirebase = async (
  id: string,
  appointmentData: any
) => {
  try {
    await setDoc(doc(firestore, "appointments", id), appointmentData);
    return true;
  } catch (error) {
    throw new Error("Error updating document: " + error);
  }
};
