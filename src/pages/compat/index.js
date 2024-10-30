import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import {
  Table, Spinner,
  TableHeader, TableBody, TableColumn, TablePagination, TableRow, TableCell,
  Tooltip,
  Badge,
  Link,
  Input,
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
            <Badge
              borderWeight="light"
              color="success"
              css={{ backgroundColor: "#BA68C8" }}
            >
              {cellValue}
            </Badge>
          );
        case "playable":
          return (
            <Badge
              borderWeight="light"
              color="primary"
              css={{ backgroundColor: "#9CCC65", color: "#000" }}
            >
              {cellValue}
            </Badge>
          );
        case "ingame":
          return (
            <Badge
              borderWeight="light"
              color="secondary"
              css={{ backgroundColor: "#29B6F6", color: "#000" }}
            >
              {cellValue}
            </Badge>
          );
        case "menus":
          return (
            <Badge
              borderWeight="light"
              color="warning"
              css={{ backgroundColor: "#FBC02D", color: "#000" }}
            >
              {cellValue}
            </Badge>
          );
        case "intros":
          return (
            <Badge
              borderWeight="light"
              color="warning"
              css={{ backgroundColor: "#F57C00", color: "#000" }}
            >
              {cellValue}
            </Badge>
          );
        default:
          return (
            <Badge
              borderWeight="light"
              color="error"
              css={{ backgroundColor: "#D32F2F" }}
            >
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
          <div>
            <Tooltip content={"Wiki Page"} placement={"left"}>
              <Link
                href={cellValue.wiki}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLibraryBooks size={22}></MdLibraryBooks>
              </Link>
            </Tooltip>
          </div>,
        );
      }
      if (cellValue?.forum) {
        icons.push(
          <div>
            <Tooltip content={"Forum Post"} placement={"left"}>
              <Link
                href={cellValue.forum}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdForum size={22}></MdForum>
              </Link>
            </Tooltip>
          </div>,
        );
      }
      if (icons.length > 0) {
        return <div class="flex flex-row flex-wrap gap-2 justify-center">{icons}</div>;
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
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [readyToFilter, setReadyToFilter] = useState(false);

  useEffect(() => {
    setTableData(getTableData(CompatData));
    // Determine distribution of statuses
    setFilterStats(calcPercentages(CompatData));
    setFilteredData(getTableData(CompatData));
    setIsTableLoading(false);
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
        2,
      )}%`;
  const playableFilterText =
    filterStats.playable === undefined
      ? ""
      : `Playable - ${round(
        (filterStats.playable / tableData.length) * 100,
        2,
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
        2,
      )}%`;

  return (
    <Layout
      title="Compatibility"
      description="Find out how well your PlayStation 2 games will run on PCSX2 and if there are any associated issues"
    >
      <main class="docusaurus-reset">
        <div className="w-full container mx-auto mt-5">
          <div class="flex flex-row">
            <h1>Compatibility Data</h1>
          </div>
          <div class="flex flex-row">
            <p class="text-red-600">
              Here is the latest data on the emulator's compatibility. Use
              the filtering and searching options below to find what you are
              interested in
            </p>
          </div>
          <div class="flex justify-center">
            <div class="w-full md:w-1/2">
              <GoogleAd></GoogleAd>
            </div>
            {!useMediaQuery(960) && (
              <div class="w-full md:w-1/2">
                <GoogleAd></GoogleAd>
              </div>
            )}
          </div>
          <div class="flex flex-row gap-2 items-end">
            <div class="lg:w-1/3">
              <Input
                classNames={{
                  input: [
                    "border-none",
                    "default-font"
                  ]
                }}
                labelPlacement="outside"
                label="Search by Name, Serial or CRC"
                onChange={changeSearchString}
                disabled={isTableLoading}
              ></Input>
            </div>
            <div class="lg:w-2/3">
              <div class="flex flex-row gap-2">
                <Button
                  bordered={filterOptions.perfect}
                  disabled={filterStats.perfect === undefined}
                  isLoading={filterStats.perfect === undefined}
                  css={{
                    backgroundColor: filterOptions.perfect
                      ? "inherit"
                      : "#BA68C8",
                    color: filterOptions.perfect ? "#BA68C8" : "inherit",
                    borderColor: filterOptions.perfect
                      ? "#BA68C8"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("perfect")}
                >
                  {filterStats.perfect !== undefined && (
                    <span>{perfectFilterText}</span>
                  )}
                </Button>
                <Button
                  bordered={filterOptions.playable}
                  disabled={filterStats.playable === undefined}
                  css={{
                    backgroundColor: filterOptions.playable
                      ? "inherit"
                      : "#9CCC65",
                    color: filterOptions.playable ? "#9CCC65" : "#000",
                    borderColor: filterOptions.playable
                      ? "#9CCC65"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("playable")}
                >
                  {filterStats.playable === undefined && (
                    <Spinner size="sm" />
                  )}
                  {playableFilterText}
                </Button>
                <Button
                  bordered={filterOptions.ingame}
                  disabled={filterStats.ingame === undefined}
                  css={{
                    backgroundColor: filterOptions.ingame
                      ? "inherit"
                      : "#29B6F6",
                    color: filterOptions.ingame ? "#29B6F6" : "#000",
                    borderColor: filterOptions.ingame
                      ? "#29B6F6"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("ingame")}
                >
                  {filterStats.ingame === undefined && (
                    <Spinner size="sm" />
                  )}
                  {ingameFilterText}
                </Button>
                <Button
                  bordered={filterOptions.menus}
                  disabled={filterStats.menus === undefined}
                  css={{
                    backgroundColor: filterOptions.menus
                      ? "inherit"
                      : "#FBC02D",
                    color: filterOptions.menus ? "#FBC02D" : "#000",
                    borderColor: filterOptions.menus
                      ? "#FBC02D"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("menus")}
                >
                  {filterStats.menus === undefined && (
                    <Spinner size="sm" />
                  )}
                  {menusFilterText}
                </Button>
                <Button
                  bordered={filterOptions.intro}
                  disabled={filterStats.intro === undefined}
                  css={{
                    backgroundColor: filterOptions.intro
                      ? "inherit"
                      : "#F57C00",
                    color: filterOptions.intro ? "#F57C00" : "#000",
                    borderColor: filterOptions.intro
                      ? "#F57C00"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("intro")}
                >
                  {filterStats.intro === undefined && (
                    <Spinner size="sm" />
                  )}
                  {introFilterText}
                </Button>
                <Button
                  bordered={filterOptions.nothing}
                  disabled={filterStats.nothing === undefined}
                  css={{
                    backgroundColor: filterOptions.nothing
                      ? "inherit"
                      : "#D32F2F",
                    color: filterOptions.nothing ? "#D32F2F" : "inherit",
                    borderColor: filterOptions.nothing
                      ? "#D32F2F"
                      : "inherit",
                  }}
                  auto
                  onPress={() => toggleFilter("nothing")}
                >
                  {filterStats.nothing === undefined && (
                    <Spinner size="sm" />
                  )}
                  {nothingFilterText}
                </Button>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-wrap gap-2 justify-center mt-5">
            {/* https://nextui.org/docs/components/table#paginated-table */}
            <Table
              isCompact
              fullWidth
              removeWrapper
              isStriped
              aria-label="Compatibility Table"
              bottomContent={
                <Pagination
                  isCompact
                  rowsPerPage={
                    loadingState == "loading"
                      ? 2
                      : Math.min(25, filteredData.length)
                  }
                  page={page}
                  onPageChange={setPage}
                  total={Math.ceil(filteredData.length / 25)}
                />
              }
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={filteredData} isLoading={isTableLoading}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell key={`${item.key}-${columnKey}`}>
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </Layout >
  );
}
