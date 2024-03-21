import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Container, Text, Grid, Switch } from "@nextui-org/react";
import Admonition from "@theme/Admonition";
import { ReleaseDownloadButton } from "../../components/ReleaseDownloadButton";
import { DownloadTable } from "../../components/DownloadTable";
import { getLatestRelease } from "../../components/ReleaseDownloadButton";
import Head from "@docusaurus/Head";
import { GoogleAd } from "../../components/GoogleAd";

const releaseTableColumns = [
  {
    key: "version",
    label: "VERSION",
  },
  {
    key: "createdAt",
    label: "DATE",
  },
];

const renderReleaseCell = (release, columnKey) => {
  const cellValue = release[columnKey];
  switch (columnKey) {
    case "version":
      return <span className="monospaced">{cellValue}</span>;
    default:
      const date = new Date(cellValue);
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  }
};

const baseApiUrl = "https://api.pcsx2.net/v1";

export default function Downloads() {
  const pageSize = 10;
  // State
  // - stables
  const [stableReleases, setStableReleases] = useState({ data: [] });
  const [latestStableRelease, setLatestStableRelease] = useState({});
  const [showPreviousStables, setShowPreviousStables] = useState(false);
  // - nightlies
  const [nightlyReleases, setNightlyReleases] = useState({ data: [] });
  const [latestNightlyRelease, setLatestNightlyRelease] = useState({});
  const [showPreviousNightlies, setShowPreviousNightlies] = useState(false);
  // general api
  const [apiErrorMsg, setApiErrorMsg] = useState(undefined);

  useEffect(async () => {
    let shouldShowPreviousNightlies = window.localStorage.getItem(
      "downloads-showPreviousNightlies"
    );
    if (shouldShowPreviousNightlies) {
      setShowPreviousNightlies(shouldShowPreviousNightlies === "true");
    }
    let shouldShowPreviousStables = window.localStorage.getItem(
      "downloads-showPreviousStables"
    );
    if (shouldShowPreviousStables) {
      setShowPreviousStables(shouldShowPreviousStables === "true");
    }

    try {
      const resp = await fetch(`${baseApiUrl}/latestReleasesAndPullRequests`);
      if (resp.status === 429) {
        setApiErrorMsg("You are Being Rate-Limited. Try Again Later!");
      } else if (resp.status !== 200) {
        setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
      } else {
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
      }
    } catch (err) {
      setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
    }
  }, []);

  return (
    <Layout
      title="Downloads"
      description="The official source for the latest stable and nightly builds (aka dev builds) for PCSX2 on all supported platforms"
    >
      <Head>
        <meta property="og:description" content="" />
        <meta
          name="keywords"
          content="pcsx2 downloads,pcsx2 dev builds,pcsx2 dev,pcsx2 nightlies,pcsx2 stable"
        />
      </Head>
      <main>
        <Container css={{ mt: "2em" }}>
          <Grid.Container gap={2}>
            <Grid xs={12} md={6}>
              <Grid.Container css={{ display: "inline-block" }}>
                <Grid xs={12}>
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
                </Grid>
                {apiErrorMsg === undefined ? null : (
                  <Grid xs={12}>
                    <Admonition type="danger" title={apiErrorMsg}>
                      <p>
                        If the issue persists, let us know. In the meantime:
                      </p>
                      <ul>
                        <li>
                          You can download releases directly from{" "}
                          <a
                            href="https://github.com/PCSX2/pcsx2/releases"
                            rel="noreferrer"
                            target="_blank"
                          >
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://stats.uptimerobot.com/GAg8AuBByx"
                            rel="noreferrer"
                            target="_blank"
                          >
                            Check our status page
                          </a>
                        </li>
                      </ul>
                    </Admonition>
                  </Grid>
                )}
                <Grid xs={12}>
                  <p>
                    Stable releases are infrequent but well tested compared to
                    the nightly releases
                  </p>
                </Grid>
                <Grid xs={12}>
                  <p>
                    If you need help using the emulator,{" "}
                    <a href="/docs/">see the following article.</a>
                  </p>
                </Grid>
                <Grid xs={12}>
                  <Admonition type="caution">
                    <p>
                      As we are now drawing closer to releasing a new stable
                      version, we encourage you to use the latest nightly
                      instead. If you encounter a problem, you will likely be
                      told to try the latest nightly as a first step.
                    </p>
                  </Admonition>
                </Grid>
                <Grid xs={12} css={{ mt: "2em" }}>
                  <ReleaseDownloadButton
                    release={latestStableRelease}
                    buttonText={"Latest Stable"}
                    isNightly={false}
                    errorMsg={apiErrorMsg}
                  />
                </Grid>
                <GoogleAd margins="2em"></GoogleAd>
                <Grid xs={12} css={{ mt: "1em" }}>
                  <Grid.Container alignItems="center" css={{ fontWeight: 700 }}>
                    <Switch
                      color="primary"
                      checked={showPreviousStables}
                      onChange={(e) => {
                        setShowPreviousStables(e.target.checked);
                        window.localStorage.setItem(
                          "downloads-showPreviousStables",
                          e.target.checked
                        );
                      }}
                    />
                    &nbsp;Show Previous Versions
                  </Grid.Container>
                </Grid>
                {!showPreviousStables ? null : (
                  <>
                    <Grid xs={12} css={{ mt: "2em" }}>
                      <h2>Previous Stable Releases</h2>
                    </Grid>
                    <Grid xs={12}>
                      <DownloadTable
                        pageSize={pageSize}
                        tableLabel={"Previous stable releases table"}
                        color={"primary"}
                        initialTableData={stableReleases}
                        tableColumns={releaseTableColumns}
                        renderRowFunc={renderReleaseCell}
                        fetchMoreFunc={async (offset) => {
                          return await fetch(
                            `${baseApiUrl}/stableReleases?offset=${offset}`
                          );
                        }}
                        tableType={"stable"}
                      />
                    </Grid>
                    <GoogleAd margins="2em"></GoogleAd>
                  </>
                )}
              </Grid.Container>
            </Grid>
            <Grid xs={12} md={6}>
              <Grid.Container css={{ display: "inline-block" }}>
                <Grid xs={12}>
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
                </Grid>
                {apiErrorMsg === undefined ? null : (
                  <Grid xs={12}>
                    <Admonition type="danger" title={apiErrorMsg}>
                      <p>
                        If the issue persists, let us know. In the meantime:
                      </p>
                      <ul>
                        <li>
                          You can download releases directly from{" "}
                          <a
                            href="https://github.com/PCSX2/pcsx2/releases"
                            rel="noreferrer"
                            target="_blank"
                          >
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://stats.uptimerobot.com/GAg8AuBByx"
                            rel="noreferrer"
                            target="_blank"
                          >
                            Check our status page
                          </a>
                        </li>
                      </ul>
                    </Admonition>
                  </Grid>
                )}
                <Grid xs={12}>
                  <p>
                    There is a new nightly release anytime a change is made, so
                    you are getting the latest and greatest (but sometimes
                    buggy) experience
                  </p>
                </Grid>
                <Grid xs={12} css={{ mt: "2em" }}>
                  <ReleaseDownloadButton
                    release={latestNightlyRelease}
                    buttonText={"Latest Nightly"}
                    isNightly={true}
                    errorMsg={apiErrorMsg}
                  />
                </Grid>
                <GoogleAd margins="2em"></GoogleAd>
                <Grid xs={12} css={{ mt: "1em" }}>
                  <Grid.Container alignItems="center" css={{ fontWeight: 700 }}>
                    <Switch
                      color="warning"
                      checked={showPreviousNightlies}
                      onChange={(e) => {
                        setShowPreviousNightlies(e.target.checked);
                        window.localStorage.setItem(
                          "downloads-showPreviousNightlies",
                          e.target.checked
                        );
                      }}
                    />
                    &nbsp;Show Previous Versions
                  </Grid.Container>
                </Grid>
                {!showPreviousNightlies ? null : (
                  <>
                    <Grid xs={12} css={{ mt: "2em" }}>
                      <h2>Previous Nightly Releases</h2>
                    </Grid>
                    <Grid xs={12}>
                      <DownloadTable
                        pageSize={pageSize}
                        tableLabel={"Previous nightly releases table"}
                        color={"warning"}
                        initialTableData={nightlyReleases}
                        tableColumns={releaseTableColumns}
                        renderRowFunc={renderReleaseCell}
                        fetchMoreFunc={async (offset) => {
                          return await fetch(
                            `${baseApiUrl}/nightlyReleases?offset=${offset}`
                          );
                        }}
                        tableType={"nightly"}
                      />
                    </Grid>
                    <GoogleAd margins="2em"></GoogleAd>
                  </>
                )}
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Container>
      </main>
    </Layout>
  );
}
