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
            <GoHeart fill="#C20E4D" size={20} />
            Donate
          </Link>
        </>
      );
    }
    return (
      <>
        <Button
          as="a"
          className="cursor-pointer hover:no-underline hover:text-red-200 gap-1 font-medium border-none text-red-400 bg-[#090a11]"
          href={props.to}
          startContent={<GoHeart fill="#C20E4D" size={20} />}
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
