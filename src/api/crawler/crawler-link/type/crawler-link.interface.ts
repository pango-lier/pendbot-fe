import { ISocial } from "api/socials/type/socials.interface";
import { ISocialTarget } from "api/socialTargets/type/type.interface";
import { CrawlerLinkEnum } from "../enum/crawler-link.enum";

export interface ICrawlerLink {
  checkbox?: any;
  expanded?: any;
  actions?: any;

  id?: string | number;

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


export class RunCrawlerQueueDto {
  commands?: CrawlerLinkEnum;
  crawler?: {
    type: CrawlerLinkEnum,
    target: string,
    [key: string]: string | number,
  }
}