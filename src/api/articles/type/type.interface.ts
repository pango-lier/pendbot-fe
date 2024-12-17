import { ISocialTarget } from "../../socialTargets/type/type.interface";
import { IUser } from "../../user/type/type.interface";
import { ArticleStatusEnum } from "../enum/type.enum";

export interface IFile {
  id?: number;

  url: string;

  local?: string | null;

  type?: string | null;

  size?: number | null;

  name?: string | null;

  thumbnail?: string | null;
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
  files?: IFile[];
}
export interface IUpdateArticle extends ICreateArticle {
  id?: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IArticle extends IUpdateArticle {}
