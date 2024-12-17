import React from "react";
import BaseTable from "./components/BaseTable";
import { IRow } from "../columns";

interface Props {
  parent: IRow;
}
const Child = ({ parent }: Props) => {
  return (
    <div className="mt-2 mb-2">
      <BaseTable social={parent} />
    </div>
  );
};

export default Child;
