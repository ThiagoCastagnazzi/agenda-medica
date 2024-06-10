export interface RefractionPOST {
  spherical_od: string;
  cylindrical_od: string;
  axis_od: string;
  spherical_oe: string;
  cylindrical_oe: string;
  axis_oe: string;
  addition: string;
  patient_id: string;
  next_exam: string | null;
}

export interface Refraction {
  data: {
    id: string;
    type: string;
    attributes: {
      spherical_od: string;
      cylindrical_od: string;
      axis_od: string;
      dnp_od: string;
      spherical_oe: string;
      cylindrical_oe: string;
      axis_oe: string;
      dnp_oe: string;
      addition: string;
      comment: string;
      patient_id: string;
      appointment_id: string;
      created_at: string;
      next_exam: string;
    };
  }[];
  meta: {
    per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
  };
}
