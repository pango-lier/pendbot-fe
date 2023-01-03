import { hookApi } from "api/hookApi";

export const deleteCrawler = async (id: number) => {
  return await hookApi("delete", `crawlers/${id}`, {
    _success: true,
    title: "Delete Crawler",
  });
};
