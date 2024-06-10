export interface SecretariePOST {
  name: string;
  gender: number;
  user_attributes: {
    email: string;
    password?: string | undefined;
    role: number;
  };
}

export interface SecretariePUT {
  name: string;
  gender: number;
  user_attributes: {
    id?: number | undefined;
    password?: string | undefined;
    role: number;
  };
}

export interface SecretarieResponse {
  attributes: {
    name: string;
    gender: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
  id: string;
  type: string;
}
