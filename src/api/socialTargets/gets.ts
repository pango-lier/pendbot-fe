import { hookApi } from "api/hookApi";

export const getSocialTargets = async (
  params
) => {
  const a: any = params;
  const query = new URLSearchParams(a).toString();

  return await hookApi("get", `social-targets?${query}`);
};
