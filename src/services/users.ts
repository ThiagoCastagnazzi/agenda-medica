import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface User {
  email: string;
  password: string;
}

export const createUserFirebase = async (user: User) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return userCredential;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUserFirebase = async (userUpdates: User) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  try {
    if (userUpdates.password) {
      await updatePassword(currentUser, userUpdates.password);
    }

    return currentUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};
