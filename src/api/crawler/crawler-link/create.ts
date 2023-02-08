import { hookApi } from "api/hookApi";
import axios from "axios";
import { ICrawlerLink } from "./type/crawler-link.interface";

export const createCrawlerLink = async (params: ICrawlerLink) => {
  return await hookApi("post", `crawler-links`, {
    params,
    _success: true,
    title: "Create Crawler Link",
  });
};
