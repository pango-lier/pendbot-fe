import { IPaginate } from "api/paginate/interface/paginate.interface";
import axios from "axios";

export const getGroups = async (
  params: IPaginate = { offset: 0, limit: 100 }
) => {
  const a: any = params;
  const query = new URLSearchParams(a).toString();
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/groups?${query}`);
};
