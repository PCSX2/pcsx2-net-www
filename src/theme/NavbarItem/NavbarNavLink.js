import React from "react";
import NavbarNavLink from "@theme-original/NavbarItem/NavbarNavLink";
import { Button } from "@nextui-org/react";
import { GoHeart } from "react-icons/go";
import Link from "@docusaurus/Link";

export default function NavbarNavLinkWrapper(props) {
  if (props.label === "Donate") {
    if (props.className === "menu__link") {
      // return a simple link
      return (
        <>
          <Link {...props}>
            <GoHeart fill="var(--nextui-colors-red600)" size={20} />
            Donate
          </Link>
        </>
      );
    }
    return (
      <>
        <Button
          auto
          as="a"
          css={{
            bg: "$gray50",
            color: "$text",
            maxH: "38px",
            px: "$8",
            "@mdMax": {
              d: "none",
            },
            "& .nextui-button-icon": {
              mr: "$2",
            },
            "& .nextui-button-icon svg": {
              transition: "$default",
            },
            "&:hover": {
              color: "#59c5ff",
              textDecoration: "none",
            },
          }}
          href={props.to}
          icon={<GoHeart fill="var(--nextui-colors-red600)" size={20} />}
          rel="noreferrer"
          target="_blank"
        >
          Donate
        </Button>
      </>
    );
  } else {
    return (
      <>
        <NavbarNavLink {...props} />
      </>
    );
  }
}
