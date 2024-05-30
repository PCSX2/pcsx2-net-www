import React, { useState, useEffect } from "react";
import { Dropdown } from "@nextui-org/react";
import { BsWindows, BsApple } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { IoIosCloudyNight } from "react-icons/io";
import { GiBrickWall } from "react-icons/gi";
import { useMediaQuery } from "../../utils/mediaQuery";

// Function to get the latest release for a specific platform
export function getLatestRelease(releases, platform) {
  for (const release of releases) {
    if (platform in release.assets && release.assets[platform].length > 0) {
      return release;
    }
  }
  return undefined;
}

// Function to convert text to proper case, skipping capitalizing "x64"
function toProperCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    if (txt.toLowerCase() === "x64") {
      return txt.toLowerCase();
    } else {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  });
}

// Function to get the OS icon based on the platform
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

// Function to generate dropdown items based on release, OS, assets, text removals, and whether it's a nightly build
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
    (asset) => !asset.additionalTags.includes("symbols"),
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

    // Generate a more dynamic displayName based on asset properties, old way was following the format of package type - Bits(64) - GUI Widget (Qt)
    if (os === "windows") {
      if (asset.additionalTags.includes("installer")) {
        displayName = "Installer";
      } else if (asset.additionalTags.includes("portable")) {
        displayName = "Portable";
      } else {
        displayName = "Download";
      }
    } else if (os === "linux") {
      // Check for Flatpak or AppImage tags which will make Appimage - x64 Qt and Flatpak - x64 Qt and no way to seemingly fix the regular way
      if (asset.additionalTags.includes("appimage")) {
        displayName = "AppImage";
      } else if (asset.additionalTags.includes("flatpak")) {
        displayName = "Flatpak";
      } else {
        displayName = toProperCase(displayName); // Capitalize the first letter for other cases like old Linux releases
      }
    } else if (os === "macos") {
      displayName = "Download";
    }

    // Strip the "- x64 Qt" for Linux because it's being annoying with the tags and who cares about how good the code looks for now it's a bit of jank.
    // Replace "Appimage" with "AppImage" as the tags don't seem to work properly, so just replace the whole thing
    if (os === "linux") {
      displayName = displayName
        .replace(/- x64 Qt$/, "")
        .replace("Appimage", "AppImage");
    }

    items.push(
      <Dropdown.Item
        key={asset.url}
        description={release.version}
        icon={getOSIcon(os, fillColor)}
        css={{ transition: "none" }}
      >
        {displayName}
      </Dropdown.Item>,
    );
  }
  return items;
}

// Component for the Release Download Button
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
  isDisabled,
  placement,
}) {
  // Styling for the button
  const buttonStyling = {
    minWidth: "200px",
  };
  if (isNightly) {
    buttonStyling.color = "$warning";
    buttonStyling.bgColor = "var(--nightly-button-background)";
  }

  // States to hold dropdown items for each platform
  const [windowsItems, setWindowsItems] = useState([]);
  const [linuxItems, setLinuxItems] = useState([]);
  const [macosItems, setMacosItems] = useState([]);

  // Effect to generate dropdown items when the release or other inputs change
  useEffect(() => {
    if ("windows" in release) {
      setWindowsItems(
        generateDropdownItems(
          release.windows,
          "windows",
          release.windows?.assets?.Windows,
          ["Windows"],
          isNightly,
        ),
      );
    } else {
      setWindowsItems(
        generateDropdownItems(
          release,
          "windows",
          release.assets?.Windows,
          ["Windows"],
          isNightly,
        ),
      );
    }
    if ("linux" in release) {
      setLinuxItems(
        generateDropdownItems(
          release.linux,
          "linux",
          release.linux?.assets?.Linux,
          ["Linux"],
          isNightly,
        ),
      );
    } else {
      setLinuxItems(
        generateDropdownItems(
          release,
          "linux",
          release.assets?.Linux,
          ["Linux"],
          isNightly,
        ),
      );
    }
    if ("macos" in release) {
      setMacosItems(
        generateDropdownItems(
          release.macos,
          "macos",
          release.macos?.assets?.MacOS,
          ["MacOS"],
          isNightly,
        ),
      );
    } else {
      setMacosItems(
        generateDropdownItems(
          release,
          "macos",
          release.assets?.MacOS,
          ["MacOS"],
          isNightly,
        ),
      );
    }
  }, [release]);

  // Render the dropdown button and menu
  return (
    <Dropdown
      isBordered
      placement={
        placement ? placement : useMediaQuery(960) ? "bottom-left" : "right-top"
      }
    >
      <Dropdown.Button
        color={isNightly ? "warning" : "primary"}
        css={buttonStyling}
        bordered={bordered}
        disabled={isDisabled}
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
