import { hookApi } from "api/hookApi";

export const getSocialTargets = async (params) => {
  return await hookApi("get", `social-targets`, { params });
};
