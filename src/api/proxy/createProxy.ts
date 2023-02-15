import { hookApi } from "api/hookApi";
import axios from "axios";
export interface ICreateProxy {
  name: string;

  active?: boolean;

  proxyId?: string;

  proxyType?: string;

  groupId?: number | string | null;

  userId?: number;
}

export const createProxy = async (params: ICreateProxy) => {
  return await hookApi("post", `proxies`, {
    params,
    _success: true,
    title: "Create Proxies",
  });
};
