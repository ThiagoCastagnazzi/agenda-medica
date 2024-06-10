export type Appointment = {
  event_date: string;
  event_time: string;
  notes?: string;
  patient_id: number;
  doctor_id: number;
};

export type AppointmentResponse = {
  attributes: {
    doctor: {
      created_at: string;
      crm: string;
      id: number;
      name: string;
      specialty: string;
      updated_at: string;
    };
    duration: string;
    event_date: string;
    event_time: string;
    notes: string;
    patient: {
      birth: string;
      cell_phone: string;
      comments: string;
      cpf: string;
      created_at: string;
      full_name: string;
      id: number;
      phone: string;
      profession: string;
      rg: string;
      updated_at: string;
      registration: string;
    };
  };
  id: string;
  type: string;
};

export type AppointmetsHistoryResposse = {
  id: string;
  type: string;
  attributes: {
    history: {
      appointments: AppointmentResponse[];
      cpf: string;
      name: string;
      phone: string;
      profession: string;
      documents: {
        appointment_id: number;
        doctor_id: number;
        patient_id: number;
        id: number;
        created_at: string;
        updated_at: string;
        event_date: string;
        doc_type: string;
      }[];
      exams: {
        appointment_id: number;
        comments: string;
        created_at: string;
        description: string;
        doctor_id: number;
        id: number;
        patient_id: number;
        prescription: string;
        updated_at: string;
      }[];
      imaging_exams: {
        data: [];
      };
      refractions: {
        addition: number;
        appointment_id: number;
        axis_od: string;
        axis_oe: string;
        comment: string;
        created_at: string;
        cylindrical_od: number;
        cylindrical_oe: number;
        dnp_od: number;
        dnp_oe: number;
        doctor_id: number;
        id: number;
        patient_id: number;
        spherical_od: number;
        spherical_oe: number;
        updated_at: string;
      }[];
    };
  };
};
