import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Tooltip, Button, Grid, Container, Text, Row, Col, Dropdown, Card } from "@nextui-org/react";
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

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

import { BsWindows, BsBricks, BsApple } from "react-icons/bs";
import { FaLinux, FaHistory } from "react-icons/fa";
import { IoIosCloudyNight } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />">
      <main>
        <Container
          alignItems="center"
          as="section"
          className="hero__container"
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
            className="hero__content"
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
              className="hero__left-container"
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

                  <StyledSubtitle className="hero__text-subtitle">
                    {/* TODO - make this a ticker of the current number of games considered playable */}
                    Supporting Over 98% Of The Original PS2 Library
                  </StyledSubtitle>
                </Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col>
                  <Dropdown placement="right-top">
                    <Dropdown.Button solid color="primary" css={{ minWidth: "200px" }}>
                      <GiBrickWall size={16}></GiBrickWall>&nbsp;Latest Stable
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color="primary"
                      aria-label="Actions"
                      css={{ $$dropdownMenuWidth: "280px" }}
                    >
                      <Dropdown.Section title="Windows">
                        <Dropdown.Item
                          key="win32"
                          description="v1.2.3"
                          icon={<BsWindows size={22} fill="var(--nextui-colors-primary)"></BsWindows>}
                        >
                          32-bit
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="win64"
                          description="v1.2.3"
                          icon={<BsWindows size={22} fill="var(--nextui-colors-primary)"></BsWindows>}
                        >
                          64-bit
                        </Dropdown.Item>
                      </Dropdown.Section>
                      <Dropdown.Section title="Linux">
                        <Dropdown.Item
                          key="linux32"
                          description="v1.2.3"
                          icon={<FaLinux size={22} fill="var(--nextui-colors-primary)"></FaLinux>}
                        >
                          32-bit
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="linux64"
                          description="v1.2.3"
                          icon={<FaLinux size={22} fill="var(--nextui-colors-primary)"></FaLinux>}
                        >
                          64-bit
                        </Dropdown.Item>
                      </Dropdown.Section>
                      <Dropdown.Section title="MacOS">
                        <Dropdown.Item
                          key="macOS"
                          description="v1.2.3"
                          icon={<BsApple size={22} fill="var(--nextui-colors-primary)"></BsApple>}
                        >
                          Not Available
                        </Dropdown.Item>
                      </Dropdown.Section>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row css={{ mb: "1em" }}>
                <Col>
                  <Dropdown placement="right-top">
                    <Dropdown.Button auto solid color="primary" css={{ minWidth: "200px", color: '$warning', bgColor: '$accents0' }}>
                      <IoIosCloudyNight size={22}></IoIosCloudyNight>&nbsp;Latest Nightly
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color="warning"
                      aria-label="Actions"
                      css={{ $$dropdownMenuWidth: "280px" }}
                    >
                      <Dropdown.Section title="Windows">
                        <Dropdown.Item
                          key="win32"
                          description="v1.2.3"
                          icon={<BsWindows size={22} fill="var(--nextui-colors-warning)"></BsWindows>}
                        >
                          32-bit
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="win64"
                          description="v1.2.3"
                          icon={<BsWindows size={22} fill="var(--nextui-colors-warning)"></BsWindows>}
                        >
                          64-bit
                        </Dropdown.Item>
                      </Dropdown.Section>
                      <Dropdown.Section title="Linux">
                        <Dropdown.Item
                          key="linux32"
                          description="v1.2.3"
                          icon={<FaLinux size={22} fill="var(--nextui-colors-warning)"></FaLinux>}
                        >
                          32-bit
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="linux64"
                          description="v1.2.3"
                          icon={<FaLinux size={22} fill="var(--nextui-colors-warning)"></FaLinux>}
                        >
                          64-bit
                        </Dropdown.Item>
                      </Dropdown.Section>
                      <Dropdown.Section title="MacOS">
                        <Dropdown.Item
                          key="macOS"
                          description="v1.2.3"
                          icon={<BsApple size={22} fill="var(--nextui-colors-warning)"></BsApple>}
                        >
                          Not Available
                        </Dropdown.Item>
                      </Dropdown.Section>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button light color="secondary" auto>
                    Previous Versions
                  </Button>
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
                  <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                          Latest Progress Report
                        </Text>
                        <Text h4 color="white">
                          Stream the Acme event
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Image
                      src="https://nextui.org/images/card-example-4.jpeg"
                      objectFit="cover"
                      width="100%"
                      height={340}
                      alt="Card image background"
                    />
                  </Card>
                </Col>
              </Row>
              <Row css={{ p: "1em" }}>
                <Col span={6} offset={5} >
                  <Card>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                      <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                          Latest Blog
                        </Text>
                        <Text h4 color="white">
                          Stream the Acme event
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Image
                      src="https://nextui.org/images/card-example-4.jpeg"
                      objectFit="cover"
                      width="100%"
                      height={340}
                      alt="Card image background"
                    />
                  </Card>
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
            <Col span={6}>
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
        </Container>
      </main>
    </Layout>
  );
}
