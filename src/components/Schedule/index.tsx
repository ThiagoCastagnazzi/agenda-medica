import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import timeGridWeekPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listWeekPlugin from "@fullcalendar/list";
import listDayPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import AgendaLoader from "../SkeletonLoaders/AgendaLoader";
import { useAppointments } from "../../hooks/useAppointments";
import { useModal } from "../../context/ModalContext";

const AgendaC = () => {
  const { openModal, setOptionId, setAppointmentId } = useModal();

  const {
    data: appointments,
    isError,
    isLoading,
    isRefetching,
  } = useAppointments();

  const newAppointments = appointments?.map((appointment: any) => {
    const startDate = `${appointment.event_date} ${
      appointment.event_time.split(":")[0]
    }:00:00`;

    return {
      id: appointment.id,
      title: appointment.patient_name,
      start: startDate,
      end: startDate,
    };
  });

  const handleOpenModalEdit = (id: string) => {
    setOptionId("1.1");
    setAppointmentId(id);
    openModal();
  };

  return (
    <>
      {isLoading && <AgendaLoader />}

      {isError && (
        <div className="flex p-1 items-center">
          <h1 className="text-blue-500">Erro ao carregar pacientes</h1>
        </div>
      )}

      {isRefetching && (
        <div className="flex">
          <AgendaLoader />
        </div>
      )}

      {!isLoading && !isError && (
        <div className="bg-white rounded-[4px] no-scrollbar">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listWeekPlugin,
              listDayPlugin,
              timeGridWeekPlugin,
              interactionPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            height={810}
            viewHeight={1200}
            dayHeaderClassNames={["day_header"]}
            eventClick={(arg) => {
              const popover = document.querySelector(
                ".fc-popover"
              ) as HTMLDivElement;

              if (popover) {
                popover.style.display = "none";
              }

              handleOpenModalEdit(arg.event.id);
            }}
            eventMaxStack={1}
            events={newAppointments}
            eventMinHeight={50}
            eventClassNames={["event_container"]}
            eventContent={(arg) => {
              return (
                <div className="flex flex-col bg-[#E0F8EB]">
                  <h1 className="text-[#166342] text-[16px] font-[300]">
                    {
                      appointments?.find(
                        (appointment) => appointment.id === arg.event.id
                      )?.event_time
                    }
                  </h1>
                  <h1 className="text-[#166342] text-[12px] font-[500]">
                    {arg.event.title}
                  </h1>
                </div>
              );
            }}
            initialView="timeGridWeek"
            weekends={true}
            initialDate={new Date()}
            locale={"pt-br"}
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              list: "Lista",
            }}
            viewClassNames={["view_container"]}
            titleFormat={{
              year: "numeric",
              month: "long",
            }}
            timeHint="Horário"
            slotDuration={"01:00:00"}
            slotMinTime={"07:00:00"}
            slotMaxTime={"19:00:00"}
            slotLabelFormat={{
              hour: "numeric",
            }}
            allDaySlot={false}
            firstDay={1}
          />
        </div>
      )}
    </>
  );
};

export default AgendaC;
