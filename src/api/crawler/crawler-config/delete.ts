import { hookApi } from "api/hookApi";

export const deleteCrawlerConfig = async (id: number) => {
  return await hookApi("delete", `crawler-configs/${id}`, {
    _success: true,
    title: "Delete Crawler Config",
  });
};
