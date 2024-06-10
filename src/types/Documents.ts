export interface DocumentPOST {
  doc_type: number;
  description: string;
  event_date: string;
  patient_id: number;
}

export interface DocumentGET {
  data: {
    id: string;
    type: string;
    attributes: {
      doc_type: string;
      description: string;
      patient_id: number;
      appointment_id: number | null;
      event_date: string;
    };
  }[];
  meta: {
    total_count: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}
