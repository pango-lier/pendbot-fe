
import { hookApi } from "api/hookApi";
import { ISocial } from "./type/socials.interface";

export const updateSocial = async (
  id: number,
  params: ISocial
) => {
  return await hookApi("patch", `socials/${id}`, {
    params,
    _success: true,
    title: "Create Social",
  });
};
