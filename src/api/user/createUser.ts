import axios from "axios";

export const createUser = async (params: any) => {
  return await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, params);
};
