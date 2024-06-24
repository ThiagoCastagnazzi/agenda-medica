export interface Patient {
  full_name: string;
  cpf: string;
  birth: string;
  rg: string;
  phone: string;
}

export interface PatientsResponse {
  data: {
    attributes: {
      full_name: string;
      registration: string;
      cpf: string;
      rg: string;
      birth: string;
      profession: string;
      phone: string;
      cell_phone: string;
      comments: string;
      mother_name: string;
      father_name: string;
      status: boolean;
      address: {
        id: number;
        patient_id: number;
        zip_code: string;
        neighborhood: string;
        street: string;
        number: number;
        complement: string;
        city: string;
        state: string;
        created_at: string;
        updated_at: string;
      };
      responsible: {
        id: number;
        patient_id: number;
        full_name: string;
        cpf: string;
        birth_date: string;
        created_at: string;
        updated_at: string;
      };
    };
    id: string;
    type: string;
  }[];

  meta: {
    total_count: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}

export interface PatientResponse {
  attributes: {
    full_name: string;
    registration: string;
    cpf: string;
    rg: string;
    birth: string;
    profession: string;
    phone: string;
    cell_phone: string;
    comments: string;
    mother_name: string;
    father_name: string;
    address: {
      id: number;
      patient_id: number;
      zip_code: string;
      neighborhood: string;
      street: string;
      number: number;
      complement: string;
      city: string;
      state: string;
      created_at: string;
      updated_at: string;
    };
    responsible: {
      id: number;
      patient_id: number;
      full_name: string;
      cpf: string;
      birth_date: string;
      created_at: string;
      updated_at: string;
    };
  };
  id: string;
  type: string;
}
