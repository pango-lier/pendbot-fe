import { createColumnHelper } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  ChevronUp,
  Info,
  PlusCircle,
} from "react-feather";
import Action from "./Action";
import CheckboxTable from "./CheckboxTable";
import { Tooltip } from "../../components/Tooltip";
import { IArticle } from "../../../../api/articles/type/type.interface";
import { ChipTooltip } from "../../components/ChipTooltip";
import { ImageTooltip } from "../../components/ImageTooltip";

export interface IRow extends IArticle { }
interface ITable extends IRow {
  checkbox?: any;
  expanded?: any;
  actions?: any;
}

const columnHelper = createColumnHelper<ITable>();

export const COLUMNS = (
  onCreateHandle: Function,
  onEditHandle: Function,
  onDeleteHandle: Function
) => [
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
          {""}
          {/* <span
          {...{
            style: { cursor: "pointer" },
            onClick: table.getToggleAllRowsExpandedHandler(),
          }}
        >
          {table.getIsAllRowsExpanded() ? <ChevronsDown /> : <ChevronsRight />}
        </span> */}
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
          </>
        </div>
      ),
      size: 4,
      minSize: 4,
      maxSize: 7,
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      size: 5,
      minSize: 4,
      maxSize: 10,
    }),
    columnHelper.accessor((row) => row.title, {
      id: "thumbnail",
      cell: (i) => (
        <ImageTooltip
          id={`thumbnail${i.row.id}`}
          message={`${i.row.original.url ?? ''}`}
          image={`${i.row.original.thumbnail}`}
          imageTooltip={i.row.original.thumbnail}
        />
      ),
      header: () => <span>Url</span>,
      size: 4,
      minSize: 5,
      maxSize: 10,
    }),
    columnHelper.accessor((row) => row.title, {
      id: "title",
      cell: (i) => (
        i.getValue()
      ),
      header: () => <span>Title</span>,
      size: 15,
      minSize: 15,
      maxSize: 25,
    }),
    columnHelper.accessor("tags", {
      header: () => <span>Tags</span>,
      size: 10,
      minSize: 10,
      maxSize: 15,
    }),
    columnHelper.accessor("description", {
      header: () => "description",
      cell: (info) => (
        <Tooltip id={"c" + info.row.id} message={info.getValue() ?? ""} />
      ),
      size: 10,
      minSize: 10,
      maxSize: 25,
    }),
    columnHelper.accessor('status', {
      header: () => <span>Status</span>,
      cell: (i) => (
        <ChipTooltip id={`status${i.row.id}`} message='' status={i.getValue()} />
      ),
      size: 5,
      minSize: 5,
      maxSize: 15,
    }),

    columnHelper.accessor("active", {
      header: "active",
      size: 7,
      minSize: 7,
      maxSize: 12,
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      size: 10,
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
      maxSize: 10,
    }),
  ];
