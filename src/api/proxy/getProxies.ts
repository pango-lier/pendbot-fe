import { hookApi } from "api/hookApi";
import { IPaginate } from "api/paginate/interface/paginate.interface";
import axios from "axios";

export const getProxies = async (
  params: IPaginate = { offset: 0, limit: 100 }
) => {
  return await hookApi("get", `proxies`, { params });
};
