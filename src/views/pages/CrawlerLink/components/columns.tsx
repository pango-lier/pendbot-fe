import { createColumnHelper } from "@tanstack/react-table";
import { ChevronsDown, ChevronsUp, PlusCircle } from "react-feather";
import { Button } from "reactstrap";
import { Tooltip } from "views/pages/components/Tooltip";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";
import { ICrawlerLink } from "api/crawler/crawler-link/type/crawler-link.interface";

const columnHelper = createColumnHelper<ICrawlerLink>();

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
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => (
        <Tooltip
          id={"gr" + info.row.id}
          message={info.row.original?.name ?? ""}
        />
      ),
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => (
        <Tooltip id={"c" + info.row.id} message={info.getValue() ?? ""} />
      ),
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),

    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor("status", {
      header: () => <span>Proxy Type</span>,
      size: 70,
      minSize: 50,
      maxSize: 100,
    }),
    columnHelper.accessor("target", {
      header: () => <span>Active</span>,
      size: 30,
      minSize: 20,
      maxSize: 30,
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      size: 50,
      minSize: 40,
      maxSize: 70,
      cell: (info) => {
        const date = new Date(info.row.original.createdAt + "");
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
      size: 30,
      minSize: 30,
      maxSize: 40,
    }),
  ];
};
