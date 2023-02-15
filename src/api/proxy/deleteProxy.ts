import { hookApi } from "api/hookApi";
import axios from "axios";

export const deleteProxy = async (id: number) => {
  return await hookApi("delete", `proxies/${id}`, {
    _success: true,
    title: "Delete proxies",
  });
};
