import { hookApi } from "api/hookApi";

export interface ICreateCrawlerConfig{
  name?: string;

  key: string;

  value: string;
}

export const createCrawlerConfig= async (params: ICreateCrawlerConfig) => {
  return await hookApi("post", `crawler-configs`, {
    params,
    _success: true,
    title: "Create Crawler Config",
  });
};
