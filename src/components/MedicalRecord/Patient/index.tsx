import { FiEdit } from "react-icons/fi";
import { usePatient } from "../../../hooks/usePatients";
import AppointmentLoader from "../../SkeletonLoaders/AppointmentLoader";
import { useModal } from "../../../context/ModalContext";
import Header from "../../Header";
import ExamsHistoric from "./ExamsHistoric";

interface PatientProps {
  id: string;
}

const Patient = ({ id }: PatientProps) => {
  const { data: patient, isLoading: isLoadingPatient } = usePatient(id);

  const { openModal, setOptionId, setPatientId, setAppointmentId } = useModal();

  const handleOptionClick = (optionId: string, patientId: string) => {
    if (patient) {
      setOptionId(optionId);
      setPatientId(patientId);
      setAppointmentId(id);
      openModal();
    }
  };

  const handleDate = (date: string) => {
    const newDate = date.split("-");

    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  };

  return (
    <>
      <Header />
      {isLoadingPatient && (
        <div className="w-full h-full mb-[20px]">
          <AppointmentLoader />
        </div>
      )}

      {!isLoadingPatient && !isLoadingPatient && patient && (
        <div
          className="
              flex
              flex-col
              gap-[16px]
              "
        >
          <div
            className="
              bg-white
                rounded-[4px]
                h-[160px]
                flex
                flex-col
                gap-[12px]
                "
          >
            <div className="flex justify-between pt-[20px] px-[20px]">
              <div className="gap-[12px] flex flex-col">
                <div className="flex items-center">
                  <span className="text-[20px] 2xl:text-[32px] text-label">
                    {patient.full_name}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-[12px]
                    text-label
                    text-[14px]
                    2xl:text-[16px]
                    "
                >
                  <span className="font-[500]">
                    CPF: <span className="font-[400]">{patient.cpf}</span>
                  </span>
                  <span className="font-[500]">
                    Cel: <span className="font-[400]">{patient.phone} </span>
                  </span>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-[12px]
                    text-label
                    text-[14px]
                    2xl:text-[16px]
                    "
                >
                  <span className="font-[500]">
                    Data de Nascimento:{" "}
                    <span className="font-[400]">
                      {patient.birth ? handleDate(patient.birth) : ""}
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="flex items-center border boerder-[#C0C0C0] rounded-[4px] px-[16px] py-[8px] gap-[8px]"
                  onClick={() =>
                    handleOptionClick("2.1", patient.id.toString())
                  }
                >
                  <FiEdit className="text-[20px] 2xl:text-[24px]" />
                  <span className="text-label text-[18px]">Alterar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-[16px] min-h-[600px] h-[calc(100vh-220px)] w-full mb-[20px]">
            <ExamsHistoric patientId={id} />
          </div>
        </div>
      )}
    </>
  );
};

export default Patient;
