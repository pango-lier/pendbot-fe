import { hookApi } from "api/hookApi";

export const runTestFacebookService = async (params) => {
  return await hookApi("post", `facebook/test`, {
    params,
    _success: true,
    title: "Run Test Service",
  });
};
