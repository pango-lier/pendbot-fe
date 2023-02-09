import { hookApi } from "api/hookApi";

export const deleteSocialTarget = async (id: number) => {
  return await hookApi("delete", `social-targets/${id}`, {
    _success: true,
    title: "Delete social-targets",
  });
};
