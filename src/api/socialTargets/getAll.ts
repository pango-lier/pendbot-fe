import { hookApi } from "api/hookApi";

export const getAll = async (
) => {
  return await hookApi("get", `social-targets/all`);
};
