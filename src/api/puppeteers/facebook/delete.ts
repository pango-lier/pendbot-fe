import { hookApi } from "api/hookApi";
import axios from "axios";

export const deleteCrawlerLink= async (id: number) => {
  return await hookApi("delete", `crawler-links/${id}`, {
    _success: true,
    title: "Delete Crawler Link",
  });
};
