import { hookApi } from "api/hookApi";

export const getArticleAll = async () => {
  return await hookApi("get", `articles/all`);
};
