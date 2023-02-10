import { SocialEnum } from "../enum/socials.enum";

export interface ISocial {
  id?: number;
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  socialType: SocialEnum;
  active?: boolean;

  userId?: number | string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
