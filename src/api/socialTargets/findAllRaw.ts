import { hookApi } from "api/hookApi";

export const findAllRawSocialTarget = async () => {
  return await hookApi("get", `social-targets/find-all-raw`);
};
