import axios from "axios";

export const updateAccount = async (params: any) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/accounts`,
    params
  );
};
