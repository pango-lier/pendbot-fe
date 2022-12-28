import { hookApi } from "api/hookApi";
import axios from "axios";

export const deleteAccount = async (id: number) => {
  return await hookApi("delete", `accounts/${id}`, {
    _success: true,
    title: "Delete accounts",
  });
};
