import { hookApi } from "api/hookApi";

export interface IUpdateCrawlerConfig {
  name?: string;

  key: string;

  value: string;
}

export const createCrawlerConfig = async (params: IUpdateCrawlerConfig) => {
  return await hookApi("patch", `crawler-configs`, {
    params,
    _success: true,
    title: "Update Crawler Config",
  });
};
