import { hookApi } from "api/hookApi";
import { ISocial } from "./type/socials.interface";

export const createSocial = async (params: ISocial) => {
  return await hookApi("post", `socials`, {
    params,
    _success: true,
    title: "Create Social",
  });
};
