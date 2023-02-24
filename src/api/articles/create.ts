import { hookApi } from "api/hookApi";
import { ICreateArticle } from "./type/type.interface";

export const createArticle = async (params: ICreateArticle) => {
  return await hookApi("post", `articles`, {
    params,
    _success: true,
    title: "Create Article",
  });
};
