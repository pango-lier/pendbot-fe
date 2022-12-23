import axios from "axios";

export const createAccount = async (params: any) => {
  return await axios.post(`${process.env.REACT_APP_SERVER_URL}/accounts`, params);
};
