import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import compatData from "/data/compat/data.min.json";
import { Table, Grid, Tooltip, Badge, Link } from '@nextui-org/react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ForumIcon from '@mui/icons-material/Forum';

import styles from './index.module.css';

function getTableData() {
  const compatRows = []
  for (const entry of compatData) {
    compatRows.push({
      key: compatRows.length,
      title: entry.title,
      serial: entry.serial,
      crc: entry.crc,
      status: entry.status,
      region: entry.region,
      latest_testing: {
        version: entry.last_tested_version,
        date: entry.last_tested_date
      },
      links: {
        wiki: entry.wiki_link,
        forum: entry.forum_link
      }
    })
  }
  // TODO - presort
  return compatRows;
}

function getEmojiFlag(region) {
  switch (region) {
    case "us":
      return "🇺🇸";
    case "eu":
      return "🇪🇺";
    case "ch":
      return "🇨🇳";
    case "ja":
      return "🇯🇵";
    case "kr":
      return "🇰🇷";
    case "fr":
      return "🇫🇷";
    case "de":
      return "🇩🇪";
    default:
      return "👽";
  }
}

export default function Compatiblity() {
  const columns = [
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "serial",
      label: "SERIAL",
    },
    {
      key: "crc",
      label: "CRC",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "region",
      label: "REGION",
    },
    {
      key: "latest_testing",
      label: "LATEST TESTING",
    },
    {
      key: "links",
      label: "LINKS",
    }
  ];

  const rows = getTableData();

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "status":
        switch (cellValue.toLowerCase()) {
          case "perfect":
            return <Badge borderWeight="light" color="success">{cellValue}</Badge>;
          case "playable":
            return <Badge borderWeight="light" color="primary">{cellValue}</Badge>;
          case "ingame":
            return <Badge borderWeight="light" color="secondary">{cellValue}</Badge>;
          case "menus":
            return <Badge borderWeight="light" color="warning">{cellValue}</Badge>;
          case "intros":
            return <Badge borderWeight="light" color="warning">{cellValue}</Badge>;
          default:
            return <Badge borderWeight="light" color="error">{cellValue}</Badge>;
        }
      case "region":
        return getEmojiFlag(cellValue);
      case "latest_testing":
        // TODO - different color if it's an older version of the emulator
        if (cellValue) {
          let color = "neutral";
          if (cellValue.version.startsWith("1.6") || cellValue.version.startsWith("1.7")) {
            color = "success";
          }
          if (cellValue.date) {
            const lastUpdatedDate = new Date(cellValue.date);
            const dateOptions = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
            return <Tooltip content={`Tested on - ${lastUpdatedDate.toLocaleDateString(undefined, dateOptions)}`} placement="left">
              <Badge variant="bordered" color={color}>{cellValue.version}</Badge></Tooltip>;
          } else {
            return <Badge variant="bordered" color={color}>{cellValue.version}</Badge>;
          }

        } else {
          return (null);
        }
      case "links":
        const icons = [];
        if (cellValue?.wiki) {
          icons.push(<Grid><Link href={cellValue.wiki} target="_blank" rel="noopener noreferrer"><LibraryBooksIcon></LibraryBooksIcon></Link></Grid>);
        }
        if (cellValue?.forum) {
          icons.push(<Grid><Link href={cellValue.forum} target="_blank" rel="noopener noreferrer"><ForumIcon></ForumIcon></Link></Grid>);
        }
        if (icons.length > 0) {
          return <Grid.Container>
            {icons}
          </Grid.Container>;
        } else {
          return (null);
        }
      case "serial":
      case "crc":
        return <span className="monospaced">{cellValue}</span>
      default:
        return cellValue;
    }
  };

  return (
    <Layout
      title="Compatibility"
      description="Find out how well your PlayStation 2 games will run on PCSX2 and if there are any associated issues">
      <main>
        <Grid.Container>
          <Grid xs={12}>
            <Table
              compact
              striped
              sticked
              aria-label="Compatibility Table"
              css={{
                height: "auto",
                minWidth: "100%",
                display: "table"
              }}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              <Table.Body items={rows}>
                {(item) => (
                  <Table.Row key={item.key}>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
              <Table.Pagination
                noMargin
                align="center"
                rowsPerPage={25}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Grid>
        </Grid.Container>
      </main>
    </Layout>
  );
}
