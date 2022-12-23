import axios from "axios";

export const deleteUser = async (params: any) => {
  return await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/users`,
    params
  );
};
