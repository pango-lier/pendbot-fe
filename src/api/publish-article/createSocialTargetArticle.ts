import { IUpdateArticle } from "api/articles/type/type.interface";
import { hookApi } from "api/hookApi";
import { ISocialTarget } from "api/socialTargets/type/type.interface";
import axios from "axios";
export interface ICreate {
  socialTargets: ISocialTarget[];
  articles?: IUpdateArticle[];
}

export const createSocialTargetArticle = async (params: ICreate) => {
  return await hookApi("post", `publish-socials/articles`, {
    params,
    _success: true,
    title: "Publish Article to Social",
  });
};
