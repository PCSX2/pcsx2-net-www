import React from "react";
import { Button } from "@nextui-org/react";

const categoryColorMapping = {
  perfect: {
    on: "bg-[#ba68c8] border-none",
    off: "bg-transparent text-[#ba68c8] !border-[#ba68c8] border-solid",
  },
  playable: {
    on: "bg-[#9CCC65] text-black border-none",
    off: "bg-transparent text-[#9CCC65] !border-[#9CCC65] border-solid",
  },
  ingame: {
    on: "bg-[#29B6F6] text-black border-none",
    off: "bg-transparent text-[#29B6F6] !border-[#29B6F6] border-solid",
  },
  menus: {
    on: "bg-[#FBC02D] text-black border-none",
    off: "bg-transparent text-[#FBC02D] !border-[#FBC02D] border-solid",
  },
  intro: {
    on: "bg-[#F57C00] text-black border-none",
    off: "bg-transparent text-[#F57C00] !border-[#F57C00] border-solid",
  },
  nothing: {
    on: "bg-[#D32F2F] border-none",
    off: "bg-transparent text-[#D32F2F] !border-[#D32F2F] border-solid",
  },
};

export function CompatibilityButton({
  categoryFiltered,
  disabledOrLoading,
  category,
  onPress,
  children,
}) {
  return (
    <Button
      variant={"bordered"}
      disabled={disabledOrLoading}
      isLoading={disabledOrLoading}
      onPress={onPress}
      className={
        categoryColorMapping[category][categoryFiltered ? "off" : "on"]
      }
    >
      {children}
    </Button>
  );
}
