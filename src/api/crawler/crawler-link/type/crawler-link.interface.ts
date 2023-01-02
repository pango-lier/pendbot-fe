import { CrawlerLinkEnum } from "../enum/crawler-link.enum";

export interface ICrawlerLink {
  checkbox?: any;
  expanded?: any;
  actions?: any;

  id: string | number;

  name: string;

  description?: string;

  status?: string;

  type?: CrawlerLinkEnum;

  target?: string;

  socialId?: number | string;

  accountId?: number | string;

  createdAt?: Date;

  crawlerConfigs: Array<any>;
}
