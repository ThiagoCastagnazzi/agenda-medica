export interface Exam {
  data: {
    id: string;
    type: string;
    attributes: {
      created_at: string;
      description: string;
      prescription: string;
      comments: string;
      patient_id: number;
      doctor_id: number;
    };
  }[];
  meta: {
    total_count: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}

export interface ExamPOST {
  description: string;
  prescription: string;
  comments: string;
  patient_id: number;
  appointment_id: number | null;
  doctor_id: number;
}

export interface ExamPUT {
  id?: string;
  description: string;
  prescription: string;
  comments: string;
  patient_id: number;
  appointment_id: number;
}
