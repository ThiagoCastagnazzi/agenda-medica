import axios from 'axios';

export const authenticate = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL_LOGIN}/login`,
    {
      user: {
        email: email,
        password: password,
      },
    },
  );

  const response = {
    token: res.headers.authorization,
    data: res.data,
  };

  return response;
};
