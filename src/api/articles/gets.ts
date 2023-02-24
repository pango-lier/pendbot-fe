import { hookApi } from "api/hookApi";

export const getArticles = async (params) => {
  return await hookApi("get", `articles`, { params });
};
