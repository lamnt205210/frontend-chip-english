import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/login`,
    data
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`);
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  console.log("res refreshToken", res.data);
  return res.data;
};
