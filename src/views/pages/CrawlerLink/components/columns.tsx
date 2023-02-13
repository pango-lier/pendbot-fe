import { ColumnMeta, createColumnHelper } from "@tanstack/react-table";
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
                {/* {row.getIsExpanded() ? <ChevronsUp /> : <ChevronsDown />} */}
              </span>
            ) : (
              ""
            )}
          </>
        </div>
      ),
      size: 10,
      minSize: 10,
      maxSize: 20,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      size: 5,
      minSize: 5,
      maxSize: 10,
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => (
        <Tooltip
          id={"name" + info.row.id}
          message={info.row.original?.name ?? ""}
        />
      ),
      size: 5,
      minSize: 5,
      maxSize: 15,
    }),
    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      size: 15,
      minSize: 10,
      maxSize: 20,
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      size: 10,
      minSize: 10,
      maxSize: 20,
      meta: {
        sand: 2,
      },
    }),
    columnHelper.accessor("target", {
      header: () => <span>target</span>,
      cell: (info) => (
        <Tooltip
          id={"target" + info.row.id}
          message={info.row.original?.target ?? ""}
        />
      ),
      size: 25,
      minSize: 20,
      maxSize: 50,
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 15,
      minSize: 10,
      maxSize: 20,
      cell: (info) => {
        const date = new Date(info.row.original.createdAt + '');
        return (
          <Tooltip
            id={'createdAt' + info.row.id}
            fullMessage={info.row.original.createdAt + ''}
            message={`${date.getMonth() + 1
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
      size: 5,
      minSize: 5,
      maxSize: 15,
    }),
  ];
};
