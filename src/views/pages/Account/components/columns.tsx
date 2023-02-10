import { createColumnHelper } from "@tanstack/react-table";
import { ChevronsDown, ChevronsUp, PlusCircle } from "react-feather";
import { Button } from "reactstrap";
import { Tooltip } from "views/pages/components/Tooltip";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";
import { GroupEnum } from "api/group/enum/group.enum";

export interface IGroup {
  id: string | number;
  name: string;
  groupType: GroupEnum;
  secretName?: string;
  secretKey?: string;
  userId?: string;
  createdAt: Date;
}
export interface IAccount {
  checkbox?: any;
  expanded?: any;
  id: string | number;
  name: string;
  active: boolean;
  proxyId: string;
  proxyType: string;
  group?: IGroup;
  groupId?: number;
  createdAt: Date;
  actions?: any;
}

const columnHelper = createColumnHelper<IAccount>();

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
          style={
            {
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              // paddingLeft: `${row.depth * 2}rem`,
            }
          }
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
                {row.getIsExpanded() ? <ChevronsUp /> : <ChevronsDown />}
              </span>
            ) : (
              ""
            )}
          </>
        </div>
      ),
      size: 7,
      minSize: 5,
      maxSize: 15,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      size: 5,
      minSize: 5,
      maxSize: 15,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      size: 20,
      minSize: 15,
      maxSize: 25,
    }),
    columnHelper.accessor("group.name", {
      header: () => "Group",
      cell: (info) => (
        <Tooltip
          id={"gr" + info.row.id}
          message={info.row.original.group?.name ?? ""}
        />
      ),
      size: 12,
      minSize: 10,
      maxSize: 20,
    }),
    columnHelper.accessor("proxyId", {
      header: () => "Proxy Id",
      cell: (info) => (
        <Tooltip id={"c" + info.row.id} message={info.getValue() ?? ""} />
      ),
      size: 12,
      minSize: 10,
      maxSize: 22,
    }),
    columnHelper.accessor("proxyType", {
      header: () => <span>Proxy Type</span>,
      size: 10,
      minSize: 8,
      maxSize: 15,
    }),
    columnHelper.accessor("active", {
      header: () => <span>Active</span>,
      size: 8,
      minSize: 5,
      maxSize: 15,
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      size: 10,
      minSize: 10,
      maxSize: 15,
      cell: (info) => {
        const date = new Date(info.row.original.createdAt);
        return (
          <Tooltip
            id={"da" + info.row.id}
            fullMessage={info.row.original.createdAt + ""}
            message={`${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}
          />
        );
      },
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
      size: 10,
      minSize: 10,
      maxSize: 20,
    }),
  ];
};
