import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Text, Button, Row, Col, Card, Grid, getDocumentTheme } from "@nextui-org/react";
import { NumberTicker } from "../components/NumberTicker";
import { Animation } from '../components/SphereAnimation';
import { getLatestRelease } from '../components/ReleaseDownloadButton';
import BrowserOnly from "@docusaurus/BrowserOnly";
import { ReleaseDownloadButton } from '../components/ReleaseDownloadButton';
import { GoogleAd } from '../components/GoogleAd';
import { useMediaQuery } from "../utils/mediaQuery";
import { styled } from "@nextui-org/react";
import useBaseUrl from '@docusaurus/useBaseUrl';

const StyledTitle = styled("h1", {
  display: "inline",
  fontWeight: "$bold",
  color: "$text",
  lh: "1.2",
  fs: "2.5rem",
  "@sm": {
    fs: "3rem",
  },
  "@lg": {
    fs: "3.5rem",
  },
});

const StyledGradientTitle = styled(StyledTitle, {
  textGradient: "180deg, #5099ff 25%, #465eae 100%",
  "&::selection": {
    WebkitTextFillColor: "$colors$text",
  },
});

const StyledSubtitle = styled("p", {
  pl: "$1",
  fs: "$xl",
  width: "100%",
  display: "inline-flex",
  fontWeight: "$medium",
  color: "$accents7",
});

import CompatData from '@site/static/data/compat/data.min.json';

function getPlayableGameCount() {
  try {
    let count = 0;
    for (const entry of CompatData) {
      if (entry.status.toLowerCase() === "perfect" || entry.status.toLowerCase() === "playable") {
        count++;
      }
    }
    return count;
  } catch (e) {
    console.log(`Error retrieving playable game count - ${e}`);
    return 2667;
  }
}


import { latestProgressReport, latestBlog } from '../data/latestBlogs';

const baseApiUrl = "https://api.pcsx2.net/v1"

export default function Home() {
  const [latestStableRelease, setLatestStableRelease] = useState({});
  const [latestNightlyRelease, setLatestNightlyRelease] = useState({});
  const [apiErrorMsg, setApiErrorMsg] = useState(undefined);
  const [homePosterUrl, setHomePosterUrl] = useState("/img/home-poster.png")

  useEffect(async () => {
    try {
      const resp = await fetch(
        `${baseApiUrl}/latestReleasesAndPullRequests`
      );
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

    setHomePosterUrl(getDocumentTheme(document?.documentElement) === "dark" ? "/img/home-poster.png" : "/img/home-poster-light.png");

    const observer = new MutationObserver((mutation) => {
      setHomePosterUrl(getDocumentTheme(document?.documentElement) === "dark" ? "/img/home-poster.png" : "/img/home-poster-light.png");
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style', "class"]
    });
  }, []);

  return (
    <Layout
      title={`Home`}
      description="An Open-Source Playstation 2 Emulator">
      <main>
        {useMediaQuery(960) ? <img src={useBaseUrl(homePosterUrl)} style={{
                position: "absolute",
                minHeight: "calc(84vh - 76px)",
                width: "100%",
                objectFit: "cover"
              }} /> : <BrowserOnly>
              {() => (<Animation />
              )}
            </BrowserOnly>}
        <Grid.Container alignItems='center' gap={2} css={{
          position: "relative",
          minHeight: "calc(84vh - 76px)",
          zIndex: "$2",
          "@md": {
            pl: "5em",
            pr: "5em"
          },
          width: "100%",
          margin: 0
        }}>
          <Grid xs={12} md={6} direction="column">
            <Grid>
              <StyledGradientTitle css={{ mb: 0 }}>PCSX2&nbsp;</StyledGradientTitle>
              <StyledTitle css={{ mb: 0 }}>is an open source&nbsp;</StyledTitle>
              <StyledGradientTitle css={{ mb: 0 }}>PS2 Emulator</StyledGradientTitle>
            </Grid>
            <Grid>
              <StyledSubtitle>
                <span>
                  Supporting&nbsp;
                  <NumberTicker numberFunc={getPlayableGameCount} />
                  &nbsp;Games from the PS2 Library</span>
              </StyledSubtitle>
            </Grid>
            <Grid.Container direction="column" gap={2} alignItems={useMediaQuery(960) ? "center" : "flex-start"}>
              <Grid>
                <ReleaseDownloadButton
                  release={latestStableRelease}
                  buttonText={"Latest Stable"}
                  isNightly={false}
                  errorMsg={apiErrorMsg}
                />
              </Grid>
              <Grid>
                <ReleaseDownloadButton
                  release={latestNightlyRelease}
                  buttonText={"Latest Nightly"}
                  isNightly={true}
                  errorMsg={apiErrorMsg}
                />
              </Grid>
              <Grid>
                <a href={useBaseUrl("/downloads")} style={{ textDecoration: "none" }}>
                  <Button light color="secondary" css={{ minWidth: "200px" }}>
                    Previous Versions
                  </Button>
                </a>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={12} md={6} direction={"column"}>
            <Grid.Container gap={2}>
              <Grid md={6}>
                <a href={useBaseUrl(latestProgressReport.url)}>
                  <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                          Latest Progress Report
                        </Text>
                        <Text h4 color="white">
                          {latestProgressReport.title}
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Image
                      src={latestProgressReport.img}
                      objectFit="cover"
                      width="100%"
                      height={"300px"}
                      alt="Card image background"
                    />
                  </Card></a>
              </Grid>
            </Grid.Container>
            <Grid.Container gap={2}>
              <Grid xs={0} md={6}></Grid>
              <Grid md={6}>
                <a href={useBaseUrl(latestBlog.url)}>
                  <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                          Latest Blog
                        </Text>
                        <Text h4 color="white">
                          {latestBlog.title}
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Image
                      src={latestBlog.img}
                      objectFit="cover"
                      width="100%"
                      height={"300px"}
                      alt="Card image background"
                    />
                  </Card></a>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
        <Row justify='center'>
          <Col css={{
            "@md": {
              width: "50%"
            },
            "@mdMax": {
              width: "100%"
            }
          }}>
            <GoogleAd></GoogleAd>
          </Col>
        </Row>
        <Grid.Container gap={2} css={{
          "@md": {
            pl: "5em",
            pr: "5em"
          },
          "@mdMax": {
            pl: "2em",
            pr: "2em"
          },
          width: "100%",
          margin: 0
        }}>
          <Grid xs={12} direction="column" >
            <StyledTitle css={{ mb: 0 }}>About the Project</StyledTitle>
            <StyledSubtitle>
              Being almost as old as the console it is emulating, PCSX2 not only has a lot of history behind it, but a continually evolving future.
            </StyledSubtitle>
          </Grid>
          <Grid.Container gap={2}>
            <Grid md={4}>
              <span>PCSX2 is a free and open-source PlayStation 2 (PS2) emulator. Its purpose is to emulate the PS2's hardware, using a combination of MIPS CPU Interpreters, Recompilers and a Virtual Machine which manages hardware states and PS2 system memory.</span>
            </Grid>
            <Grid md={4}>
              <p>The project has been running for almost 20 years. Past versions could only run a few public domain game demos, but newer versions can run most games at full speed, including popular titles such as Final Fantasy X and Devil May Cry 3.</p>
            </Grid>
            <Grid md={4}>
              <p>A significant majority of the official PS2 library is considered playable or perfect, with the remainder at least making it to the menus. For more information on compatibility, see <Link to="/compat">here</Link>.</p>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2}><Grid xs={12}>
            <p>
              PCSX2 allows you to play PS2 games on your PC, with many additional features and benefits. A few of those benefits include:
              <ul>
                <li>custom resolutions and upscaling</li>
                <li>virtual and sharable memory cards</li>
                <li>save-states</li>
                <li>patching system</li>
                <li>internal recorder to achieve lossless quality at full speed</li>
              </ul>
            </p>
          </Grid></Grid.Container>
        </Grid.Container>
        {/* TODO - this page can be made more interesting once Qt comes out (showcase notable features with some visuals) */}
        <Row justify='center'>
          <Col css={{
            "@md": {
              width: "50%"
            },
            "@mdMax": {
              width: "100%"
            }
          }}>
            <GoogleAd></GoogleAd>
          </Col>
        </Row>
      </main>
    </Layout>
  );
}
