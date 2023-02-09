import { hookApi } from "api/hookApi";
import { IPaginate } from "api/paginate/interface/paginate.interface";

export const getSocials = async (
  params: IPaginate = { offset: 0, limit: 100 }
) => {
  const a: any = params;
  const query = new URLSearchParams(a).toString();

  return await hookApi("get", `social-targets?${query}`);
};
