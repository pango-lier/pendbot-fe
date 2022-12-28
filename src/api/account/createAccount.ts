import { hookApi } from "api/hookApi";
import axios from "axios";
export interface ICreateAccount {
  name: string;

  active?: boolean;

  proxyId?: string;

  proxyType?: string;

  groupId?: number | string | null;

  userId?: number;
}

export const createAccount = async (params: ICreateAccount) => {
  return await hookApi("post", `accounts`, {
    params,
    _success: true,
    title: "Create accounts",
  });
};
