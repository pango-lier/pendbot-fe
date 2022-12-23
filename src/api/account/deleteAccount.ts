import axios from "axios";

export const deleteAccount = async (params: any) => {
  return await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/account`,
    params
  );
};
