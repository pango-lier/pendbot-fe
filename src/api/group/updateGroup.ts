import axios from "axios";

export const updateGroup = async (params: any) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/groups`,
    params
  );
};