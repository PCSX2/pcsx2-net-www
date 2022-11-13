import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Container, Text, Row, Col, Card } from "@nextui-org/react";
import { NumberTicker } from "../components/NumberTicker";
import { Animation } from '../components/SphereAnimation';
import { getLatestRelease } from '../components/ReleaseDownloadButton';
import BrowserOnly from "@docusaurus/BrowserOnly";
import { ReleaseDownloadButton } from '../components/ReleaseDownloadButton';
import { GoogleAd } from '../components/GoogleAd';

import { styled } from "@nextui-org/react";

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

async function getPlayableGameCount() {
  try {
    const resp = await fetch(
      `/data/compat/data.min.json`
    );
    const data = await resp.json();
    let count = 0;
    for (const entry of data) {
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

import { latestProgressReport, latestBlog } from './LatestBlogs';
const baseApiUrl = location.hostname === "localhost" ? "http://localhost:3000/v1" : "https://api.pcsx2.net/v1"

export default function Home() {
  const [latestStableRelease, setLatestStableRelease] = useState({});
  const [latestNightlyRelease, setLatestNightlyRelease] = useState({});

  useEffect(async () => {
    const resp = await fetch(
      `${baseApiUrl}/latestReleasesAndPullRequests`
    );
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
  }, []);

  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />">
      <main>
        <BrowserOnly>
          {() => (
            <Animation />
          )}
        </BrowserOnly>
        <Container
          alignItems="center"
          as="section"
          css={{
            position: "relative",
            height: "calc(84vh - 76px)",
            "@xsMax": {
              height: "calc(100vh - 64px)",
            },
          }}
          display="flex"
          gap={0}
          justify="space-between"
          lg={true}
          wrap="nowrap"
        >
          <Row
            align="center"
            css={{
              zIndex: "$2",
              "@mdMax": {
                mt: "80px",
                p: "0 8px",
              },
              "@xsMax": {
                mt: "0px",
              },
            }}
            wrap="wrap"
          >
            <Col
              css={{
                position: "relative",
                zIndex: "$2",
                "@md": {
                  width: "50%",
                },
                "@mdMax": {
                  width: "100%",
                },
              }}
            >
              <Row>
                <Col>
                  <StyledGradientTitle css={{ mb: 0 }}>PCSX2&nbsp;</StyledGradientTitle>
                  <StyledTitle css={{ mb: 0 }}>is an open source&nbsp;</StyledTitle>
                  <StyledGradientTitle css={{ mb: 0 }}>PS2 Emulator&nbsp;</StyledGradientTitle>
                  <StyledSubtitle>
                    <span>Supporting&nbsp;</span>
                    <NumberTicker numberFunc={getPlayableGameCount} />
                    <span>&nbsp;Games from the PS2 Library</span>
                  </StyledSubtitle>
                </Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col>
                  <ReleaseDownloadButton
                    release={latestStableRelease}
                    buttonText={"Latest Stable"}
                    isNightly={false}
                  />
                </Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col>
                  <ReleaseDownloadButton
                    release={latestNightlyRelease}
                    buttonText={"Latest Nightly"}
                    isNightly={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link color="secondary" href="/downloads">
                    Previous Versions
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col css={{
              position: "relative",
              zIndex: "$2",
              "@md": {
                width: "50%",
              },
              "@mdMax": {
                width: "100%",
              },
            }}>
              <Row css={{ p: "1em" }}>
                <Col span={6}>
                  <a href={latestProgressReport.url}>
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
                        height={340}
                        alt="Card image background"
                      />
                    </Card></a>
                </Col>
              </Row>
              <Row css={{ p: "1em" }}>
                <Col span={6} offset={5} >
                <a href={latestBlog.url}>
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
                        height={340}
                        alt="Card image background"
                      />
                    </Card></a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {/* TODO - this page can be made more interesting once Qt comes out (showcase notable features with some visuals) */}
        <Container
          as="section"
          display="flex"
          gap={0}
          justify="space-between">
          <Row css={{
            "@mdMax": {
              mt: "80px",
              p: "0 8px",
            },
            "@xsMax": {
              mt: "0px",
            },
          }}>
            <Col span={6} css={{ mt: "3em", mb: "2em" }}>
              <StyledTitle css={{ mb: 0 }}>About the Project</StyledTitle>
              <StyledSubtitle>
                Being almost as old as the console it is emulating, PCSX2 not only has a lot of history behind it, but a continually evolving future.
              </StyledSubtitle>
            </Col>
          </Row>
          <Row gap={2} css={{ mb: "2em" }}>
            <Col span={4}>
              PCSX2 is a free and open-source PlayStation 2 (PS2) emulator. Its purpose is to emulate the PS2's hardware, using a combination of MIPS CPU Interpreters, Recompilers and a Virtual Machine which manages hardware states and PS2 system memory.
            </Col>
            <Col span={4}>
              The project has been running for almost 20 years. Past versions could only run a few public domain game demos, but newer versions can run most games at full speed, including popular titles such as Final Fantasy X and Devil May Cry 3.
            </Col>
            <Col span={4}>
              Over 98% of the official PS2 library is considered playable or perfect, with the remainder at least making it to the menus. For more information on compatibility, see here.
            </Col>
          </Row>
          <Row gap={2}>
            <Col>
              PCSX2 allows you to play PS2 games on your PC, with many additional features and benefits. A few of those benefits include:
              <ul>
                <li>custom resolutions and upscaling</li>
                <li>virtual and sharable memory cards</li>
                <li>save-states</li>
                <li>patching system</li>
                <li>internal recorder to achieve lossless quality at full speed</li>
              </ul>
            </Col>
          </Row>
          {/* <GoogleAd doubleAd></GoogleAd> */}
        </Container>
      </main>
    </Layout>
  );
}
