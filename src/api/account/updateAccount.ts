import axios from "axios";

export interface IUpdateAccount {
  name: string;

  active?: boolean;

  proxyId?: string;

  proxyType?: string;

  groupId?: number | string | null;

  userId?: number;
}

export const updateAccount = async (id: number, params: IUpdateAccount) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/accounts/${id}`,
    params
  );
};
