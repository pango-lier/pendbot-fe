import React from "react";
import BaseTable from "./components/BaseTable";
import { IUserGroupProps } from "../columns";

const Account = ({ user, group }: IUserGroupProps) => {
  return (
    <div className="mt-2 mb-2">
      <BaseTable user={user} group={group} />
    </div>
  );
};

export default Account;
