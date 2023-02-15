import { hookApi } from "api/hookApi";
import { IPaginate } from "api/paginate/interface/paginate.interface";

export const getCrawlerConfig = async (
  params: IPaginate = { offset: 0, limit: 100 }
) => {
  return await hookApi("get", `crawler-configs`, { params });
};
