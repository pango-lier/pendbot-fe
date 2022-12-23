import axios from "axios";

export const deleteGroup = async (params: any) => {
  return await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/groups`,
    params
  );
};