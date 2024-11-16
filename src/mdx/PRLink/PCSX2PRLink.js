import React from "react";
import { GoGitCommit, GoGitPullRequest } from "react-icons/go";
import { Avatar, Tooltip, AvatarGroup } from "@nextui-org/react";
import { IconContext } from "react-icons";

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
    <AvatarGroup animated={avatars.length > 1} style={{ marginRight: "0.5em" }}>
      {avatars}
    </AvatarGroup>
  );
}

export default function PCSX2PRLink({ children, prNums, shas, authors }) {
  return (
    <div className={"pr-link flex flex-wrap"}>
      <div className="w-full flex items-center">
        <span className="mr-6">{children}</span>
      </div>
      <div className="w-full flex items-center ml-3">
        {generateAuthorAvatars(authors)}
        {generatePRLinks(prNums)}
        {generateCommitLinks(shas)}
      </div>
    </div>
  );
}
