import { hookApi } from "api/hookApi";

export const getSocialTargetAll = async (
) => {
  return await hookApi("get", `social-targets/all`);
};
