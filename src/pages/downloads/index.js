import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Switch } from "@heroui/react";
import Admonition from "@theme/Admonition";
import { ReleaseDownloadButton } from "../../components/ReleaseDownloadButton";
import { DownloadTable } from "../../components/DownloadTable";
import { getLatestRelease } from "../../components/ReleaseDownloadButton";
import Head from "@docusaurus/Head";
import ReactMarkdown from "react-markdown";
import { IoIosCloudyNight } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";
import { GoogleAd } from "../../components/GoogleAd";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const releaseTableColumns = [
  {
    key: "version",
    label: "VERSION",
  },
  {
    key: "releaseInfo",
    label: "RELEASE DATE",
  },
];

const renderReleaseCell = (release, columnKey, isNightly, isSelected) => {
  const cellValue = release[columnKey];
  switch (columnKey) {
    case "version":
      return <span className="monospaced">{cellValue}</span>;
    default:
      const date = new Date(release.createdAt);
      const dateString = date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
      });
      if (!isSelected) {
        return dateString;
      } else {
        return (
          <div className="flex flex-col">
            <div className="mb-2">
              <em>{dateString}</em>
            </div>
            <div className="mb-2 remove-last-bottom-margin">
              <ReactMarkdown>{release.description}</ReactMarkdown>
            </div>
            <div>
              <ReleaseDownloadButton
                release={release}
                buttonText={"Download Release"}
                isNightly={isNightly}
                bordered={true}
              />
            </div>
          </div>
        );
      }
  }
};

let baseApiUrl = "https://api.pcsx2.net/v1";
const fallbackStableTag = "v2.4.0";

export default function Downloads() {
  const isBrowser = useIsBrowser();

  if (isBrowser && window.location.hostname === "localhost") {
    baseApiUrl = "https://localhost:8001/v1";
  }

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
  const [stableFallbackLink, setStableFallbackLink] = useState(undefined);
  const [nightlyFallbackLink, setNightlyFallbackLink] = useState(undefined);

  const fetchFallbackReleases = async () => {
    const stableRelease = await fetch(
      `https://api.github.com/repos/PCSX2/pcsx2/releases/tags/${fallbackStableTag}`,
    );
    if (!stableRelease.ok) {
      setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
      return;
    }
    const releaseList = await fetch(
      `https://api.github.com/repos/PCSX2/pcsx2/releases`,
    );
    if (!releaseList.ok) {
      setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
      return;
    }
    const releaseListData = await releaseList.json();
    const stableReleaseData = await stableRelease.json();
    setApiErrorMsg(`Main Release API Down, Use GitHub in the meantime.`);
    setStableFallbackLink(stableReleaseData.html_url);
    if (releaseListData.length > 0) {
      // it is incredibly unlikely that there is an outage at the same time that our latest is the latest stable
      setNightlyFallbackLink(releaseListData[0].html_url);
    }
  };

  const fetchLatestReleases = async () => {
    try {
      let resp = await fetch(`${baseApiUrl}/latestReleasesAndPullRequests`);
      if (resp.status === 429) {
        setApiErrorMsg("You are Being Rate-Limited. Try Again Later!");
      } else if (resp.status !== 200) {
        await fetchFallbackReleases();
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
      await fetchFallbackReleases();
    }
  };

  useEffect(() => {
    let shouldShowPreviousNightlies = window.localStorage.getItem(
      "downloads-showPreviousNightlies",
    );
    if (shouldShowPreviousNightlies) {
      setShowPreviousNightlies(shouldShowPreviousNightlies === "true");
    }
    let shouldShowPreviousStables = window.localStorage.getItem(
      "downloads-showPreviousStables",
    );
    if (shouldShowPreviousStables) {
      setShowPreviousStables(shouldShowPreviousStables === "true");
    }

    fetchLatestReleases();
  }, []);

  if (!ExecutionEnvironment.canUseDOM) {
    return <></>;
  }
  return (
    <Layout
      title="Downloads"
      description="The official source for the latest stable and nightly builds of PCSX2 on all supported platforms"
    >
      <Head>
        <meta property="og:description" content="" />
        <meta
          name="keywords"
          content="pcsx2 downloads,pcsx2 dev builds,pcsx2 dev,pcsx2 nightlies,pcsx2 stable"
        />
      </Head>
      <main className="docusaurus-reset">
        <div className="container mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Stable Releases */}
            <div>
              <div className="inline-block">
                <div>
                  <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#5099ff] to-[#465eae]">
                    Stable Releases
                    <span className="h1-icon-spacer" />
                    <GiBrickWall className="h1-icon stable-blue" />
                  </h1>
                </div>
                {apiErrorMsg !== undefined && (
                  <div>
                    <Admonition type="danger" title={apiErrorMsg}>
                      <p>
                        If the issue persists, let us know. In the meantime:
                      </p>
                      <ul>
                        <li>
                          You can download releases directly from{" "}
                          <a
                            href="https://github.com/PCSX2/pcsx2/releases"
                            target="_blank"
                            rel="noreferrer"
                            className="stable-blue hover:underline"
                          >
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://stats.uptimerobot.com/GAg8AuBByx"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Check our status page
                          </a>
                        </li>
                      </ul>
                    </Admonition>
                  </div>
                )}
                <div>
                  <p>
                    Stable releases are infrequent but well-tested compared to
                    the nightly releases.
                  </p>
                </div>
                <div>
                  <p>
                    If you need help using the emulator,{" "}
                    <a href="/docs/" className="text-blue-500 hover:underline">
                      see the documentation.
                    </a>
                  </p>
                </div>
                <div className="mt-8">
                  <ReleaseDownloadButton
                    release={latestStableRelease}
                    buttonText={"Latest Stable"}
                    isNightly={false}
                    errorMsg={apiErrorMsg}
                    fallbackLink={stableFallbackLink}
                  />
                </div>
                <GoogleAd margins="2em" />
                <div className="mt-4">
                  <div className="flex items-center font-bold">
                    <Switch
                      color="primary"
                      defaultSelected={
                        window.localStorage.getItem(
                          "downloads-showPreviousStables",
                        ) === "true"
                      }
                      checked={showPreviousStables}
                      onChange={(e) => {
                        setShowPreviousStables(e.target.checked);
                        window.localStorage.setItem(
                          "downloads-showPreviousStables",
                          e.target.checked,
                        );
                      }}
                    />
                    &nbsp;Show Previous Versions
                  </div>
                </div>
                {showPreviousStables && (
                  <>
                    <div className="mt-8">
                      <h2>Previous Stable Releases</h2>
                    </div>
                    <div>
                      <DownloadTable
                        pageSize={pageSize}
                        tableLabel={"Previous stable releases table"}
                        color={"primary"}
                        initialTableData={stableReleases}
                        tableColumns={releaseTableColumns}
                        renderRowFunc={renderReleaseCell}
                        fetchMoreFunc={async (offset) => {
                          let resp = await fetch(
                            `${baseApiUrl}/stableReleases?offset=${offset}`,
                          );
                          return resp;
                        }}
                        tableType={"stable"}
                      />
                    </div>
                    <GoogleAd margins="2em" />
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Nightly Releases */}
            <div>
              <div className="inline-block">
                <div>
                  <h1 className="bg-clip-text text-transparent bg-gradient-to-b to-[#777500] from-[#f2a40a]">
                    Nightly Releases
                    <span className="h1-icon-spacer" />
                    <IoIosCloudyNight className="h1-icon nightly-orange" />
                  </h1>
                </div>
                {apiErrorMsg !== undefined && (
                  <div>
                    <Admonition type="danger" title={apiErrorMsg}>
                      <p>
                        If the issue persists, let us know. In the meantime:
                      </p>
                      <ul>
                        <li>
                          You can download releases directly from{" "}
                          <a
                            href="https://github.com/PCSX2/pcsx2/releases"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://stats.uptimerobot.com/GAg8AuBByx"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Check our status page
                          </a>
                        </li>
                      </ul>
                    </Admonition>
                  </div>
                )}
                <div>
                  <p>
                    Nightly releases always have the newest features but are
                    less tested than the stable releases.
                  </p>
                </div>
                <div>
                  <p>
                    If you need help using the emulator,{" "}
                    <a href="/docs/" className="nightly-orange hover:underline">
                      see the documentation.
                    </a>
                  </p>
                </div>
                <div className="mt-8">
                  <ReleaseDownloadButton
                    release={latestNightlyRelease}
                    buttonText={"Latest Nightly"}
                    isNightly={true}
                    errorMsg={apiErrorMsg}
                    fallbackLink={nightlyFallbackLink}
                  />
                </div>
                <GoogleAd margins="2em" />
                <div className="mt-4">
                  <div className="flex items-center font-bold">
                    <Switch
                      color="warning"
                      defaultSelected={
                        window.localStorage.getItem(
                          "downloads-showPreviousNightlies",
                        ) === "true"
                      }
                      checked={showPreviousNightlies}
                      onChange={(e) => {
                        setShowPreviousNightlies(e.target.checked);
                        window.localStorage.setItem(
                          "downloads-showPreviousNightlies",
                          e.target.checked,
                        );
                      }}
                    />
                    &nbsp;Show Previous Versions
                  </div>
                </div>
                {showPreviousNightlies && (
                  <>
                    <div className="mt-8">
                      <h2>Previous Nightly Releases</h2>
                    </div>
                    <div>
                      <DownloadTable
                        pageSize={pageSize}
                        tableLabel={"Previous nightly releases table"}
                        color={"warning"}
                        initialTableData={nightlyReleases}
                        tableColumns={releaseTableColumns}
                        renderRowFunc={renderReleaseCell}
                        fetchMoreFunc={async (offset) => {
                          let resp = await fetch(
                            `${baseApiUrl}/nightlyReleases?offset=${offset}`,
                          );
                          return resp;
                        }}
                        tableType={"nightly"}
                      />
                    </div>
                    <GoogleAd margins="2em" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
