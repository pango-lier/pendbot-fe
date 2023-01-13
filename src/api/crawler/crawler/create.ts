import { hookApi } from "api/hookApi";
import axios from "axios";
import { CrawlerLinkEnum, CrawlerLinkStatusEnum } from "./enum/crawler-link.enum";
export interface ICreateCrawlerDto {
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

export const createCrawler = async (params: ICreateCrawlerDto) => {
  return await hookApi("post", `crawlers`, {
    params,
    _success: true,
    title: "Create Crawler",
  });
};
