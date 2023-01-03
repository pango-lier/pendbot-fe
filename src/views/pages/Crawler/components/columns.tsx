import { ColumnMeta, createColumnHelper } from "@tanstack/react-table";
import { ChevronsDown, ChevronsUp, PlusCircle } from "react-feather";
import { Button } from "reactstrap";
import { Tooltip } from "views/pages/components/Tooltip";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";
import { ICrawler } from "api/crawler/crawler/type/crawler.interface";
interface ICrawlerTable extends ICrawler {
  checkbox?: any;
  expanded?: any;
  actions?: any;
}

const columnHelper = createColumnHelper<ICrawlerTable>();

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
      size: 5,
      minSize: 40,
      maxSize: 100,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      size: 5,
      minSize: 20,
      maxSize: 70,
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => (
        <Tooltip
          id={"gr" + info.row.id}
          message={info.row.original?.name ?? ""}
        />
      ),
      size: 0,
      minSize: 50,
      maxSize: 200,
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => (
        <Tooltip id={"c" + info.row.id} message={info.getValue() ?? ""} />
      ),
      size: 0,
      minSize: 50,
      maxSize: 200,
    }),

    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      size: 15,
      minSize: 50,
      maxSize: 150,
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      size: 5,
      minSize: 50,
      maxSize: 150,
      meta: {
        sand: 2,
      },
    }),
    columnHelper.accessor("linkDownloaded", {
      header: () => <span>Download</span>,
      size: 15,
      minSize: 50,
      maxSize: 150,
    }),
    columnHelper.accessor("links", {
      header: () => <span>target</span>,
      size: 15,
      minSize: 50,
      maxSize: 150,
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      size: 7,
      minSize: 40,
      maxSize: 100,
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
      size: 15,
      minSize: 50,
      maxSize: 150,
    }),
  ];
};
