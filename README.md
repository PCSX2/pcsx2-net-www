# PCSX2 Website

The main PCSX2 website is a statically generated website, leveraging [Docusaurus](https://docusaurus.io/docs).

- [PCSX2 Website](#pcsx2-website)
  - [Setup](#setup)
    - [Windows](#windows)
    - [Linux](#linux)
  - [Developing](#developing)
    - [Making a new Article](#making-a-new-article)
      - [Caveats if Migrating a Legacy Article](#caveats-if-migrating-a-legacy-article)
    - [Builtin Component Documentation](#builtin-component-documentation)

## Setup

### Windows

Setup Scoop as per instructions at https://scoop.sh/.

Open Powershell and install the following.

```bash
scoop install git nodejs
npm install --global yarn
```

To start the server you will need to be in your Github repository that contains the `package.json`. Use this command to start the server:

```bash
yarn start # alternatively, you can use `npm run start`
```

Browse to http://localhost:8080/

### Linux

You need to install NodeJS using your package manager, here are a few examples:

Ubuntu:

```sh
sudo apt-get install nodejs
```

Fedora:

```sh
sudo dnf install nodejs
```

Arch Linux:

```sh
sudo pacman -Syu nodejs
```

Now you can install `yarn` via NPM (Make sure you have installed NodeJS first):

```sh
npm install --global yarn
```

To start the server you will need to be in your Github repository that contains the `package.json`. Use this command to start the server:

```bash
yarn start # alternatively, you can use `npm run start`
```

Browse to http://localhost:8080/

## Developing

- The docusaurus documentation is very useful and has plenty of examples https://docusaurus.io/docs
- Docusaurus uses React and JSX, seek out related resources for those if editing the frontend code

### Making a new Article

Run the following to setup the boilerplate for a new article:

```bash
yarn new-article
```

The article will go into `/blog/<year>/<title>`

You should add an image to serve as a preview and title card respectively (if appropriate) by using the `image:` and `titleImage:` frontmatter field, for example:

```yaml
---
title: ...
---
image: ./img/my-cool-thumbnail.webp
titleImage: ./img/my-cool-thumbnail.webp
---
```

`titleImage` assets currently needs to be stored in the static folder.
No image path, whether in the frontMatter or in the article, should contain spaces.

#### Caveats if Migrating a Legacy Article

- When running the command above, you should provide an alias that matches the relative URL from the old website. This will prevent legacy links from becoming dead. See existing articles that have been migrated for an example.

### Builtin Component Documentation

[See the following article](/usage_docs/components.md)
