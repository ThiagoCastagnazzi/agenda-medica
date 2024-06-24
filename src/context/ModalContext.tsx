import { ReactNode, createContext, useContext, useState } from "react";
import MedicalConsultModal from "../components/Modals/MedicalConsultModal";
import Patients from "../components/Registration/patients";
import UserModal from "../components/Modals/UserModal";

interface ModalContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setOptionId: (optionId: string) => void;
  setPatientId: (patientId: string) => void;
  setAppointmentId: (appointmentId: string) => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionId, setOptionId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        setOptionId,
        setPatientId,
        setAppointmentId,
      }}
    >
      {children}
      {isOpen && optionId === "1" && (
        <MedicalConsultModal
          type="new"
          id=""
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}

      {isOpen && optionId === "1.1" && (
        <MedicalConsultModal
          type="edit"
          id={appointmentId}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}

      {isOpen && optionId === "2" && (
        <Patients
          isOpen={isOpen}
          onClose={closeModal}
          patientId=""
          type="new"
        />
      )}

      {isOpen && optionId === "2.1" && (
        <Patients
          isOpen={isOpen}
          onClose={closeModal}
          type="edit"
          patientId={patientId}
        />
      )}

      {isOpen && optionId === "3" && (
        <UserModal isOpen={isOpen} onClose={closeModal} type="new" />
      )}

      {isOpen && optionId === "3.1" && (
        <UserModal isOpen={isOpen} onClose={closeModal} type="edit" />
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};
