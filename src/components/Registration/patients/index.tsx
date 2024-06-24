import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-hot-toast";

import { IoCloseOutline, IoCheckmarkOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import { useState, useMemo, useEffect } from "react";

import Spinner from "../../Spinner";
import { usePatient, usePatients } from "../../../hooks/usePatients";
import { useAppointments } from "../../../hooks/useAppointments";
import { Patient } from "../../../types/Patients";
import ModalTemplate from "../../Modals/ModalTemplate";
import {
  createPatientFirebase,
  updatePatientFirebase,
} from "../../../services/patients";

interface PatientsProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  patientId: string;
}

const createPatient = yup.object().shape({
  full_name: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
  birth: yup.string().required("Campo obrigatório"),
  rg: yup.string().required("Campo obrigatório"),
  phone: yup.string().required("Campo obrigatório"),
});

const Patients = ({ type, isOpen, onClose, patientId }: PatientsProps) => {
  const { data: patient, refetch: refetchPatient } = usePatient(patientId);
  const { refetch } = usePatients();
  const { refetch: refetchAppointments } = useAppointments();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Patient>({
    resolver: yupResolver(createPatient),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const format_data = useMemo(
    () => (values: Patient) => {
      return {
        full_name: values.full_name,
        cpf: values.cpf.replace(/\D/g, ""),
        rg: values.rg ? values.rg.replace(/\D/g, "") : "",
        birth: values.birth,
        phone: values.phone ? values.phone.replace(/\D/g, "") : "",
      };
    },
    []
  );

  const format_data_edit = useMemo(
    () => (values: Patient) => {
      return {
        full_name: values.full_name,
        cpf: values.cpf.replace(/\D/g, ""),
        rg: values.rg ? values.rg.replace(/\D/g, "") : "",
        birth: values.birth,
        phone: values.phone ? values.phone.replace(/\D/g, "") : "",
      };
    },
    []
  );

  const handleClose = () => {
    setValue("full_name", "");
    setValue("cpf", "");
    setValue("rg", "");
    setValue("birth", "");
    setValue("phone", "");

    refetch();
    refetchAppointments();
    onClose();

    setLoading(false);

    if (type === "edit") {
      refetchPatient();
    }
  };

  const onSubmit: SubmitHandler<Patient> = async (data) => {
    if (data) {
      const newData = format_data(data);

      setLoading(true);

      if (type === "new") {
        try {
          await createPatientFirebase(newData as Patient);
          toast.success("Paciente criado com sucesso");
          handleClose();
        } catch (error) {
          toast.error("Erro ao criar paciente");
        }
      } else {
        const newDataEdit = format_data_edit(data);
        try {
          await updatePatientFirebase(patientId, newDataEdit);
          toast.success("Paciente atualizado com sucesso");
          handleClose();
        } catch (error) {
          toast.error("Erro ao atualizar paciente");
        }
      }
    }
  };

  useEffect(() => {
    const handleSetValue = (patient: Patient) => {
      if (patient) {
        setValue("full_name", patient.full_name ? patient.full_name : "");
        setValue("cpf", patient.cpf ? patient.cpf : "");
        setValue("rg", patient.rg ? patient.rg : "");
        setValue("birth", patient.birth ? patient.birth : "");
        setValue("phone", patient.phone ? patient.phone : "");
      }
    };

    if (type === "edit" && patientId) {
      if (patient) {
        handleSetValue(patient);
      }
    }
  }, [type, patientId, refetchPatient, patient, setValue]);

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
              w-[80vw]
              max-w-[1140px]
              h-[80vh]
              max-h-[500px]
              flex
              flex-col
              gap-[20px]
              p-[20px]
              text-label
              "
            >
              <div className="border-b-[1px] border-[#C0C0C0] pb-[20px] flex justify-between">
                <span className="text-[22px] font-medium text-label pb-[7px]">
                  {
                    {
                      new: "Cadastrar Paciente",
                      edit: "Editar Paciente",
                    }[type]
                  }
                </span>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="self-start"
                >
                  <IoMdClose size={24} color="#344054" />
                </button>
              </div>

              <div className="h-[670px] overflow-auto flex flex-col gap-[20px] no-scrollbar pb-[20px]">
                <div className="flex flex-col gap-[20px]">
                  <div
                    className="
                  flex
                  items-center
                  gap-[20px]
                  "
                  >
                    <div className="flex flex-col gap-[8px] w-full relative">
                      <label
                        htmlFor="full_name"
                        className="text-[16px] font-medium"
                      >
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        placeholder="Nome do Paciente"
                        className={`
                          border-[1px]
                        border-[#344054]
                        rounded-[4px]
                        p-[8px]
                        text-label
                        outline-none
                        ${
                          errors.full_name
                            ? "border-red-500"
                            : "border-[#344054]"
                        }
                          `}
                        {...register("full_name")}
                      />
                      {errors.full_name && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          Campo obrigatório
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-[20px]
                    "
                  >
                    <div className="flex flex-col gap-[8px] w-full relative">
                      <label htmlFor="cpf" className="text-[16px] font-medium">
                        CPF
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        placeholder="Informe o CPF"
                        className={`
                          border-[1px]
                        border-[#344054]
                        rounded-[4px]
                        p-[8px]
                        text-label
                        outline-none
                        ${errors.cpf ? "border-red-500" : "border-[#344054]"}
                          `}
                        {...register("cpf")}
                      />
                      {errors.cpf && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          Campo obrigatório
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-[8px] w-full relative">
                      <label htmlFor="rg" className="text-[16px] font-medium">
                        RG
                      </label>
                      <input
                        type="text"
                        id="rg"
                        placeholder="Informe o RG"
                        className={`
                          border-[1px]
                        border-[#344054]
                        rounded-[4px]
                        p-[8px]
                        text-label
                        outline-none
                        ${errors.rg ? "border-red-500" : "border-[#344054]"}
                          `}
                        {...register("rg")}
                      />
                      {errors.rg && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          Campo obrigatório
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-[20px]
                    "
                  >
                    <div className="flex flex-col gap-[8px] w-full relative">
                      <label
                        htmlFor="cell_phone"
                        className="text-[16px] font-medium"
                      >
                        Celular
                      </label>
                      <input
                        type="text"
                        id="cell_phone"
                        placeholder="Informe o Número"
                        className={`
                          border-[1px]
                        border-[#344054]
                        rounded-[4px]
                        p-[8px]
                        text-label
                        outline-none
                        ${errors.phone ? "border-red-500" : "border-[#344054]"}
                          `}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          Campo obrigatório
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-[8px] w-full relative">
                      <label
                        htmlFor="birth"
                        className="text-[16px] font-medium"
                      >
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        id="birth"
                        placeholder="Informe a Data"
                        className={`
                          border-[1px]
                        border-[#344054]
                        rounded-[4px]
                        p-[8px]
                        text-label
                        outline-none
                        ${errors.birth ? "border-red-500" : "border-[#344054]"}
                          `}
                        {...register("birth")}
                      />
                      {errors.birth && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          Campo obrigatório
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full gap-[32px] border-t border-[#C0C0C0] pt-[20px]">
                <button
                  type="button"
                  className="
                bg-white
                text-[#1B509A]
                rounded-[4px]
                p-[8px]
                border
                border-[#1B509A]
                flex
                items-center
                justify-center
                w-[130px]
                gap-[8px]
                font-[700]
                text-[16px]
                "
                  onClick={() => handleClose()}
                >
                  <IoCloseOutline size={24} color="#1B509A" />
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="
                bg-[#1B509A]
                text-white
                rounded-[4px]
                p-[8px]
                flex
                items-center
                justify-center
                w-[130px]
                gap-[8px]
                font-[700]
                text-[16px]
                "
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <IoCheckmarkOutline size={24} color="#fff" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </ModalTemplate>
      )}
    </>
  );
};

export default Patients;
