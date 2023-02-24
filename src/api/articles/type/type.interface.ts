import { ISocialTarget } from "../../socialTargets/type/type.interface";
import { IUser } from "../../user/type/type.interface";
import { ArticleStatusEnum } from "../enum/type.enum";

export interface ILink {
  id?: number;

  url: string;

  urlLocal?: string;
  thumb?: string;

  // typeLink?: LinkEnum;

  size?: number;

  description?: string;

  thumbnail?: string;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
 
export interface ICreateArticle {
  title?: string;
  thumbnail?: string;
  url?: string;
  description?: string;
  tags?: string;
  active?: boolean;
  userId?: number;
  status?: ArticleStatusEnum;
  socialTargets?: ISocialTarget[];
  user?: IUser;
}
export interface IUpdateArticle extends ICreateArticle {
  id?: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IArticle extends IUpdateArticle {}
