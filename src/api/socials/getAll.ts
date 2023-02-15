import { hookApi } from "api/hookApi";
import { ISocial } from "./type/socials.interface";

export const getAll = async () => {
  return await hookApi("get", `socials/all`);
};
