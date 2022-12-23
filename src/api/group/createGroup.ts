import axios from "axios";

export const createGroup = async (params: any) => {
  return await axios.post(`${process.env.REACT_APP_SERVER_URL}/groups`, params);
};
