import React, { useState, useEffect } from "react";
import { Dropdown } from "@nextui-org/react";
import { BsWindows, BsApple } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { IoIosCloudyNight } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";
import { useMediaQuery } from "../../utils/mediaQuery";

export function getLatestRelease(releases, platform) {
  for (const release of releases) {
    if (platform in release.assets && release.assets[platform].length > 0) {
      return release;
    }
  }
  return undefined;
}

function toProperCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function getOSIcon(os, fillColor) {
  if (os === "windows") {
    return <BsWindows size={22} fill={fillColor}></BsWindows>;
  } else if (os === "linux") {
    return <FaLinux size={22} fill={fillColor}></FaLinux>;
  } else if (os === "macos") {
    return <BsApple size={22} fill={fillColor}></BsApple>;
  } else {
    return null;
  }
}

function generateDropdownItems(release, os, assets, textRemovals, isNightly) {
  if (!assets) {
    return [];
  }

  let fillColor = "var(--nextui-colors-primary)";
  if (isNightly) {
    fillColor = "var(--nextui-colors-warning)";
  }

  let items = [];
  for (const asset of assets.filter(
    (asset) => !asset.additionalTags.includes("symbols")
  )) {
    let displayName = asset.displayName;
    for (const removal of textRemovals) {
      displayName = displayName.replace(removal, "");
    }
    displayName = toProperCase(displayName.trim());
    if (asset.additionalTags.length > 0) {
      if (displayName === "") {
        displayName = asset.additionalTags.join(" ");
      } else {
        displayName += ` - ${asset.additionalTags.join(" ")}`;
      }
    }

    items.push(
      <Dropdown.Item
        key={asset.url}
        description={release.version}
        icon={getOSIcon(os, fillColor)}
      >
        {displayName}
      </Dropdown.Item>
    );
  }
  return items;
}

function openAssetLink(href) {
  Object.assign(document.createElement("a"), {
    rel: "noopener noreferrer",
    href: href,
  }).click();
}

export function ReleaseDownloadButton({
  release,
  buttonText,
  bordered,
  errorMsg,
  isNightly,
  placement
}) {
  const buttonStyling = {
    minWidth: "200px",
  };
  if (isNightly) {
    buttonStyling.color = "$warning";
    buttonStyling.bgColor = "var(--nightly-button-background)";
  }

  const [windowsItems, setWindowsItems] = useState([]);
  const [linuxItems, setLinuxItems] = useState([]);
  const [macosItems, setMacosItems] = useState([]);

  useEffect(() => {
    if ("windows" in release) {
      setWindowsItems(
        generateDropdownItems(
          release.windows,
          "windows",
          release.windows?.assets?.Windows,
          ["Windows"],
          isNightly
        )
      );
    } else {
      setWindowsItems(
        generateDropdownItems(
          release,
          "windows",
          release.assets?.Windows,
          ["Windows"],
          isNightly
        )
      );
    }
    if ("linux" in release) {
      setLinuxItems(
        generateDropdownItems(
          release.linux,
          "linux",
          release.linux?.assets?.Linux,
          ["Linux", "AppImage"],
          isNightly
        )
      );
    } else {
      setLinuxItems(
        generateDropdownItems(
          release,
          "linux",
          release.assets?.Linux,
          ["Linux", "AppImage"],
          isNightly
        )
      );
    }
    if ("macos" in release) {
      setMacosItems(
        generateDropdownItems(
          release.macos,
          "macos",
          release.macos?.assets?.MacOS,
          ["MacOS"],
          isNightly
        )
      );
    } else {
      setMacosItems(
        generateDropdownItems(
          release,
          "macos",
          release.assets?.MacOS,
          ["MacOS"],
          isNightly
        )
      );
    }
  }, [release]);

  return (
    <Dropdown
      isBordered
      placement={placement ? placement : useMediaQuery(960) ? "bottom-left" : "right-top"}
    >
      <Dropdown.Button
        color={isNightly ? "warning" : "primary"}
        css={buttonStyling}
        bordered={bordered}
      >
        {isNightly ? <IoIosCloudyNight size={22} /> : <GiBrickWall size={16} />}
        &nbsp;
        {buttonText}
      </Dropdown.Button>
      <Dropdown.Menu
        color={isNightly ? "warning" : "primary"}
        aria-label="Actions"
        css={{ $$dropdownMenuWidth: "100%" }}
        onAction={(assetUrl) => openAssetLink(assetUrl)}
      >
        <Dropdown.Section
          title={
            errorMsg === undefined
              ? windowsItems.length > 0
                ? "Windows"
                : "Windows - None Available"
              : errorMsg
          }
        >
          {errorMsg === undefined ? windowsItems : null}
        </Dropdown.Section>
        <Dropdown.Section
          title={
            errorMsg === undefined
              ? linuxItems.length > 0
                ? "Linux"
                : "Linux - None Available"
              : errorMsg
          }
        >
          {errorMsg === undefined ? linuxItems : null}
        </Dropdown.Section>
        <Dropdown.Section
          title={
            errorMsg === undefined
              ? macosItems.length > 0
                ? "MacOS"
                : "MacOS - None Available"
              : errorMsg
          }
        >
          {errorMsg === undefined ? macosItems : null}
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
}
