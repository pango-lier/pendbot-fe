import { createColumnHelper } from "@tanstack/react-table";

import {
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  PlusCircle,
} from "react-feather";
import { Button } from "reactstrap";
import { Tooltip } from "views/pages/components/Tooltip";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";
import { ISocialTarget } from "api/socialTargets/type/type.interface";

export interface IRowChild extends ISocialTarget {}
interface ITable extends IRowChild {
  checkbox?: any;
  expanded?: any;
  actions?: any;
}

const columnHelper = createColumnHelper<ITable>();

export const COLUMNS = (
  onCreateHandle: Function,
  onEditHandle: Function,
  onDeleteHandle: Function
) => {
  return [
    columnHelper.accessor((row) => row.checkbox, {
      id: "checkbox",
      header: ({ table }) => (
        <>
          <CheckboxTable
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        </>
      ),
      cell: ({ row, getValue }) => (
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <>
            <CheckboxTable
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            {""}
            {row.getCanExpand() ? (
              <span
                {...{
                  style: { cursor: "pointer" },
                  onClick: row.getToggleExpandedHandler(),
                }}
              >
                {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
              </span>
            ) : (
              ""
            )}
          </>
        </div>
      ),
      size: 15,
      minSize: 10,
      maxSize: 20,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      size: 15,
      minSize: 10,
      maxSize: 20,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.link, {
      id: "link",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor((row) => row.targetType, {
      id: "targetType",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>targetType</span>,
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor("createdAt", {
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor("actions", {
      header: ({ table }) => (
        <>
          <PlusCircle
            className="cursor-pointer"
            onClick={() => onCreateHandle()}
            size="30px"
          />
        </>
      ),
      cell: (info) => {
        return (
          <Action
            row={info.row.original}
            onEditHandle={onEditHandle}
            onDeleteHandle={onDeleteHandle}
          />
        );
      },
      size: 30,
      minSize: 30,
      maxSize: 40,
    }),
  ];
};
