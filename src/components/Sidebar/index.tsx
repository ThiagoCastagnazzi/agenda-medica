'use client';

import { useAppointments } from '@/hooks/useAppointments';
import Calendar from '../Calendar';

import { FiWatch } from 'react-icons/fi';

const MAX_NAME_LENGTH = 20;

const Sidebar = () => {
  const { data: appointments } = useAppointments({});

  const truncateFullName = (fullName: string) => {
    if (fullName.length > MAX_NAME_LENGTH) {
      return `${fullName.substring(0, MAX_NAME_LENGTH)}...`;
    }
    return fullName;
  };

  const today = new Date();

  const appointmentsToday = appointments?.filter(
    appointment =>
      appointment.attributes.event_date ===
      `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
  );

  const orderedAppointmentsToday = appointmentsToday?.sort((a, b) => {
    if (a.attributes.event_time < b.attributes.event_time) {
      return -1;
    }
    if (a.attributes.event_time > b.attributes.event_time) {
      return 1;
    }
    return 0;
  });

  const orderedAppointmentsTodayByTime = orderedAppointmentsToday?.filter(
    appointment => {
      const timeNow = new Date();

      if (
        appointment.attributes.event_time >
        `${
          timeNow.getHours() < 10
            ? `0${timeNow.getHours()}`
            : timeNow.getHours()
        }:${
          timeNow.getMinutes() < 10
            ? `0${timeNow.getMinutes()}`
            : timeNow.getMinutes()
        }`
      ) {
        return appointment;
      }

      return null;
    },
  );

  return (
    <aside
      className="
        left-[0px]
        flex
        flex-col
        items-center
        h-[808px]
        gap-[16px]
        "
    >
      <div>
        <Calendar />
      </div>

      <div
        className="
            flex
            flex-col
            mx-auto
            bg-white
            w-[100%]
            h-[720px]
            rounded-[4px]
            px-[14px]
            py-[20px]
            gap-[16px]
            "
      >
        <div
          className="
        "
        >
          <h1 className="text-center text-[22px] text-black border-b border-[#C0C0C0] pb-[20px]">
            Pacientes do dia
          </h1>
        </div>

        <div
          className="
          flex
          flex-col
          gap-[16px]
          "
        >
          {appointmentsToday &&
            orderedAppointmentsTodayByTime &&
            orderedAppointmentsTodayByTime.map(appointment => (
              <a
                key={appointment.id}
                className="flex items-center gap-[10px]"
                href={`/prontuario/paciente/${appointment.attributes.patient.id}`}
              >
                <span
                  className="
                    text-[#1B509A]
                    text-[18px]
                    bg-blue-light
                    rounded-[8px]
                    px-[8px]
                    text-center
                    w-[100%]
                  "
                >
                  {truncateFullName(appointment.attributes.patient.full_name)}
                </span>
                <span
                  className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  "
                >
                  <FiWatch size={12} color="#C9C9C9" className="ml-1" />
                  <span
                    className="
                  text-[#C9C9C9]
                  text-[12px]
                  "
                  >
                    {appointment.attributes.event_time}
                  </span>
                </span>
              </a>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
