import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import {
  Table,
  Grid,
  Tooltip,
  Badge,
  Link,
  Loading,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "@nextui-org/react";
import { MdLibraryBooks, MdForum } from "react-icons/md";
import Fuse from "fuse.js";
import { DateTime } from "luxon";
import { GoogleAd } from "../../components/GoogleAd";
import { useMediaQuery } from "../../utils/mediaQuery";

function getTableData(compatData) {
  const compatRows = [];
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
        date: entry.last_tested_date,
      },
      links: {
        wiki: entry.wiki_link,
        forum: entry.forum_link,
      },
    });
  }
  compatRows.sort((a, b) => a.title.localeCompare(b.title));
  return compatRows;
}

function calcPercentages(compatData) {
  const stats = {
    perfect: 0,
    playable: 0,
    ingame: 0,
    menus: 0,
    intro: 0,
    nothing: 0,
  };
  compatData.forEach((entry) => {
    switch (entry.status.toLowerCase()) {
      case "perfect":
        stats.perfect++;
        break;
      case "playable":
        stats.playable++;
        break;
      case "ingame":
        stats.ingame++;
        break;
      case "menus":
        stats.menus++;
        break;
      case "intro":
        stats.intro++;
        break;
      case "nothing":
        stats.nothing++;
        break;
    }
  });

  return stats;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
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
    key: "latest_testing",
    label: "LATEST TESTING",
  },
  {
    key: "links",
    label: "LINKS",
  },
];

const renderCell = (entry, columnKey) => {
  const cellValue = entry[columnKey];
  switch (columnKey) {
    case "status":
      switch (cellValue.toLowerCase()) {
        case "perfect":
          return (
            <Badge borderWeight="light" color="success">
              {cellValue}
            </Badge>
          );
        case "playable":
          return (
            <Badge borderWeight="light" color="primary">
              {cellValue}
            </Badge>
          );
        case "ingame":
          return (
            <Badge borderWeight="light" color="secondary">
              {cellValue}
            </Badge>
          );
        case "menus":
          return (
            <Badge borderWeight="light" color="warning">
              {cellValue}
            </Badge>
          );
        case "intros":
          return (
            <Badge borderWeight="light" color="warning">
              {cellValue}
            </Badge>
          );
        default:
          return (
            <Badge borderWeight="light" color="error">
              {cellValue}
            </Badge>
          );
      }
    case "latest_testing":
      if (cellValue) {
        let color = "neutral";
        if (
          cellValue.version.startsWith("1.6") ||
          cellValue.version.startsWith("1.7")
        ) {
          color = "success";
        }
        if (cellValue.date) {
          const date = DateTime.fromISO(cellValue.date);
          return (
            <Tooltip
              content={`Tested on - ${date.toLocaleString(DateTime.DATE_FULL)}`}
              placement="left"
            >
              <Badge variant="bordered" color={color}>
                {cellValue.version}
              </Badge>
            </Tooltip>
          );
        } else {
          return (
            <Badge variant="bordered" color={color}>
              {cellValue.version}
            </Badge>
          );
        }
      } else {
        return null;
      }
    case "links":
      const icons = [];
      if (cellValue?.wiki) {
        icons.push(
          <Grid>
            <Tooltip content={"Wiki Page"} placement={"left"}>
              <Link
                href={cellValue.wiki}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLibraryBooks size={22}></MdLibraryBooks>
              </Link>
            </Tooltip>
          </Grid>
        );
      }
      if (cellValue?.forum) {
        icons.push(
          <Grid>
            <Tooltip content={"Forum Post"} placement={"left"}>
              <Link
                href={cellValue.forum}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdForum size={22}></MdForum>
              </Link>
            </Tooltip>
          </Grid>
        );
      }
      if (icons.length > 0) {
        return <Grid.Container>{icons}</Grid.Container>;
      } else {
        return null;
      }
    case "serial":
      return (
        <span className="monospaced">
          {getEmojiFlag(entry["region"])}&nbsp;{cellValue}
        </span>
      );
    case "crc":
      return <span className="monospaced">{cellValue}</span>;
    default:
      return cellValue;
  }
};

const searchOptions = {
  minMatchCharLength: 1,
  threshold: 0.2,
  keys: ["title", "serial", "crc"],
};

import CompatData from "@site/static/data/compat/data.min.json";

export default function Compatiblity() {
  // State
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    perfect: false,
    playable: false,
    ingame: false,
    menus: false,
    intro: false,
    nothing: false,
  });
  const [filterStats, setFilterStats] = useState({
    perfect: undefined,
    playable: undefined,
    ingame: undefined,
    menus: undefined,
    intro: undefined,
    nothing: undefined,
  });
  const [loadingState, setLoadingState] = useState("loading");
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [readyToFilter, setReadyToFilter] = useState(false);

  useEffect(() => {
    setTableData(getTableData(CompatData));
    // Determine distribution of statuses
    setFilterStats(calcPercentages(CompatData));
    setFilteredData(getTableData(CompatData));
    setLoadingState("idle");
    setReadyToFilter(true);
  }, []);

  const filterData = () => {
    if (!readyToFilter) {
      return;
    }
    // Start with the raw data, filter it by status first
    let newFilteredData = tableData.filter((entry) => {
      return !filterOptions[entry.status.toLowerCase()];
    });

    // Then filter by the search if applicable
    if (searchString !== "") {
      const fuse = new Fuse(newFilteredData, searchOptions);
      const results = fuse.search(searchString);
      // Coerce into a format our rendering function expects
      const searchItems = [];
      for (var i = 0; i < results.length; i++) {
        searchItems.push(results[i].item);
      }
      newFilteredData = searchItems;
    }
    setFilteredData(newFilteredData);
  };

  const toggleFilter = (filter) => {
    let newOptions = { ...filterOptions };
    newOptions[filter] = !newOptions[filter];
    setFilterOptions(newOptions);
  };

  const changeSearchString = (evt) => {
    setSearchString(evt.target.value);
  };

  useEffect(() => {
    filterData();
  }, [searchString, filterOptions]);

  const perfectFilterText =
    filterStats.perfect === undefined
      ? ""
      : `Perfect - ${round(
          (filterStats.perfect / tableData.length) * 100,
          2
        )}%`;
  const playableFilterText =
    filterStats.playable === undefined
      ? ""
      : `Playable - ${round(
          (filterStats.playable / tableData.length) * 100,
          2
        )}%`;
  const ingameFilterText =
    filterStats.ingame === undefined
      ? ""
      : `In-Game - ${round((filterStats.ingame / tableData.length) * 100, 2)}%`;
  const menusFilterText =
    filterStats.menus === undefined
      ? ""
      : `Menus - ${round((filterStats.menus / tableData.length) * 100, 2)}%`;
  const introFilterText =
    filterStats.intro === undefined
      ? ""
      : `Intros - ${round((filterStats.intro / tableData.length) * 100, 2)}%`;
  const nothingFilterText =
    filterStats.nothing === undefined
      ? ""
      : `Nothing - ${round(
          (filterStats.nothing / tableData.length) * 100,
          2
        )}%`;

  return (
    <Layout
      title="Compatibility"
      description="Find out how well your PlayStation 2 games will run on PCSX2 and if there are any associated issues"
    >
      <main>
        <Container css={{ mt: "2em" }}>
          <Grid.Container>
            <Grid.Container>
              <Grid>
                <h1>Compatibility Data</h1>
              </Grid>
            </Grid.Container>
            <Grid.Container>
              <Grid xs={12} css={{ color: "$accents7" }}>
                <p>
                  Here is the latest data on the emulator's compatibility. Use
                  the filtering and searching options below to find what you are
                  interested in
                </p>
              </Grid>
            </Grid.Container>
            <Row justify="center">
              <Col
                css={{
                  "@md": {
                    width: "50%",
                  },
                  "@mdMax": {
                    width: "100%",
                  },
                }}
              >
                <GoogleAd></GoogleAd>
              </Col>
              {useMediaQuery(960) ? null : (
                <Col
                  css={{
                    "@md": {
                      width: "50%",
                    },
                    "@mdMax": {
                      width: "100%",
                    },
                  }}
                >
                  <GoogleAd></GoogleAd>
                </Col>
              )}
            </Row>
            <Grid.Container alignItems="end" css={{ mt: "2em", mb: "1em" }}>
              <Grid xs={12} lg={4}>
                <Grid.Container gap={1}>
                  <Grid xs={12}>
                    <Input
                      label="Search by Name, Serial or CRC"
                      width="100%"
                      onChange={changeSearchString}
                      disabled={loadingState === "loading"}
                    ></Input>
                  </Grid>
                </Grid.Container>
              </Grid>
              <Grid xs={12} lg={8}>
                <Grid.Container alignItems="end" gap={1}>
                  <Grid>
                    <Button
                      bordered={filterOptions.perfect}
                      disabled={filterStats.perfect === undefined}
                      color="success"
                      auto
                      onPress={() => toggleFilter("perfect")}
                    >
                      {filterStats.perfect === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {perfectFilterText}
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      bordered={filterOptions.playable}
                      disabled={filterStats.playable === undefined}
                      color="primary"
                      auto
                      onPress={() => toggleFilter("playable")}
                    >
                      {filterStats.playable === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {playableFilterText}
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      bordered={filterOptions.ingame}
                      disabled={filterStats.ingame === undefined}
                      color="secondary"
                      auto
                      onPress={() => toggleFilter("ingame")}
                    >
                      {filterStats.ingame === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {ingameFilterText}
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      bordered={filterOptions.menus}
                      disabled={filterStats.menus === undefined}
                      color="warning"
                      auto
                      onPress={() => toggleFilter("menus")}
                    >
                      {filterStats.menus === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {menusFilterText}
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      bordered={filterOptions.intro}
                      disabled={filterStats.intro === undefined}
                      color="warning"
                      auto
                      onPress={() => toggleFilter("intro")}
                    >
                      {filterStats.intro === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {introFilterText}
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      bordered={filterOptions.nothing}
                      disabled={filterStats.nothing === undefined}
                      color="error"
                      auto
                      onPress={() => toggleFilter("nothing")}
                    >
                      {filterStats.nothing === undefined && (
                        <Loading
                          type="points-opacity"
                          color="currentColor"
                          size="sm"
                        />
                      )}
                      {nothingFilterText}
                    </Button>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
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
                    display: "table",
                    noMargin: true,
                    padding: 0,
                  }}
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column key={column.key}>
                        {column.label}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body items={filteredData} loadingState={loadingState}>
                    {(item) => (
                      <Table.Row key={item.key}>
                        {(columnKey) => (
                          <Table.Cell key={`${item.key}-${columnKey}`}>
                            {renderCell(item, columnKey)}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    )}
                  </Table.Body>
                  <Table.Pagination
                    noMargin
                    align="center"
                    rowsPerPage={
                      loadingState == "loading"
                        ? 2
                        : Math.min(25, filteredData.length)
                    }
                    page={page}
                    onPageChange={setPage}
                    total={Math.ceil(filteredData.length / 25)}
                  />
                </Table>
              </Grid>
            </Grid.Container>
            <Row justify="center">
              <Col
                css={{
                  "@md": {
                    width: "50%",
                  },
                  "@mdMax": {
                    width: "100%",
                  },
                }}
              >
                <GoogleAd></GoogleAd>
              </Col>
            </Row>
          </Grid.Container>
        </Container>
      </main>
    </Layout>
  );
}
