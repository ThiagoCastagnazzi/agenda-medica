export interface Doctor {
  name: string;
  crm: string;
  specialty: string;
  gender: number;
  user_attributes: {
    id?: number | undefined;
    password?: string | undefined;
    role: number;
  };
}
