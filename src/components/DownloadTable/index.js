import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@heroui/react";

export function DownloadTable({
  pageSize,
  tableLabel,
  color,
  initialTableData,
  tableColumns,
  renderRowFunc,
  fetchMoreFunc,
  tableType,
}) {
  // NOTE: https://github.com/nextui-org/nextui/issues/2193
  const [tableKey, setTableKey] = useState("");
  const [tableData, setTableData] = useState({ data: [] });
  const [tableLoadingState, setTableLoadingState] = useState("idle");
  const [tablePage, setTablePage] = useState(1);
  const [selectedVersion, setSelectedVersion] = useState(undefined);

  const rowsPerPage = 10;

  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);

  const tableRows = React.useMemo(() => {
    const start = (tablePage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return tableData.data.slice(start, end);
  }, [tablePage, tableData]);

  return (
    <div className="w-full container">
      <div className="flex flex-row">
        <Table
          key={`${tableLabel}-${tableKey}`}
          isStriped
          compact
          removeWrapper
          selectionMode={"single"}
          aria-label={tableLabel}
          onSelectionChange={(selection) => {
            if (!selection.size <= 0) {
              const key = [...selection][0];
              if (key !== selectedVersion) {
                setSelectedVersion(key);
                setTableKey(crypto.randomUUID());
              }
            }
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              {/* TODO - keep an eye on https://github.com/heroui-inc/heroui/pull/4536 in next release, as it might fix the issues around the pagination component */}
              <Pagination
                isCompact
                showControls
                showShadow
                page={tablePage}
                total={Math.ceil(tableData?.pageInfo?.total / pageSize)}
                onChange={async (page) => {
                  setTableLoadingState("loadingMore");
                  page = page - 1;
                  const newLength = (page + 1) * pageSize;
                  const newOffset = page * pageSize;

                  // See if we have to fetch more from the API
                  const fetchMore =
                    tableData.data.length < newLength ||
                    Object.keys(tableData.data[newOffset]).length === 0;
                  if (fetchMore) {
                    const resp = await fetchMoreFunc(newOffset);
                    const data = await resp.json();
                    const newTableData = tableData.data;
                    // If array isn't as big as the start index, we need to fill up to that point
                    if (newTableData.length < newOffset) {
                      for (
                        let i = 0, newSize = newOffset - newTableData.length;
                        i < newSize;
                        i++
                      ) {
                        newTableData.push({});
                      }
                    }
                    // We can then fill in the array with the indices provided
                    // - if we are out of bounds, push undefined
                    // - if there is a value OTHER than undefined, skip, the user is just jumping around pages
                    for (let i = 0; i < data.data.length; i++) {
                      if (i + newOffset >= newTableData.length) {
                        newTableData.push(data.data[i]);
                      } else if (
                        Object.keys(newTableData[i + newOffset]).length !== 0
                      ) {
                        continue;
                      } else {
                        newTableData[i + newOffset] = data.data[i];
                      }
                    }
                    setTableData({
                      data: newTableData,
                      pageInfo: data.pageInfo,
                    });
                  }
                  setTableLoadingState("idle");
                  setTablePage(page + 1);
                }}
              />
            </div>
          }
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={tableRows} loadingState={tableLoadingState}>
            {(item) => (
              <TableRow key={item.version}>
                {(columnKey) => (
                  <TableCell>
                    {renderRowFunc(
                      item,
                      columnKey,
                      tableType === "nightly",
                      selectedVersion !== undefined &&
                        item.version === selectedVersion,
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
