export interface MedicalRecordPOST {
  medical_record: {
    description: string;
    patient_id: string;
    appointment_id: string | null;
  };
}

export interface MedicalRecordPUT {
  medical_record: {
    description: string;
  };
}

export interface MedicalRecordResponse {
  id: string;
  type: string;
  attributes: {
    description: string;
    created_at: string;
    appointment_id: number;
    patient_name: string;
  };
}
