import React from "react";
import NavbarNavLink from "@theme-original/NavbarItem/NavbarNavLink";
import { Button } from "@nextui-org/react";
import { GoHeart } from "react-icons/go";
import Link from "@docusaurus/Link";
import { useMediaQuery } from "../../utils/mediaQuery";

export default function NavbarNavLinkWrapper(props) {
  if (props.label === "Donate") {
    if (props.className === "menu__link") {
      // return a simple link
      return (
        <>
          <Link {...props}>
            <GoHeart fill="#C20E4D" size={20} className="mr-1" />
            Donate
          </Link>
        </>
      );
    } else if (!useMediaQuery(960)) {
      return (
        <>
          <Button
            as="a"
            className="dark light cursor-pointer hover:no-underline dark:hover:text-red-200 light:hover:text-red-600 gap-1 font-medium border-none text-red-400 dark:bg-[#090a11] light:bg-[#ebedf0]"
            href={props.to}
            startContent={<GoHeart fill="#C20E4D" size={20} />}
            rel="noreferrer"
            target="_blank"
          >
            Donate
          </Button>
        </>
      );
    }
  } else {
    return (
      <>
        <NavbarNavLink {...props} />
      </>
    );
  }
}
