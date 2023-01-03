export interface ICrawler {
  id: number;

  name: string;

  type: string;

  tags?: string;

  status: string;

  description?: string;

  links?: string;

  linkDownloaded?: string;

  meta?: string;

  createdAt: Date;

  updatedAt: Date;

  crawlerLinkId?: number;

  userId?: number;
}
