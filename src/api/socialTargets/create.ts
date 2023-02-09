import { hookApi } from "api/hookApi";
import { ISocialTarget } from "./type/type.interface";

export const createSocialTarget = async (params: ISocialTarget) => {
  return await hookApi("post", `social-targets`, {
    params,
    _success: true,
    title: "Create social-targets",
  });
};
