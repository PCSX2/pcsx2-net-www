import React from 'react';
import { GoGitCommit, GoGitPullRequest } from "react-icons/go";
import { Avatar, Grid, Tooltip, Text, Spacer } from "@nextui-org/react";

function generatePRLinks(prNums) {
  if (!prNums) {
    return (null);
  }
  const nums = prNums.split(",");
  if (nums.length === 0) {
    return (null);
  }
  let icons = [];
  let i = 0;
  for (const num of nums) {
    icons.push(
      <a key={i++} href={`https://github.com/PCSX2/pcsx2/pull/${num}`}>
        <GoGitPullRequest size={24} verticalAlign="middle"></GoGitPullRequest>
        {num}
      </a>
    )
  }
  return icons
}

function generateCommitLinks(commitShas) {
  if (!commitShas) {
    return (null);
  }
  const shas = commitShas.split(",");
  if (shas.length === 0) {
    return (null);
  }
  let icons = [];
  let i = 0;
  for (const sha of shas) {
    icons.push(
      <a key={i++} href={`https://github.com/PCSX2/pcsx2/commit/${sha}`}>
        <GoGitCommit size={24} ></GoGitCommit>
        {sha}
      </a>
    )
  }
  return icons
}

const authorsWithoutAvatars = ["github-actions"];

function generateAuthorAvatars(authors) {
  if (!authors) {
    return (null);
  }
  const authorNames = authors.split(",");
  if (authorNames.length === 0) {
    return (null);
  }
  let avatars = [];
  let i = 0;
  for (const author of authorNames) {
    avatars.push(
      <Tooltip key={i++} content={author}>
        <Avatar
          size="md"
          src={authorsWithoutAvatars.includes(author.toLowerCase()) ? undefined : `https://github.com/${author}.png?size=40`}
          text={author}
          alt={author}
          bordered
          color="gradient"
          stacked
        />
      </Tooltip>
    )
  }
  return <Grid>
    <Avatar.Group animated={avatars.length > 1}>
      {avatars}
    </Avatar.Group>
  </Grid>;
}

export default function PCSX2PRLink({ children, prNums, shas, authors }) {
  return (
    <Grid.Container className="pr-link" alignItems="center" alignContent="center">
      <Grid>
        <span>{children}</span>
      </Grid>
      <Spacer x={1} />
      {generateAuthorAvatars(authors)}
      <Spacer x={0.5} />
      {generatePRLinks(prNums)}
      <Spacer x={0.5} />
      {generateCommitLinks(shas)}
    </Grid.Container>
  );
}
