import { CrawlerLinkEnum } from "./enum/crawler-link.enum";
import { hookApi } from "api/hookApi";
import { ICrawlerLink } from "./type/crawler-link.interface";


export const updateCrawlerLink = async (
  id: number,
  params: ICrawlerLink
) => {
  return await hookApi("patch", `crawler-links/${id}`, {
    params,
    _success: true,
    title: "Create Crawler Link",
  });
};
