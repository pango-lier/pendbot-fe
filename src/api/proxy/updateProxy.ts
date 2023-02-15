import axios from "axios";

export interface IUpdateProxy {
  name: string;

  active?: boolean;

  proxyId?: string;

  proxyType?: string;

  groupId?: number | string | null;

  userId?: number;
}

export const updateProxy = async (id: number, params: IUpdateProxy) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/proxies/${id}`,
    params
  );
};
