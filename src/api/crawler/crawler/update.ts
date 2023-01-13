import { hookApi } from "api/hookApi";
import { CrawlerLinkStatusEnum } from "./enum/crawler-link.enum";

export interface UpdateCrawlerDto {
  name: string;

  type?: string;

  status?: CrawlerLinkStatusEnum;

  meta?: string;

  tags?: string;

  description?: string;

  links?: string;

  linkDownloaded?: string;

  crawlerLinkId?: number;
}

export const updateCrawler = async (id: number, params: UpdateCrawlerDto) => {
  return await hookApi("patch", `crawlers/${id}`, {
    params,
    _success: true,
    title: "Create Crawler",
  });
};
