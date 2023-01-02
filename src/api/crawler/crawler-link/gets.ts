import { hookApi } from "api/hookApi";
import { IPaginate } from "api/paginate/interface/paginate.interface";
import axios from "axios";

export const getCrawlerLink = async (
  params: IPaginate = { offset: 0, limit: 100 }
) => {
  const a: any = params;
  const query = new URLSearchParams(a).toString();

  return await hookApi("get", `crawler-links?${query}`);
};
