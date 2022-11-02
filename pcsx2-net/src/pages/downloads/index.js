import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Table, Grid, Tooltip, Badge, Link, Input, Card, Container, Row, Col, Text, Dropdown } from '@nextui-org/react';
import { BsWindows, BsBricks, BsApple } from "react-icons/bs";
import { FaLinux, FaHistory } from "react-icons/fa";
import { IoIosCloudyNight } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";
import styles from './index.module.css';

const baseApiUrl = location.hostname === "localhost" ? "http://localhost:3000/v1" : "https://api.pcsx2.net/v1"

// TODO - handle API error

function getLatestRelease(releases, platform) {
  for (const release of releases) {
    if (platform in release.assets && release.assets[platform].length > 0) {
      return release;
    }
  }
  return undefined;
}

function toProperCase(str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

function openAssetLink(href) {
  Object.assign(document.createElement('a'), {
    rel: 'noopener noreferrer',
    href: href,
  }).click();
}

function ReleaseDropdown(release, isNightly) {
  const windowsItems = [];
  const linuxItems = [];
  const macosItems = [];

  let fillColor = "var(--nextui-colors-primary)";
  if (isNightly) {
    fillColor = "var(--nextui-colors-warning)";
  }

  if (release?.windows) {
    for (const asset of release.windows.assets.Windows.filter(asset => !asset.additionalTags.includes("symbols"))) {
      let displayName = toProperCase(asset.displayName.replace("Windows", "").trim());
      if (asset.additionalTags.length > 0) {
        displayName += ` - ${asset.additionalTags.join(" ")}`;
      }

      windowsItems.push(
        <Dropdown.Item
          key={asset.url}
          description={release.windows.version}
          icon={<BsWindows size={22} fill={fillColor}></BsWindows>}
        >
          {displayName}
        </Dropdown.Item>
      )
    }
  }
  if (release?.linux) {
    for (const asset of release.linux.assets.Linux.filter(asset => !asset.additionalTags.includes("symbols"))) {
      let displayName = toProperCase(asset.displayName.replace("Linux", "").replace("AppImage", "").trim());
      if (asset.additionalTags.length > 0) {
        if (displayName === "") {
          displayName = asset.additionalTags.join(" ");
        } else {
          displayName += ` - ${asset.additionalTags.join(" ")}`;
        }
      }
      displayName = displayName.replace("64bit ", "64bit - ");

      linuxItems.push(
        <Dropdown.Item
          key={asset.url}
          description={release.linux.version}
          icon={<FaLinux size={22} fill={fillColor}></FaLinux>}
        >
          {displayName}
        </Dropdown.Item>
      )
    }
  }
  if (release?.macos) {
    for (const asset of release.macos.assets.MacOS.filter(asset => !asset.additionalTags.includes("symbols"))) {
      let displayName = toProperCase(asset.displayName.replace("MacOS", "").trim());
      if (asset.additionalTags.length > 0) {
        if (displayName === "") {
          displayName = asset.additionalTags.join(" ");
        } else {
          displayName += ` - ${asset.additionalTags.join(" ")}`;
        }
      }
      displayName = displayName.replace(".tar", "");

      macosItems.push(
        <Dropdown.Item
          key={asset.url}
          description={release.macos.version}
          icon={<BsApple size={22} fill={fillColor}></BsApple>}
        >
          {displayName}
        </Dropdown.Item>
      )
    }
  }

  const buttonStyling = {
    minWidth: "200px"
  };
  if (isNightly) {
    buttonStyling.color = "$warning";
    buttonStyling.bgColor = "$accents0";
  }

  return (
    <Dropdown isBordered placement="right-top" >
      <Dropdown.Button color="primary" css={buttonStyling}>
        Latest Stable
      </Dropdown.Button>
      <Dropdown.Menu
        color={isNightly ? "warning" : "primary"}
        aria-label="Actions"
        css={{ $$dropdownMenuWidth: "100%" }}
        onAction={(assetUrl) => openAssetLink(assetUrl)}
      >
        <Dropdown.Section title={windowsItems.length > 0 ? "Windows" : "Windows - None Available"}>
          {windowsItems}
        </Dropdown.Section>
        <Dropdown.Section title={linuxItems.length > 0 ? "Linux" : "Linux - None Available"}>
          {linuxItems}
        </Dropdown.Section>
        <Dropdown.Section title={macosItems.length > 0 ? "MacOS" : "MacOS - None Available"}>
          {macosItems}
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function ReleaseCard(release, isNightly) {
  if (!release) {
    return (null);
  }

  // TODO - Link to Github Release Page

  return (
    <Row>
      <Col>
        <Card css={{ p: "$6", mw: "100%" }}>
          <Card.Header>
            <Text h3 css={{ lineHeight: "$xs" }}>
              {release.version}
            </Text>
          </Card.Header>
          <Card.Body css={{ py: "$2" }}>
            <Text>
              {/* TODO - markdown render */}
              {release.description}
            </Text>
          </Card.Body>
          <Card.Footer>
            {/* FIX! */}
            {ReleaseDropdown(release, isNightly)}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

const stableReleaseColumns = [
  {
    key: "version",
    label: "VERSION",
  },
  {
    key: "createdAt",
    label: "DATE",
  }
];

const renderCell = (user, columnKey) => {
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "version":
      return <span className="monospaced">{cellValue}</span>
    default:
      const date = new Date(cellValue);
      return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
};

export default function Downloads() {
  // State
  const [stableReleases, setStableReleases] = useState({ data: [] });
  const [stableReleasesLoadingState, setStableReleasesLoadingState] = useState("idle"); // TODO
  const [stableReleasesPage, setStableReleasesPage] = useState(1);
  const [latestStableRelease, setLatestStableRelease] = useState({});
  const [selectedStableRelease, setSelectedStableRelease] = useState(undefined);

  const [nightlyReleases, setNightlyReleases] = useState({ data: [] });
  const [nightlyReleasesLoadingState, setNightlyReleasesLoadingState] = useState("idle"); // TODO
  const [nightlyReleasesPage, setNightlyReleasesPage] = useState(1);
  const [latestNightlyRelease, setLatestNightlyRelease] = useState({});

  useEffect(async () => {
    const resp = await fetch(
      `${baseApiUrl}/latestReleasesAndPullRequests`
    );
    const data = await resp.json();

    // Stable Releases
    // NOTE - iterate through the releases to find the latest for each platform
    // - this does mean there is an edge-case where a valid version is on the next page but this
    // is not actually a problem we currently have and should be solved at the API level
    setLatestStableRelease({
      windows: getLatestRelease(data.stableReleases.data, "Windows"),
      linux: getLatestRelease(data.stableReleases.data, "Linux"),
      macos: getLatestRelease(data.stableReleases.data, "MacOS"),
    });

    setLatestNightlyRelease({
      windows: getLatestRelease(data.nightlyReleases.data, "Windows"),
      linux: getLatestRelease(data.nightlyReleases.data, "Linux"),
      macos: getLatestRelease(data.nightlyReleases.data, "MacOS"),
    });

    setStableReleases(data.stableReleases);
    setNightlyReleases(data.nightlyReleases);
  }, []);

  return (
    <Layout
      title="Downloads"
      description="TODO">
      <main>
        <Container css={{ mt: "2em" }}>
          <Row gap={2}>
            <Col span={6}>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "180deg, #5099ff 25%, #465eae 100%",
                }}
                weight="bold"
              >
                Stable Releases
              </Text>
              <Row css={{ mb: "1em" }}>
                <Col><span>Stable releases are infrequent but well tested compared to the nightly releases.</span></Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col><span>If you need help using the emulator, <a href="/docs/usage/setup/">see the following article.</a></span></Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col><span>Please note that as we are now drawing closer to releasing a new stable version, we encourage you to use the latest nightly instead. If you encounter a problem, you will likely be told to try the latest nightly as a first step.</span></Col>
              </Row>
              <Row css={{ mb: "2em" }}>
                <Col>
                  {ReleaseDropdown(latestStableRelease, false)}
                </Col>
              </Row>
              <Row>
                <Col><h2>Previous Versions</h2></Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    striped
                    compact
                    sticked
                    selectionMode={"single"}
                    onSelectionChange={(selection) => {
                      if (selection.size <= 0) {
                        setSelectedStableRelease(undefined);
                      } else {
                        setSelectedStableRelease([...selection][0]);
                      }
                    }}
                    aria-label="Stable Release Table"
                    css={{
                      height: "auto",
                      minWidth: "100%",
                      display: "table",
                      noMargin: true,
                      padding: 0
                    }}
                  >
                    <Table.Header columns={stableReleaseColumns}>
                      {(column) => (
                        <Table.Column key={column.key}>{column.label}</Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={stableReleases.data} loadingState={stableReleasesLoadingState}>
                      {(item) => (
                        <Table.Row key={stableReleases.data.indexOf(item)}>
                          {(columnKey) => (
                            <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      noMargin
                      align="center"
                      rowsPerPage={stableReleasesLoadingState == "loading" ? 2 : Math.min(10, stableReleases?.pageInfo?.total)}
                      page={stableReleasesPage}
                      onPageChange={setStableReleasesPage}
                      total={Math.ceil(stableReleases?.pageInfo?.total / 10)}
                    />
                  </Table>
                </Col>
              </Row>
              { selectedStableRelease === undefined ? ReleaseCard(undefined, false) : ReleaseCard(stableReleases.data[selectedStableRelease], false)}
            </Col>
            <Col span={6}>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "180deg, $warning 25%, #777500 100%",
                }}
                weight="bold"
              >
                Nightly Releases
              </Text>
              <Row css={{ mb: "1em" }}>
                <Col><span>There is a new nightly release anytime a change is made, so you are getting the latest and greatest (but sometimes buggy) experience</span></Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col><span>For help using these releases, <a href="/docs/usage/nightly-setup/">see the following article.</a></span></Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col><span>Please note that as we are drawing closer to releasing a new stable version, we encourage you to use the latest nightly instead. If you encounter a problem, you will likely be told to try the latest nightly as a first step.</span></Col>
              </Row>
              <Row css={{ mb: "2em" }}>
                <Col>
                  {ReleaseDropdown(latestNightlyRelease, true)}
                </Col>
              </Row>
              <Row>
                <Col><h2>Previous Versions</h2></Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    striped
                    compact
                    sticked
                    selectionMode={"single"}
                    aria-label="Stable Release Table"
                    css={{
                      height: "auto",
                      minWidth: "100%",
                      display: "table",
                      noMargin: true,
                      padding: 0
                    }}
                  >
                    <Table.Header columns={stableReleaseColumns}>
                      {(column) => (
                        <Table.Column key={column.key}>{column.label}</Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body items={nightlyReleases.data} loadingState={nightlyReleasesLoadingState}>
                      {(item) => (
                        <Table.Row key={nightlyReleases.data.indexOf(item)}>
                          {(columnKey) => (
                            <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                          )}
                        </Table.Row>
                      )}
                    </Table.Body>
                    <Table.Pagination
                      noMargin
                      align="center"
                      rowsPerPage={nightlyReleasesLoadingState == "loading" ? 2 : Math.min(10, nightlyReleases?.pageInfo?.total)}
                      page={nightlyReleasesPage}
                      onPageChange={setNightlyReleasesPage}
                      total={Math.ceil(nightlyReleases?.pageInfo?.total / 10)}
                    />
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col><h2>Active Pull Requests</h2></Col>
              </Row>
              <Row>
                <Col>These are changes that are actively being worked on.</Col>
              </Row>
              <Row>
                <Col>Provided for visibility or for those interested in testing an upcoming change</Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    compact
                    striped
                    sticked
                    selectionMode={"single"}
                    aria-label="Stable Release Table"
                    css={{
                      height: "auto",
                      minWidth: "100%",
                      display: "table",
                      noMargin: true,
                      padding: 0
                    }}
                  >
                    <Table.Header>
                      <Table.Column>AUTHOR</Table.Column>
                      <Table.Column>CHANGE</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row key="1">
                        <Table.Cell>Tony Reichert</Table.Cell>
                        <Table.Cell>CEO</Table.Cell>
                      </Table.Row>
                      <Table.Row key="2">
                        <Table.Cell>Zoey Lang</Table.Cell>
                        <Table.Cell>Technical Lead</Table.Cell>
                      </Table.Row>
                      <Table.Row key="3">
                        <Table.Cell>Jane Fisher</Table.Cell>
                        <Table.Cell>Senior Developer</Table.Cell>
                      </Table.Row>
                      <Table.Row key="4">
                        <Table.Cell>William Howard</Table.Cell>
                        <Table.Cell>Community Manager</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </Layout>
  );
}
