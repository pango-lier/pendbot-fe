import { hookApi } from "api/hookApi";
import { RunCrawlerQueueDto } from "./crawler-link/type/crawler-link.interface";

export const runQueueService = async (params: RunCrawlerQueueDto) => {
  return await hookApi("post", `crawlers/run-queues`, {
    params,
    _success: true,
    title: "Run Test Service",
  });
};
