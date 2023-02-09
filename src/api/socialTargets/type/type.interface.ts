import { SocialTargetEnum } from "../enum/type.enum";

export interface ISocialTarget {
  id?: number;
  name?: string;
  link: string;
  targetType?: SocialTargetEnum;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
