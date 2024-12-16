import { hookApi } from "api/hookApi";
import axios from "axios";
export interface ICreateProxy {
  name: string;

  active?: boolean;

  proxyId?: string| null;

  proxyType?: string| null;

  host?: string| null;

  port?: number| null;

  username?: string| null;

  password?: string| null;

  country_code?: string| null;

  groupId?: number | string | null;

  userId?: number| null;
}

export const createProxy = async (params: ICreateProxy) => {
  return await hookApi("post", `proxies`, {
    params,
    _success: true,
    title: "Create Proxies",
  });
};
