import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineFileCopy } from "react-icons/md";
import { useExams } from "../../../../hooks/useExams";
import MedicalReportLoader from "../../../SkeletonLoaders/MedicalReportLoader";
import Spinner from "../../../Spinner";
import EmitModal from "../../../Modals/EmitModal";
import { FaTrash } from "react-icons/fa";
import { deleteExamFirebase } from "../../../../services/exams";
import ModalConfirm from "../../../Modals/ModalConfirm";
import toast from "react-hot-toast";

interface ExamsHistoricProps {
  patientId: string;
}

const ExamsHistoric = ({ patientId }: ExamsHistoricProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [exam, setExam] = useState({
    id: "",
    description: "",
  });
  const {
    data: exams,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useExams(patientId);

  const handleDate = (date: string) => {
    const newDate = date.split("T");

    const newDate2 = newDate[0].split("-").reverse().join("/");

    return newDate2;
  };

  return (
    <>
      {isLoading && <MedicalReportLoader />}

      {isError && (
        <div className="bg-white w-full rounded-[4px]">
          <span className="text-[20px] text-[#1B509A] p-[20px] block">
            Erro ao carregar Exames
          </span>
        </div>
      )}

      {!isLoading && !isError && (
        <div
          className="
            bg-white
            rounded-[4px]
            flex
            flex-col
            w-full
            h-full
            overflow-auto
            p-[20px]
          "
        >
          <div className="flex justify-between mb-[40px] px-[32px] mr-[10px]">
            <button className="text-label font-medium text-[18px] 2xl:text-[22px] pb-[3px] h-[44px] border-b-[3px] border-white flex items-center">
              Histórico de Exames
              {isFetching && <Spinner className="ml-[10px]" />}
            </button>
            <button
              className="text-white px-[16px] bg-[#1B509A] flex gap-[8px] items-center rounded-[4px] w-[200px] h-[35px] 2xl:w-[240px] 2xl:h-[44px] justify-center"
              onClick={() => {
                setExam({
                  id: "",
                  description: "",
                });
                setIsEditing(false);
                setIsOpen(true);
              }}
            >
              <FiPlus className="text-[18px] 2xl:text-[22px] text-primary" />
              <span className="text-[16px] 2xl:text-[20px] font-medium">
                Emitir Exame
              </span>
            </button>
          </div>

          <div
            className="
              flex
              flex-col
              gap-[20px]
              overflow-x-auto
              h-full
              "
          >
            {exams?.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full">
                <img
                  src="/sem_historico_consulta.svg"
                  alt="Sem Histórico Consultas"
                  className="w-[260px] h-[180px] 2xl:w-[342px] 2xl:h-[258px]"
                />
                <span className="text-[#C0C0C0] text-[18px] 2xl:text-[22px] font-medium">
                  Este paciente ainda não tem exames
                </span>
              </div>
            ) : (
              <>
                <div
                  className="
                  grid
                  grid-cols-7
                  gap-[20px]
                  text-label
                  text-[18px]
                  2xl:text-[22px]
                  px-[20px]
                "
                >
                  <span>Código</span>
                  <span>Exame</span>
                  <span>Data da Solicitação</span>
                  <span className="text-end pr-[50px]">Ações</span>
                </div>
                <div
                  className="
                flex
                flex-col
                gap-[20px]
                h-[100%]
                overflow-auto
                pr-[10px]
              "
                >
                  {exams?.map((exam) => (
                    <div
                      key={exam.id}
                      className="
                      grid
                      grid-cols-7
                      gap-[20px]
                      text-label
                      text-[16px]
                      2xl:text-[20px]
                      py-[20px]
                      2xl:py-[29px]
                      px-[20px]
                      border-[1px]
                      border-[#344054]
                      rounded-[4px]
                      items-center
                    "
                    >
                      <span
                        className="
                        ml-[25px]
                        text-[#1B509A]
                        truncate
                      "
                      >
                        {exam.id}
                      </span>
                      <div className="flex items-center gap-[8px]">
                        <span
                          className="
                          w-[200px]
                          truncate
                          "
                        >
                          {exam.description.split("\n")
                            ? exam.description.split("\n")[0]
                            : ""}
                        </span>
                        {exam.description.split("\n").length > 1 && (
                          <div className="rounded-full bg-[#EFF8FE] flex items-center justify-center text-[#1B509A] w-[52px] h-[24px] px-[4px]">
                            <span>
                              + {exam.description.split("\n").length - 1}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="ml-[10px] 2xl:ml-[15px]">
                        {exam.created_at ? handleDate(exam.created_at) : ""}
                      </span>
                      <div className="flex items-center gap-[16px] justify-end pr-[35px]">
                        <button
                          onClick={() => {
                            setExam({
                              id: exam.id,
                              description: exam.description,
                            });
                            setIsEditing(true);
                            setIsOpen(true);
                          }}
                        >
                          <MdOutlineFileCopy className="text-[20px] 2xl:text-[24px]" />
                        </button>
                        <button
                          onClick={() => {
                            setExam({
                              id: exam.id,
                              description: exam.description,
                            });
                            setModalConfirmIsOpen(true);
                          }}
                        >
                          <FaTrash className="text-[20px] 2xl:text-[24px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <EmitModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type="exam"
          patientId={patientId}
          isEditing={isEditing}
          editExam={exam}
        />
      )}

      {modalConfirmIsOpen && (
        <ModalConfirm
          isOpen={modalConfirmIsOpen}
          onClose={() => setModalConfirmIsOpen(false)}
          action={() => {
            setLoading(true);
            deleteExamFirebase(exam.id);
            setModalConfirmIsOpen(false);
            refetch();
            toast.success("Exame excluído com sucesso");
            setLoading(false);
          }}
          loading={loading}
        />
      )}
    </>
  );
};

export default ExamsHistoric;
