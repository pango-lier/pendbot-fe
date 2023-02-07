import { hookApi } from "api/hookApi";
import { SocialEnum } from "api/socials/enum/socials.enum";

export interface IRunCrawlerQueueOptionDto {
  pushSocial?: SocialEnum
}

export interface IRunCrawlerQueueDto {
  id: Array<string | number>;
  name?: string;
  options?: IRunCrawlerQueueOptionDto;
}
export const runCrawler = async (params: IRunCrawlerQueueDto) => {
  return await hookApi("post", `crawlers/run`, {
    params,
    _success: true,
    title: "Run Crawler",
  });
};
