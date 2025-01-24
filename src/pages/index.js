import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { ReleaseDownloadButton } from "../components/ReleaseDownloadButton";
import { useTheme } from "next-themes";
import { NumberTicker } from "../components/NumberTicker";
import { getLatestRelease } from "../components/ReleaseDownloadButton";
import { GoogleAd } from "../components/GoogleAd";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useMediaQuery } from "../utils/mediaQuery";

const StyledTitle =
  "inline font-bold text-[2.5rem] leading-[1.2] text-current sm:text-[3rem] lg:text-[3.5rem]";
const StyledGradientTitle = `${StyledTitle} bg-clip-text text-transparent bg-gradient-to-b from-[#5099ff] to-[#465eae]`;
const StyledSubtitle =
  "pl-1 text-xl w-full inline-flex font-medium text-accents-9";

import CompatData from "@site/static/data/compat/data.min.json";

function getPlayableGameCount() {
  try {
    let count = 0;
    for (const entry of CompatData) {
      if (
        entry.status.toLowerCase() === "perfect" ||
        entry.status.toLowerCase() === "playable"
      ) {
        count++;
      }
    }
    return count;
  } catch (e) {
    console.log(`Error retrieving playable game count - ${e}`);
    return 2667;
  }
}

import {
  latestProgressReport,
  latestBlog,
  previousBlog,
  previousProgressReport,
} from "../data/latestBlogs";

import useIsBrowser from "@docusaurus/useIsBrowser";

let baseApiUrl = "https://apinew.pcsx2.net/v1";
let backupBaseApiUrl = "https://api.pcsx2.net/v1";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [latestStableRelease, setLatestStableRelease] = useState({});
  const [latestNightlyRelease, setLatestNightlyRelease] = useState({});
  const [apiErrorMsg, setApiErrorMsg] = useState(undefined);
  const [homeVideoPath, setHomeVideoPath] = useState("/videos/splash.webm");
  const isBrowser = useIsBrowser();

  if (isBrowser && window.location.hostname === "localhost") {
    baseApiUrl = "https://localhost:8001/v1";
  }

  const fetchLatestReleases = async () => {
    try {
      let resp = await fetch(`${baseApiUrl}/latestReleasesAndPullRequests`);
      // TODO: potentially retry with old URL, just temp code to ease migration
      if (resp.status !== 200) {
        resp = await fetch(`${backupBaseApiUrl}/latestReleasesAndPullRequests`);
      }

      if (resp.status === 429) {
        setApiErrorMsg("You are Being Rate-Limited. Try Again Later!");
      } else if (resp.status !== 200) {
        setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
      } else {
        const data = await resp.json();
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
      }
    } catch (err) {
      setApiErrorMsg("Unexpected API Error Occurred. Try Again Later!");
    }
  };

  useEffect(() => {
    fetchLatestReleases();
    setHomeVideoPath(
      theme === "dark" ? "/videos/splash.webm" : "/videos/splash-light.mp4",
    );
  }, [theme]);

  return (
    <Layout title={`Home`} description="An Open-Source Playstation 2 Emulator">
      <main className="docusaurus-reset">
        <video
          src={useBaseUrl(homeVideoPath)}
          autoPlay={true}
          loop={true}
          muted={true}
          className="absolute h-[50vh] w-full object-contain opacity-50"
          style={{
            backgroundColor: "var(--home-video-background-color)",
          }}
        />
        <div
          className="flex items-center justify-center gap-2 relative min-h-[50vh] z-2 w-full m-0"
          style={{ paddingLeft: "5em", paddingRight: "5em" }}
        >
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="text-center">
              <h1
                className={`${StyledGradientTitle} mb-0`}
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #5099ff 25%, #465eae 100%)",
                  "::selection": { WebkitTextFillColor: "var(--tw-text)" },
                }}
              >
                PCSX2&nbsp;
              </h1>
              <h1 className={`${StyledTitle} mb-0`}>is an open source&nbsp;</h1>
              <h1
                className={`${StyledGradientTitle} mb-0`}
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #5099ff 25%, #465eae 100%)",
                  "::selection": { WebkitTextFillColor: "var(--tw-text)" },
                }}
              >
                PS2 Emulator
              </h1>
            </div>
            <div>
              <p className={`${StyledSubtitle} justify-center`}>
                <span>
                  Supporting&nbsp;
                  <NumberTicker numberFunc={getPlayableGameCount} />
                  &nbsp;Games from the PS2 Library
                </span>
              </p>
            </div>
            <div className="flex gap-2 justify-center mt-5">
              <ReleaseDownloadButton
                release={latestStableRelease}
                buttonText="Latest Stable"
                isNightly={false}
                isDisabled={false}
                errorMsg={apiErrorMsg}
                placement={useMediaQuery(960) ? "bottom-start" : "left-start"}
              />
              <div className="flex flex-col">
                <ReleaseDownloadButton
                  release={latestNightlyRelease}
                  buttonText="Latest Nightly"
                  isNightly={true}
                  errorMsg={apiErrorMsg}
                />
                <Button
                  color="secondary"
                  className="mt-2 border-solid font-medium cursor-pointer hover:text-secondary hover:no-underline"
                  variant="bordered"
                  as={Link}
                  href={useBaseUrl("/downloads")}
                >
                  Previous Versions
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full container mx-auto">
          {/* Google Ad Section */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <GoogleAd />
            </div>
          </div>

          {/* Recent Blog Posts Section */}
          <div className="w-full mt-20 px-8 md:px-20">
            <div className="flex flex-col">
              <h1 className={`${StyledTitle} mb-0`}>Recent Blog Posts</h1>
              <p className={`${StyledSubtitle}`}>
                Articles that go more in-depth on how things work, how they were
                fixed, or sometimes why they don't.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Latest Blog */}
              <div className="flex justify-center">
                <a href={useBaseUrl(latestBlog.url)}>
                  <Card
                    radius={"md"}
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                  >
                    <Image
                      removeWrapper
                      className="z-0 w-full h-full object-contain"
                      src={latestBlog.img}
                      alt="Latest blog image"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                          <h2 className="text-base uppercase font-bold mb-0 text-white">
                            Latest Blog
                          </h2>
                          <p className="text-sm text-white/70">
                            {latestBlog.title}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              </div>

              {/* Previous Blog */}
              <div className="flex justify-center">
                <a href={useBaseUrl(previousBlog.url)}>
                  <Card
                    radius={"md"}
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                    style={{ all: "revert-layer" }}
                  >
                    <Image
                      removeWrapper
                      className="z-0 w-full h-full object-contain"
                      src={previousBlog.img}
                      alt="Previous blog image"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                          <h2 className="text-base uppercase font-bold mb-0 text-white">
                            Previous Blog
                          </h2>
                          <p className="text-sm text-white/70">
                            {previousBlog.title}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              </div>
            </div>
          </div>

          {/* Recent Progress Reports Section */}
          <div className="w-full px-8 md:px-20 mt-8 relative">
            <div className="flex flex-col">
              <h1 className={`${StyledTitle} mb-0`}>Recent Progress Reports</h1>
              <p className={`${StyledSubtitle}`}>
                Stay up to date on the latest improvements and fixes on the
                project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Latest Progress Report */}
              <div className="flex justify-center">
                <a href={useBaseUrl(latestProgressReport.url)}>
                  <Card
                    radius={"md"}
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                    style={{ all: "revert-layer" }}
                  >
                    <Image
                      removeWrapper
                      className="z-0 w-full h-full object-contain"
                      src={latestProgressReport.img}
                      alt="Latest progress report image"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                          <h2 className="text-base uppercase font-bold mb-0 text-white">
                            Latest Progress Report
                          </h2>
                          <p className="text-sm text-white/70">
                            {latestProgressReport.title}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              </div>

              {/* Previous Progress Report */}
              <div className="flex justify-center">
                <a href={useBaseUrl(previousProgressReport.url)}>
                  <Card
                    radius={"md"}
                    isFooterBlurred
                    className="w-full h-[300px] col-span-12 sm:col-span-7"
                    style={{ all: "revert-layer" }}
                  >
                    <Image
                      removeWrapper
                      className="z-0 w-full h-full object-contain"
                      src={previousProgressReport.img}
                      alt="Previous progress report image"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                          <h2 className="text-base uppercase font-bold mb-0 text-white">
                            Previous Progress Report
                          </h2>
                          <p className="text-sm text-white/70">
                            {previousProgressReport.title}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              </div>
            </div>
          </div>

          {/* About the Project Section */}
          <div className="w-full px-8 md:px-20 mt-20 relative">
            <div className="flex flex-col">
              <h1 className={`${StyledTitle} mb-0`}>About the Project</h1>
              <p className={`${StyledSubtitle}`}>
                PCSX2 has a lot of history and an evolving future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div>
                <p>
                  PCSX2 is a free and open-source PlayStation 2 (PS2) emulator.
                  Its purpose is to emulate the PS2's hardware, using a
                  combination of MIPS CPU Interpreters, Recompilers, and a
                  Virtual Machine that manages hardware states and system
                  memory.
                </p>
              </div>
              <div>
                <p>
                  The project has been running for almost 20 years. Past
                  versions could only run a few game demos, but newer versions
                  can run most games at full speed, including titles like Final
                  Fantasy X and Devil May Cry 3.
                </p>
              </div>
              <div>
                <p>
                  A significant majority of the PS2 library is considered
                  playable. For more info on compatibility, see{" "}
                  <Link to="/compat">here</Link>.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p>
                PCSX2 allows you to play PS2 games on your PC with added
                features like:
                <ul className="list-disc ml-5">
                  <li>Custom resolutions and upscaling</li>
                  <li>Virtual and sharable memory cards</li>
                  <li>Save-states</li>
                  <li>Patching system</li>
                  <li>Internal recorder for lossless quality at full speed</li>
                </ul>
              </p>
            </div>
          </div>

          {/* Google Ad Section */}
          <div className="flex justify-center mt-20">
            <div className="w-full md:w-1/2">
              <GoogleAd />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
