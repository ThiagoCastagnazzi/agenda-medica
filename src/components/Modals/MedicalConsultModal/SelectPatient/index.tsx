import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

import Select from "react-select";
import { useModal } from "../../../../context/ModalContext";
import { usePatient, usePatients } from "../../../../hooks/usePatients";

interface SelectPatientProps {
  register: any;
  patientId?: string;
  hnadleSelectPatientId(id: string | undefined): void;
  handleSelectPatientName(name: string): void;
  selectIsNull: boolean;
}

const SelectPatient = ({
  register,
  patientId,
  hnadleSelectPatientId,
  handleSelectPatientName,
  selectIsNull,
}: SelectPatientProps) => {
  const [searchText, setSearchText] = useState("");
  const [timer, setTimer] = useState(null);
  const [patient, setPatient] = useState(null);
  const { openModal, setOptionId } = useModal();
  const { data: patients, refetch, isRefetching } = usePatients();

  const handleReSearch = (text: string) => {
    setSearchText(text);

    clearTimeout(timer as any);

    const newTimer = setTimeout(() => {
      refetch();
    }, 500);

    setTimer(newTimer as any);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { data: patientData } = usePatient(patientId as string);

  const handleOpenNewPatientModal = () => {
    setOptionId("2");
    openModal();
  };

  const handleSelectPatient = (e: any) => {
    const patient = patients?.find((patient) => patient.id === e.value);

    setPatient({
      value: patient?.id,
      label: patient?.full_name,
    } as any);

    hnadleSelectPatientId(patient?.id);
    handleSelectPatientName(patient?.full_name);
  };

  useEffect(() => {
    if (patientId) {
      setPatient({
        value: patientData?.id,
        label: patientData?.full_name,
      } as any);
    }
  }, [patientId, patients, patientData]);

  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor="patient" className="text-[16px] font-medium">
        Paciente
      </label>
      <div className="flex items-center gap-[20px] w-full relative">
        <Select
          id="patient"
          className="w-full"
          {...register("patient")}
          options={patients?.map((patient) => ({
            value: patient.id,
            label: patient.full_name,
          }))}
          placeholder="Selecione um paciente"
          value={patient ? patient : null}
          onChange={(e: any) => {
            if (e) {
              handleSelectPatient(e);
            } else {
              setPatient(null);
              hnadleSelectPatientId(undefined);
            }
          }}
          inputValue={searchText}
          onInputChange={(e) => handleReSearch(e)}
          isClearable
          noOptionsMessage={() => {
            if (isRefetching) {
              return "Carregando...";
            } else {
              return "Nenhum paciente encontrado";
            }
          }}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            control: (base, state) => ({
              ...base,
              border: selectIsNull ? "1px solid #ff0000" : "1px solid #C9D5E2",
              zIndex: 999,
              boxShadow: "none",
              "&:hover": {
                border: state.isFocused
                  ? "1px solid #ff0000"
                  : "1px solid #C9D5E2",
              },
            }),
          }}
        />
        {selectIsNull && (
          <span className="text-[12px] text-red-500 absolute left-[5px] bottom-[-18px]">
            Campo obrigatório
          </span>
        )}

        <button
          className="bg-[#EFF8FE] text-[#1849A9] font-medium rounded-[4px] px-[16px] py-[7px] w-[130px] h-[40px] flex items-center gap-[8px] justify-center"
          onClick={handleOpenNewPatientModal}
        >
          <FiPlusCircle size={16} />
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default SelectPatient;
