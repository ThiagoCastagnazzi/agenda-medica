"use client";

import { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import "../../app/calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  registerLocale("pt-BR", ptBR);
  setDefaultLocale("pt-BR");

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mx-auto">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="dd/MM/yyyy"
        dateFormatCalendar="MMMM yyyy"
        locale="pt-BR"
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
        calendarStartDay={1}
      />
    </div>
  );
};

export default Calendar;
