export interface DoctorsResponse {
  attributes: {
    crm: string;
    rqe: string;
    name: string;
    specialty: string;
    gender: string;
    user: {
      email: string;
      id: string;
      role: string;
    };
  };
  id: string;
  type: string;
}
