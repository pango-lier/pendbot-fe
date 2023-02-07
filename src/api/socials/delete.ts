import { hookApi } from "api/hookApi";

export const deleteSocial= async (id: number) => {
  return await hookApi("delete", `socials/${id}`, {
    _success: true,
    title: "Delete Social",
  });
};
