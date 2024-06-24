import { useEffect, useState } from "react";

import { FiCheckSquare, FiX } from "react-icons/fi";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ModalTemplate from "../ModalTemplate";
import SelectPatient from "./SelectPatient";
import toast from "react-hot-toast";
import {
  useAppointment,
  useAppointments,
} from "../../../hooks/useAppointments";
import {
  createAppointmentFirebase,
  updateAppointmentFirebase,
} from "../../../services/appointments";
import Spinner from "../../Spinner";

interface MedicalConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "new" | "edit";
  id: string;
}

interface Inputs {
  date: string;
  time: string;
  observations?: string;
}

const createMedicalConsult = yup.object().shape({
  date: yup.string().required("Informe a data da consulta"),
  time: yup.string().required("Informe o horário"),
  observations: yup.string(),
});

export default function MedicalConsultModal({
  isOpen,
  onClose,
  type,
  id,
}: MedicalConsultModalProps) {
  const [patientId, setPatientId] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const { data: appointment, refetch: refetchAppointment } = useAppointment(id);
  const { refetch: refetchAppointments } = useAppointments();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectIsNotNull, setSelectIsNotNull] = useState({
    patient: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(createMedicalConsult),
  });

  const clearInputs = () => {
    setValue("date", "");
    setValue("time", "");
    setValue("observations", "");
  };

  const handleCloseModal = () => {
    clearInputs();
    onClose();
  };

  const hnadleSelectPatientId = (id: string) => {
    setPatientId(id);
  };

  const handleSelectPatientName = (name: string) => {
    setPatientName(name);
  };

  const verifyIfWeekend = (date: Date) => {
    const day = date.getDay() + 1;
    return day === 6 || day === 7;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    if (patientId === "" || patientId === undefined) {
      setSelectIsNotNull({ ...selectIsNotNull, patient: true });
      setLoading(false);
      return;
    }

    if (data.time > "18:00" || data.time < "07:00") {
      toast.error("Horário inválido!");
      setLoading(false);
      return;
    }

    const appointmentDate = new Date(data.date);

    if (verifyIfWeekend(appointmentDate)) {
      toast.error("Não é possível agendar consultas aos sábados ou domingos!");
      setLoading(false);
      return;
    }

    const newData = {
      event_date: data.date,
      event_time: data.time,
      patient_id: patientId,
      patient_name: patientName,
    };

    try {
      if (type === "new") {
        await createAppointmentFirebase(newData as any);
        toast.success("Consulta agendada com sucesso!");

        refetchAppointment();
        handleCloseModal();

        clearInputs();

        refetchAppointments();
      }

      if (type === "edit") {
        await updateAppointmentFirebase(id, newData);
        toast.success("Consulta editada com sucesso!");
        refetchAppointment();
        handleCloseModal();

        clearInputs();

        refetchAppointments();
      }
    } catch (error) {
      toast.error("Erro ao agendar consulta!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "new") {
      setValue("date", new Date().toISOString().split("T")[0]);
    }
  }, [type, setValue]);

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

  useEffect(() => {
    if (type === "edit" && appointment) {
      const { patient_name, patient_id, event_date, event_time, notes } =
        appointment as any;

      if (patient_id && patient_name && event_date && event_time) {
        setPatientId(patient_id.toString());
        setPatientName(patient_name);

        setValue("date", event_date);
        setValue("time", event_time);
        setValue("observations", notes);
      }
    }
  }, [appointment, type, setValue]);

  return (
    <>
      <div>
        {isOpen && (
          <ModalTemplate>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="
            bg-white
            rounded-[4px]
            w-[670px]
            h-[80vh]
            max-h-[720px]
            flex
            flex-col
            gap-[20px]
            p-[20px]
            text-label
            "
              >
                <div className="flex justify-between">
                  <button className="w-[180px] h-[55px] text-[18px] bg-[#F9FAFB]">
                    <span className="bg-white p-[10px]">
                      {type === "new" ? "Agendar Consulta" : "Editar Consulta"}
                    </span>
                  </button>
                  <button onClick={onClose} className="self-start">
                    <FiX size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-[20px] h-[100%] overflow-auto no-scrollbar mb-[20px]">
                  <SelectPatient
                    register={register}
                    patientId={patientId}
                    hnadleSelectPatientId={hnadleSelectPatientId}
                    handleSelectPatientName={handleSelectPatientName}
                    selectIsNull={selectIsNotNull.patient}
                  />
                  <div className="flex items-center gap-[20px]">
                    <div className="flex flex-col w-[50%] gap-[8px] relative">
                      <label
                        htmlFor="consultDate"
                        className="text-[16px] font-medium"
                      >
                        Data da Consulta
                      </label>
                      <input
                        id="consultDate"
                        type="date"
                        className={`
                        border-[1px]
                        border-[#C0C0C0]
                        rounded-[4px]
                        p-[8px]
                        outline-none
                        ${errors.date ? "border-red-500" : "border-[#344054]"}`}
                        {...register("date")}
                      />
                      {errors.date && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          {errors.date.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-[50%] gap-[8px] relative">
                      <label htmlFor="time" className="text-[16px] font-medium">
                        Horário
                      </label>
                      <input
                        id="time"
                        type="time"
                        className={`
                        border-[1px]
                        border-[#C0C0C0]
                        rounded-[4px]
                        p-[8px]
                        outline-none
                        ${errors.time ? "border-red-500" : "border-[#344054]"}
                        `}
                        {...register("time")}
                      />
                      {errors.time && (
                        <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
                          {errors.time.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] pb-[8px]">
                    <label
                      htmlFor="observations"
                      className="text-[16px] font-medium"
                    >
                      Observações
                    </label>
                    <textarea
                      id="observations"
                      className="
                      border-[1px]
                      border-[#C0C0C0]
                      rounded-[4px]
                      p-[8px]
                      h-[120px]
                      outline-none
                      "
                      placeholder="Digite aqui..."
                      {...register("observations")}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-[20px] border-t border-[#C0C0C0] pt-[20px]">
                  <button
                    className="
                  bg-gray-50
                  text-[#1B509A]
                  rounded-[4px]
                  border
                  border-[#1B509A]
                  w-[120px]
                  text-[20px]
                  px-[16px]
                  h-[44px]
                  "
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="
                  bg-[#1B509A]
                  text-white
                  rounded-[4px]
                  flex
                  items-center
                  justify-center
                  gap-[8px]
                  text-[20px]
                  px-[16px]
                  h-[44px]
                  "
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <FiCheckSquare size={24} color="white" />
                        <span> Agendar Consulta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </ModalTemplate>
        )}
      </div>
    </>
  );
}
