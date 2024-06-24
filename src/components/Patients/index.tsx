import PatientListLoader from "../SkeletonLoaders/PatientListLoader";

import { useEffect, useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import Header from "../Header";
import { useAppointments } from "../../hooks/useAppointments";

const Patients = () => {
  const [searchText, setSearchText] = useState("");
  const { data: appointments } = useAppointments();

  const { data: patients, isLoading, isError } = usePatients();

  const handleReSearch = (text: string) => {
    setSearchText(text);
  };

  const [patientsList, setPatientsList] = useState(
    patients?.filter((patient) =>
      patient.full_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const getFirstLetter = (name: string) => {
    return name.charAt(0);
  };

  useEffect(() => {
    setPatientsList(
      patients?.filter((patient) =>
        patient.full_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [patients, searchText]);

  const handleLastPatientAppointment = (id: string) => {
    if (appointments) {
      const lastAppointment = appointments?.filter(
        (appointment) => appointment.patient_id == id
      )[
        appointments?.filter((appointment) => appointment.patient_id == id)
          .length - 1
      ];

      return lastAppointment;
    }
  };

  return (
    <div className="w-full h-full">
      <Header />

      <div>
        {isError && (
          <div className="flex justify-center items-center">
            <h1 className="text-blue-500">Erro ao carregar pacientes</h1>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center">
            <PatientListLoader />
          </div>
        )}

        {!isError && !isLoading && (
          <div
            className="
            rounded-[4px]
            flex
            flex-col
            w-full
            pt-[20px]
            h-full
            overflow-auto
          "
          >
            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-label sr-only"
              >
                Buscar Paciente
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-[14px] h-[14px] 2xl:w-[17px] 2xl:h-[17px] text-[#C0C0C0]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-[400px] h-[40px] 2xl:w-[500px] 2xl:h-[48px] ps-10 text-sm text-gray-900 border border-[#C0C0C0] rounded-[4px] bg-white
                  focus:outline-none focus:border-[#1570EF] text-[20px]
                  "
                  placeholder="Buscar Paciente"
                  onChange={(e) => handleReSearch(e.target.value)}
                  value={searchText}
                />
              </div>
            </div>

            <div
              className="
              flex
              flex-col
              gap-[20px]
              h-full
              mt-[32px]
              overflow-auto
              "
            >
              {patients?.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <img
                    src="/sem_historico_consulta.svg"
                    alt="Sem Histórico Consultas"
                    className="w-[342px] h-[258px]"
                  />
                  <span className="text-[#C0C0C0] text-[22px] font-medium">
                    Nenhum paciente encontrado
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-[32px] h-full">
                  <div
                    className="
                      grid
                      grid-cols-pacientes_list
                      text-label
                      font-medium
                      text:-[18px]
                      2xl:text-[22px]
                      rounded-[4px]
                      px-[16px]
                    "
                  >
                    <div>
                      <span>Nome</span>
                    </div>
                    <div>
                      <span>CPF</span>
                    </div>
                    <div>
                      <span>Telefone</span>
                    </div>
                    <div>
                      <span>Data de Nascimento</span>
                    </div>
                  </div>

                  <div
                    className="
                  flex
                  flex-col
                  gap-[20px]
                  pr-[10px]
                  h-full
                  overflow-auto
                "
                  >
                    {patients &&
                      patientsList &&
                      patientsList?.length > 0 &&
                      patientsList.map((paciente) => {
                        const lastAppointment = handleLastPatientAppointment(
                          paciente.id.toString()
                        );

                        return (
                          <a
                            key={paciente.id}
                            className="
                                  grid
                                  grid-cols-pacientes_list
                                  items-center
                                  text-sm
                                  border
                                  border-[#344054]
                                  rounded-[4px]
                                  hover:bg-gray-100
                                  cursor-pointer
                                  text-label
                                  text-[18px]
                                  2xl:text-[22px]
                                  bg-white
                                  h-[84px]
                                  p-[20px]
                                  "
                            href={`/prontuario/${paciente.id}`}
                          >
                            <div className="flex items-center gap-[5px] 2xl:gap-[10px]">
                              <div className="flex items-center justify-center w-[30px] h-[30px] 2xl:w-[40px] 2xl:h-[40px] rounded-full bg-[#C0C0C0] text-blue-light">
                                <span className="text-[16px] 2xl:text-[18px] text-[#1B509A]">
                                  {getFirstLetter(paciente.full_name)}
                                </span>
                              </div>
                              <div className="flex flex-col gap-[4px] 2xl:gap-[8px]">
                                <span className="text-[16px] 2xl:text-[22px] text-label">
                                  {paciente.full_name}
                                </span>
                                {lastAppointment && (
                                  <span className="text-[14px] 2xl:text-[16px] font-[300] text-label">
                                    Data da Última Consulta:{" "}
                                    {lastAppointment?.event_date
                                      .split("-")
                                      .reverse()
                                      .join("/")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="text-[16px] 2xl:text-[22px] text-label">
                                {paciente.cpf ? paciente.cpf : "Não informado"}
                              </span>
                            </div>
                            <div className="ml-[10px] 2xl:ml-[15px]">
                              <span className="text-[16px] 2xl:text-[22px] text-label">
                                {paciente.phone
                                  ? paciente.phone
                                  : "Não informado"}
                              </span>
                            </div>
                            <div className="ml-[10px] 2xl:ml-[15px]">
                              <span className="text-[16px] 2xl:text-[22px] text-label">
                                {paciente.birth
                                  ? paciente.birth
                                      .split("-")
                                      .reverse()
                                      .join("/")
                                  : "Não informado"}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
