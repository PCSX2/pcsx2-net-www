import React from "react";
import { GoGitCommit, GoGitPullRequest } from "react-icons/go";
import { Avatar, Tooltip } from "@nextui-org/react";
import { IconContext } from "react-icons";
import styles from "./PCSX2PRLink.module.css";

function generatePRLinks(prNums) {
  if (!prNums) {
    return null;
  }
  const nums = prNums.split(",");
  if (nums.length === 0) {
    return null;
  }
  let icons = [];
  let i = 0;
  for (const num of nums) {
    icons.push(
      <a key={i++} href={`https://github.com/PCSX2/pcsx2/pull/${num}`}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <GoGitPullRequest size={24}></GoGitPullRequest>
        </IconContext.Provider>
        {num}
      </a>,
    );
  }
  return icons;
}

function generateCommitLinks(commitShas) {
  if (!commitShas) {
    return null;
  }
  const shas = commitShas.split(",");
  if (shas.length === 0) {
    return null;
  }
  let icons = [];
  let i = 0;
  for (const sha of shas) {
    icons.push(
      <a key={i++} href={`https://github.com/PCSX2/pcsx2/commit/${sha}`}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <GoGitCommit size={24}></GoGitCommit>
        </IconContext.Provider>
        {sha.substr(0, 6)}
      </a>,
    );
  }
  return icons;
}

const authorsWithoutAvatars = ["github-actions"];

function generateAuthorAvatars(authors) {
  if (!authors) {
    return null;
  }
  const authorNames = authors.split(",");
  if (authorNames.length === 0) {
    return null;
  }
  let avatars = [];
  let i = 0;
  for (const author of authorNames) {
    avatars.push(
      <Tooltip key={i++} content={author}>
        <Avatar
          size="md"
          src={
            authorsWithoutAvatars.includes(author.toLowerCase())
              ? undefined
              : `https://github.com/${author}.png?size=40`
          }
          text={author}
          alt={author}
          bordered
          color="gradient"
          stacked
        />
      </Tooltip>,
    );
  }
  return (
    <Avatar.Group
      animated={avatars.length > 1}
      style={{ marginRight: "0.5em" }}
    >
      {avatars}
    </Avatar.Group>
  );
}

export default function PCSX2PRLink({ children, prNums, shas, authors }) {
  return (
    <Grid.Container className={styles["pr-link"]}>
      <Grid xs={12} alignItems="center">
        <span style={{ marginRight: "1.5em" }}>{children}</span>
      </Grid>
      <Grid xs={12} alignItems="center" css={{ ml: "0.75em" }}>
        {generateAuthorAvatars(authors)}
        {generatePRLinks(prNums)}
        {generateCommitLinks(shas)}
      </Grid>
    </Grid.Container>
  );
}
