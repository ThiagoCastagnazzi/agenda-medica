import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";

import { FiX } from "react-icons/fi";

import toast from "react-hot-toast";
import { useExams } from "../../../hooks/useExams";
import { usePatient } from "../../../hooks/usePatients";
import {
  createExamFirebase,
  updateExamFirebase,
} from "../../../services/exams";
import ModalTemplate from "../ModalTemplate";
import Spinner from "../../Spinner";

interface EmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  patientId: string;
  isEditing: boolean;
  editExam?: {
    id: string;
    description: string;
  };
}

const emitSchema = yup.object().shape({
  exams: yup.string().required("Campo obrigatório"),
});

interface EmitFormData {
  exams: string;
}

const EmitModal = ({
  type,
  isOpen,
  onClose,
  patientId,
  isEditing,
  editExam,
}: EmitModalProps) => {
  const [loading, setLoading] = useState(false);

  const { refetch } = useExams(patientId);

  const { data: patient } = usePatient(patientId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmitFormData>({
    resolver: yupResolver(emitSchema),
  });

  const onSubmit: SubmitHandler<EmitFormData> = async (data) => {
    setLoading(true);
    try {
      const exam = {
        description: data.exams,
        patient_id: patientId,
        created_at: new Date().toISOString().split("T")[0],
      };

      if (!isEditing) {
        const newExam = {
          ...exam,
          created_at: new Date().toISOString().split("T")[0],
        };
        const response = await createExamFirebase(newExam);

        if (response) {
          toast.success("Exame emitido com sucesso!");

          setValue("exams", "");
          onClose();
        }
      } else {
        const response = await updateExamFirebase(editExam?.id as string, exam);

        if (response) {
          toast.success("Exame atualizado com sucesso!");

          setValue("exams", "");
          onClose();
        }
      }
    } catch (error) {
      toast.error("Erro ao emitir!");
    } finally {
      setLoading(false);

      refetch();
    }
  };

  useEffect(() => {
    const handleSetValues = () => {
      if (editExam) {
        setValue("exams", editExam.description);
      }
    };

    handleSetValues();
  }, [editExam, isEditing, setValue]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <ModalTemplate>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="
            bg-white
            rounded-[4px]
            drop-shadow-md
            w-[800px]
            h-[90vh]
            max-h-[800px]
            flex
            flex-col
            gap-[20px]
            p-[20px]
            text-label
            "
            >
              <div className="flex justify-between border-b-[1px] pb-[20px] border-[#C0C0C0]">
                <h2 className="text-[22px] font-medium">
                  {isEditing && type === "exam"
                    ? `Editar Exame - ${patient?.full_name}`
                    : `Solicitação de Exame - ${patient?.full_name}`}
                </h2>
                <button onClick={onClose} className="self-start">
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-[32px] h-[100%]">
                <div className="flex flex-col gap-[12px] h-[100%] relative">
                  <label htmlFor="exams" className="text-[22px] font-medium">
                    {
                      {
                        exam: "Exames:",
                        recipe: "Medicamentos:",
                      }[type]
                    }
                  </label>
                  <textarea
                    id="exams"
                    className={`
                    border-[1px]
                    border-[#C0C0C0]
                    rounded-[4px]
                    p-[8px]
                    h-[100%]
                    w-[100%]
                    overflow-auto
                    resize-none
                    ${
                      type === "exam" && errors.exams
                        ? "border-red-500"
                        : "border-[#C0C0C0]"
                    }
                    `}
                    placeholder="Digite aqui..."
                    {...register("exams")}
                  />
                  {errors.exams && (
                    <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                      {errors.exams.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-[20px] border-t border-[#C0C0C0] pt-[20px]">
                <button
                  className="
                text-[#1B509A]
                bg-white
                rounded-[4px]
                border
                border-[#1B509A]
                px-[16px]
                w-[120px]
                h-[44px]
                text-[20px]
                "
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="
                text-white
                bg-[#1B509A]
                rounded-[4px]
                px-[16px]
                w-[120px]
                h-[44px]
                text-[20px]
                "
                  disabled={loading}
                >
                  {loading ? <Spinner /> : <>Salvar</>}
                </button>
              </div>
            </div>
          </form>
        </ModalTemplate>
      )}
    </>
  );
};

export default EmitModal;
