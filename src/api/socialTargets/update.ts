import { hookApi } from "api/hookApi";
import { ISocialTarget } from "./type/type.interface";

export const updateSocialTarget = async (id: number, params: ISocialTarget) => {
  return await hookApi("patch", `social-targets/${id}`, {
    params,
    _success: true,
    title: "Create social-targets",
  });
};
