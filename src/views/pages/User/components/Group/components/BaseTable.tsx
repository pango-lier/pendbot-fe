import React, { Fragment, useEffect, useMemo, useState } from "react";
import { COLUMNS, IGroup } from "./columns";
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { notifyError } from "utility/notify";
import Account from "./Account";
import { UserI } from "../../columns";
import { Table } from "reactstrap";
import ModalGroup from "./actions/ModalGroup";
import { ACTION_ENUM } from "utility/enum/actions";
import { getGroups } from "api/group/getGroups";

const BaseTable = ({ user }: { user: UserI }) => {
  const [isOpenModalGroup, setIsOpenModalGroup] = useState<boolean>(false);
  const [action, setAction] = useState<ACTION_ENUM>(ACTION_ENUM.None);
  const [row, setRow] = useState<IGroup | undefined>();
  const [data, setData] = useState<IGroup[]>([]);
  const onCreateHandle = () => {
    setAction(ACTION_ENUM.Create);
    setRow(undefined);
    setIsOpenModalGroup(true);
  };

  const onEditHandle = (row) => {
    setRow(row);
    setAction(ACTION_ENUM.Edit);
    setIsOpenModalGroup(true);
  };
  const onDeleteHandle = (row) => {
    setRow(row);
    setAction(ACTION_ENUM.Delete);
    setIsOpenModalGroup(true);
  };
  const onHandleModal = (row) => {
    if (action === ACTION_ENUM.Create) {
      const _data = [...data];
      _data.unshift(row);
      setData(_data);
    } else if (action === ACTION_ENUM.Edit) {
      const _data = data.map((i) => {
        if (i.id === row.id) i = row;
        return i;
      });
      setData(_data);
    } else if (action === ACTION_ENUM.Delete) {
      let _data = data.filter((i) => i.id !== row.id);
      console.log(_data);
      setData(_data);
    }
    setIsOpenModalGroup(false);
  };

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const fetchData = async () => {
    try {
      const response = await getGroups({ limit: 100, offset: 0 });
      setData(response.data.groupDtos.nodes);
    } catch (error) {
      notifyError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns: useMemo(
      () => COLUMNS(onCreateHandle, onEditHandle, onDeleteHandle),
      []
    ),
    state: {
      expanded,
    },
    getRowCanExpand: () => true,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });
  const rerender = React.useReducer(() => ({}), {})[1];
  return (
    <>
      <div>
        <Table borderless size="sm" hover>
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      key: header.id,
                      style: {
                        width: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.maxSize,
                        minWidth: header.column.columnDef.minSize,
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr key={row.id} className="table-primary">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        {...{
                          key: cell.id,
                          style: {
                            width: cell.column.columnDef.size,
                            maxWidth: cell.column.columnDef.maxSize,
                            minWidth: cell.column.columnDef.minSize,
                          },
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    <td colSpan={row.getVisibleCells().length}>
                      <Account group={row.original} user={user} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </div>
      {isOpenModalGroup && (
        <ModalGroup
          row={row}
          onHandle={onHandleModal}
          user={user}
          action={action}
          isOpenModalGroup={isOpenModalGroup}
          setIsOpenModalGroup={(value) => setIsOpenModalGroup(value)}
        />
      )}
    </>
  );
};
export default BaseTable;
