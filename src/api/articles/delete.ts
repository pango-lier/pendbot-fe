import { hookApi } from "api/hookApi";

export const deleteArticle = async (id: number) => {
  return await hookApi("delete", `articles/${id}`, {
    _success: true,
    title: "Delete Article",
  });
};
