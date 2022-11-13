import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Text } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';
import { ReleaseDownloadButton } from '../ReleaseDownloadButton';
import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";
import { IconContext } from 'react-icons';

export function PullRequestTableCard({ pullRequest }) {
  const date = new Date(pullRequest.updatedAt);
  const dateString = date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <Row css={{ mt: "0.5em" }}>
      <Col>
        <Card css={{ p: "$6", mw: "100%" }}>
          <Card.Header>
            <h3>
              <a href={pullRequest.link}>PR #{pullRequest.number}</a>
              <span style={{ marginLeft: "0.5em", color: "#3fb950" }}>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                  <GoDiffAdded size={24}></GoDiffAdded>
                </IconContext.Provider>
                &nbsp;
                {pullRequest.additions}
              </span>
              <span style={{ marginLeft: "0.5em", color: "#dd4a48" }}>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                  <GoDiffRemoved size={24}></GoDiffRemoved>
                </IconContext.Provider>
                &nbsp;
                {pullRequest.deletions}
              </span>
            </h3>
          </Card.Header>
          <Card.Body css={{ py: "$2" }}>
            <p>
              <span style={{ fontWeight: 700 }}>Last Updated At</span> - {dateString}
            </p>
            <ReactMarkdown>{pullRequest.body}</ReactMarkdown>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export function DownloadTableReleaseCard({ release, downloadButtonText, isNightly }) {
  return (
    !release ? (null) :
      <Row css={{ mt: "0.5em" }}>
        <Col>
          <Card css={{ p: "$6", mw: "100%" }}>
            <Card.Header>
              <Text h3 css={{ lineHeight: "$xs" }}>
                {release.version}
              </Text>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
              <Text>
                <ReactMarkdown>{release.description}</ReactMarkdown>
              </Text>
            </Card.Body>
            <Card.Footer>
              <ReleaseDownloadButton
                release={release}
                buttonText={downloadButtonText}
                isNightly={isNightly}
                bordered={true}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
  );
}

function renderSelectedCard(selectedData, tableType) {
  if (!selectedData) {
    return (null);
  }
  if (tableType === "stable") {
    return <DownloadTableReleaseCard release={selectedData} downloadButtonText={"Download Release"} isNightly={false} />
  } else if (tableType === "nightly") {
    return <DownloadTableReleaseCard release={selectedData} downloadButtonText={"Download Release"} isNightly={true} />
  } else if (tableType === "pullRequests") {
    return <PullRequestTableCard pullRequest={selectedData} />
  }
};

export function DownloadTable({ pageSize, tableLabel, color, initialTableData, tableColumns, renderRowFunc, fetchMoreFunc, tableType }) {
  const [tableData, setTableData] = useState({ data: [] });
  const [tableLoadingState, setTableLoadingState] = useState("idle");
  const [tablePage, setTablePage] = useState(1);
  const [selectedTableRow, setSelectedTableRow] = useState(undefined);

  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);

  return (
    <div>
      <Row>
        <Col>
          <Table
            striped
            compact
            sticked
            selectionMode={"single"}
            color={color}
            aria-label={tableLabel}
            onSelectionChange={(selection) => {
              if (selection.size <= 0) {
                setSelectedTableRow(undefined);
              } else {
                setSelectedTableRow([...selection][0]);
              }
            }}
            css={{
              height: "auto",
              minWidth: "100%",
              display: "table",
              noMargin: true,
              padding: 0
            }}
          >
            <Table.Header columns={tableColumns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={tableData.data} loadingState={tableLoadingState}>
              {(item) => (
                <Table.Row key={tableData.data.indexOf(item)}>
                  {(columnKey) => (
                    <Table.Cell>{renderRowFunc(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              noMargin
              align="center"
              rowsPerPage={tableLoadingState == "loading" ? 2 : Math.min(pageSize, tableData?.pageInfo?.total)}
              page={tablePage}
              onPageChange={async (page) => {
                setTableLoadingState("loading");
                page = page - 1;
                const newLength = (page + 1) * pageSize;
                const newOffset = page * pageSize;

                // See if we have to fetch more from the API
                const fetchMore = tableData.data.length < newLength || Object.keys(tableData.data[newOffset]).length === 0;
                if (fetchMore) {
                  const resp = await fetchMoreFunc(newOffset);
                  const data = await resp.json();
                  const newTableData = tableData.data;
                  // If array isn't as big as the start index, we need to fill up to that point
                  if (newTableData.length < newOffset) {
                    for (let i = 0, newSize = newOffset - newTableData.length; i < newSize; i++) {
                      newTableData.push({});
                    }
                  }
                  // We can then fill in the array with the indices provided
                  // - if we are out of bounds, push undefined
                  // - if there is a value OTHER than undefined, skip, the user is just jumping around pages
                  for (let i = 0; i < data.data.length; i++) {
                    if ((i + newOffset) >= newTableData.length) {
                      newTableData.push(data.data[i]);
                    } else if (Object.keys(newTableData[i + newOffset]).length !== 0) {
                      continue;
                    } else {
                      newTableData[i + newOffset] = data.data[i];
                    }
                  }
                  setTableData({
                    data: newTableData,
                    pageInfo: data.pageInfo
                  });
                }
                setTableLoadingState("idle");
                setTablePage(page + 1);
              }}
              total={Math.ceil(tableData?.pageInfo?.total / pageSize)}
            />
          </Table>
        </Col>
      </Row>
      {selectedTableRow === undefined ? renderSelectedCard(selectedTableRow, tableType) : renderSelectedCard(tableData.data[selectedTableRow], tableType)}
    </div>
  );
}
