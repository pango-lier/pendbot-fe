import axios from "axios";

export const updateUser = async (params: any) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/users`,
    params
  );
};
