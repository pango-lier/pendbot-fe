import { ISocial } from "api/socials/type/socials.interface";
import { ISocialTarget } from "api/socialTargets/type/type.interface";
import { CrawlerLinkEnum } from "../enum/crawler-link.enum";

export interface ICrawlerLinkDto {
  name?: string;

  status?: string;

  type?: CrawlerLinkEnum;

  target?: string;

  socialTargets?: ISocialTarget[];

  socialTargetIds?: number[];

  accountId?: number | string;

  createdAt?: Date;

  crawlerConfigs?: Array<any>;
}
export interface ICrawlerLink extends ICrawlerLinkDto {
  checkbox?: any;
  expanded?: any;
  actions?: any;

  id?: string | number;
}

export class RunCrawlerQueueDto {
  crawlerLinks?: ICrawlerLinkDto[];
  commands?: "crawlerYoutubeNormal" | "crawlerYoutubeAuto";
  crawlerLinkIds?: number[];
}
