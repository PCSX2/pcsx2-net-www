---
title: "Contributing to PCSX2"
summary: "Getting started with contributing to PCSX2"
draft: false
toc: true
sidebar_position: 1
---

In this section you will learn how to contribute to PCSX2.

As a first step, please review these links as they'll help you understand how the development of PCSX2 works.

- [How to Contribute](#how-to-contribute)
- [Just Starting Out](#just-starting-out)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Commenting Etiquette](#commenting-etiquette)
  - [Keeping it real](#keeping-it-real)
- [General Documentation And Coding Strategies](#general-documentation-and-coding-strategies)

## How to Contribute

If you have no experience in programming or just want to help us in any shape or form, here is what you can do:

- If you find application or emulation bugs, feel free to [report an issue on our GitHub](https://github.com/PCSX2/pcsx2/issues)
- If you have a knack for writing articles or testing games in general, we are always looking for help!
  - Please join our [Discord](https://pcsx2.net/discord) if you are interested!
- A game runs well or has a weird workaround? Head over to [the Wiki](https://wiki.pcsx2.net/Main_Page) and let us know on [Discord](https://pcsx2.net/discord)!
- Want to help translating PCSX2 to your language? Head over to [Crowdin](https://crowdin.com/project/pcsx2-emulator) and start right away!

However if you do have experience in programming and wanted to contribute code, read on!

## Just Starting Out

- If you're unfamilar with git, check out this [brief introduction to Git](./git.md)
- [How to build PCSX2 for Windows](../advanced/building.md#building-on-windows)
- [How to build PCSX2 for macOS](../advanced/building.md#building-on-macos)
- [How to build PCSX2 for Linux](../advanced/building.md#building-on-linux)

## Pull Request Guidelines

The following is a list of _general_ style recommendations that will make reviewing and merging easier:

- Commit Messages

  - Please try to prefix your commit message, indicating what area of the project was modified.

    - For example `GS: message...`.
    - Looking at the project's commit history will help with keeping prefixes consistent overtime, _there is no strictly enforced list_.

  - Try to keep messages brief and informative

  - Remove unnecessary commits and squash commits together when appropriate.
    - If you are not familiar with rebasing with git, check out the following resources:
      - [CLI](https://thoughtbot.com/blog/git-interactive-rebase-squash-amend-rewriting-history)
      - [GUI (SourceTree)](https://www.atlassian.com/blog/sourcetree/interactive-rebase-sourcetree)

- Code Styling and Formatting

  - [Consult the style guide](./formatting.md)

  - Run `clang-format` using the configuration file in the root of the repository
    - [Visual Studio Setup](https://devblogs.microsoft.com/cppblog/clangformat-support-in-visual-studio-2017-15-7-preview-1/)
    - IMPORTANT - if you are running `clang-format` on unrelated changes (ie. formatting an entire file), please do so in a separate commit.
      - If you cannot scope your `clang-format` to just your changes and do not want to format unrelated code. Try your best to stick with the existing formatting already established in the file in question.

## Commenting Etiquette

GitHub allows users to comment nearly everywhere. You can comment on issues, on commits, or even on one concrete line of a commit. This is a very powerful tool, but also has a great potential for abuse.

### Keeping it real

The comment system is not a forum, and is generally _**not**_ for idle chat. Many of the devs have comments feeding directly into our inboxes, and a bunch of spam for smileys or statements like "make it faster plz" isn't what we consider a good time. So please be considerate.

There are a few rules an guidelines that we all need to follow in order for this public feedback system to work:

- Comments should be relevant to the commit/issue and should contain _useful information_.
- If you're having general problems with PCSX2, you can use our [Issue tracker](https://github.com/PCSX2/pcsx2/issues), or if you don't really know what revision causes it, our [Public Forum](https://forums.pcsx2.net). This way we can discuss and troubleshoot the issue in depth, in its right place.
- Statements like "please make it faster" or "please fix my game" are not acceptable and will be deleted.
- Phrasing the statement as a question like "Will this make it faster?" or "Will this fix my game?" is not acceptable either, and will also be deleted.
- If we delete your post, there was a good reason for it. Deleting posts without justification would be counter-productive, much the same way that allowing posts with no relevant content would also be counter-productive.

## General Documentation And Coding Strategies

- [Coding style](./formatting.md)
  - [More comprehensive style-guide](./advanced_formatting.md)
