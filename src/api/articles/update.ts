import { hookApi } from "api/hookApi";
import { IUpdateArticle } from "./type/type.interface";

export const updateArticle = async (id: number, params: IUpdateArticle) => {
  return await hookApi("patch", `articles/${id}`, {
    params,
    _success: true,
    title: "Create Articles",
  });
};
