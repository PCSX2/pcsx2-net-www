import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Tooltip, Button, Grid, Container, Text, Row, Col, Dropdown, Card } from "@nextui-org/react";
import styles from './index.module.css';
import { NumberTicker } from "../components/NumberTicker";
import { Animation } from '../components/SphereAnimation';

import BrowserOnly from "@docusaurus/BrowserOnly";

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

function resizeCanvas(context, canvas) {
  const { width, height } = canvas.getBoundingClientRect()
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
}

const Canvas = props => {

  const canvasRef = useRef(null);

  let initialSpheres = 25;
  let maxVelocity = 0.25;
  let minVelocity = -0.25;
  let maxTtl = 10000;
  let maxRadius = 6;
  let minRadius = 2;
  let spheres = [];
  let mouseX = undefined;
  let mouseY = undefined;

  let colors = [
    "#00d4ca", "#ff5653", "#8dbbf2", "#f887d6"
  ]

  const predraw = (context, canvas) => {
    context.save()
    resizeCanvas(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
  }

  const draw = (ctx, frameCount) => {
    // Create spheres if it hasnt been done before
    if (spheres.length === 0) {
      // TODO - issue if they resize probably?
      // TODO - temp larger size when spawning in?
      for (let i = 0; i < initialSpheres; i++) {
        spheres.push({
          x: Math.random() * ctx.canvas.width,
          y: Math.random() * ctx.canvas.height,
          r: Math.random() * maxRadius + minRadius,
          color: colors[Math.floor(Math.random() * 4)],
          xvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
          yvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
          ttl: frameCount + (Math.random() * maxTtl + 50),
          flipVel: false
        });
      }
    }

    // Update the position of all spheres
    for (let i = 0; i < spheres.length; i++) {
      // See if we should adjust the velocity to avoid the mouse (flip it)
      if (mouseX && mouseY) {
        const dist = Math.sqrt(Math.pow((spheres[i].x - mouseX), 2) + Math.pow((spheres[i].y - mouseY), 2));
        spheres[i].flipVel = dist < 50.0;
      } else {
        spheres[i].flipVel = false;
      }

      if (spheres[i].flipVel) {
        spheres[i].x += spheres[i].xvel * -1.0;
        spheres[i].y += spheres[i].yvel * -1.0;
      } else {
        spheres[i].x += spheres[i].xvel;
        spheres[i].y += spheres[i].yvel;
      }

      if (
        spheres[i].ttl < frameCount
        || (spheres[i].x - spheres[i].r) <= 0
        || (spheres[i].y - spheres[i].r) <= 0
        || (spheres[i].x + spheres[i].r) >= ctx.canvas.width
        || (spheres[i].y + spheres[i].r) >= ctx.canvas.height
      ) {
        // re-init the sphere
        spheres[i] = {
          x: Math.random() * ctx.canvas.width,
          y: Math.random() * ctx.canvas.height,
          r: Math.random() * maxRadius + minRadius,
          color: colors[Math.floor(Math.random() * 4)],
          xvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
          yvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
          ttl: frameCount + (Math.random() * maxTtl + 50)
        }
      }
    }

    // Draw lines between spheres if they are close enough
    for (let i = 0; i < spheres.length; i++) {
      for (let j = 0; j < spheres.length; j++) {
        const dist = Math.sqrt(Math.pow((spheres[i].x - spheres[j].x), 2) + Math.pow((spheres[i].y - spheres[j].y), 2));
        if (dist <= 200.0) {
          const alpha = 1.0 - (dist / 200.0);
          if (alpha > 1.0) {
            alpha = 1.0;
          } else if (alpha < 0.0) {
            alpha = 0.0;
          }

          let color = spheres[i].color;
          if (spheres[j].r > spheres[i].r) {
            color = spheres[j].color;
          }
          let alphaValue = Math.round(alpha * 255).toString(16).padStart(2, '0');
          ctx.beginPath()
          ctx.strokeStyle = `${color}${alphaValue}`;
          ctx.moveTo(spheres[i].x, spheres[i].y);
          ctx.lineTo(spheres[j].x, spheres[j].y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < spheres.length; i++) {
      ctx.beginPath()
      ctx.arc(spheres[i].x, spheres[i].y, spheres[i].r, 0, 2 * Math.PI)
      ctx.fillStyle = spheres[i].color
      ctx.fill()
    }
  }

  const postdraw = (ctx) => {
    ctx.restore()
  }

  const click = (evt) => {
    const x = evt.pageX - evt.target.offsetLeft + evt.target.clientLeft;
    const y = evt.pageY - evt.target.offsetTop + evt.target.clientTop;
    console.log(`${x} - ${y} - ${spheres.length}`);
    spheres.push({
      x: x,
      y: y,
      r: Math.random() * maxRadius + minRadius,
      color: colors[Math.floor(Math.random() * 4)],
      xvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
      yvel: Math.random() * (maxVelocity - minVelocity) + minVelocity,
      ttl: Math.random() * maxTtl + 50
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })

    let frameCount = 0
    let animationFrameId

    const render = () => {
      frameCount++
      predraw(context, canvas);
      draw(context, frameCount)
      postdraw(context);
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas ref={canvasRef} onClick={click} style={{
    position: "absolute",
    height: "calc(84vh - 76px)",
    "@xsMax": {
      height: "calc(100vh - 64px)",
    },
    width: "100%"
  }} {...props} />
}

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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
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
                  <Dropdown placement="right-top">
                    <Dropdown.Button color="primary" css={{ minWidth: "200px" }}>
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
                    <Dropdown.Button auto color="primary" css={{ minWidth: "200px", color: '$warning', bgColor: '$accents0' }}>
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
                  <a href="/downloads" style={{textDecoration: "none"}}><Button light color="secondary" auto>
                    Previous Versions
                  </Button></a>
                  
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
            <Col span={6} css={{ mt: "3em", mb: "2em"}}>
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
