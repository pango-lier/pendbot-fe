import axios from "axios";
import { IProxy } from "views/pages/Proxy/components/columns";
import { ICreateProxy } from "./createProxy";

export interface IUpdateProxy extends ICreateProxy {}

export const updateProxy = async (id: number, params: IUpdateProxy) => {
  return await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/proxies/${id}`,
    params
  );
};
