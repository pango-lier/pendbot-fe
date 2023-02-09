import { SocialTargetEnum } from "../enum/type.enum";

export interface ISocialTarget {
  id?: number;
  name?: string;
  link?: string;
  targetType?: SocialTargetEnum;
  social?: { id?: number };
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
