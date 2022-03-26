# PCSX2 Website

The main PCSX2 website is a statically generated website, leveraging the hugo framework.

This repository has the main hugo theme, as well as the articles and content associated with it.

- [Setup](#setup)
  - [Windows](#windows)
  - [Linux](#linux)
- [Developing](#developing)
  - [Making a new Article](#making-a-new-article)
    - [Caveats if Migrating a Legacy Article](#caveats-if-migrating-a-legacy-article)
  - [Shortcode Documentation](#shortcode-documentation)
  - [Folder Layout](#folder-layout)
  - [Updating Dependencies](#updating-dependencies)

## Setup

### Windows

Setup Scoop as per instructions at https://scoop.sh/.

Open Powershell and install the following.

```bash
scoop install git
scoop bucket add extras
scoop install hugo-extended python task
```

Navigate to your local git repository for the site and use the below to start the server.

To start the server you will need to be in your Github repository that contains config.yaml.

```bash
cd C:\Users\user\Documents\GitHub\pcsx2-net-www
hugo server -D
```

Browse to http://localhost:1313/

### Linux

TODO - but very similar just using your package manager of choice

## Developing

The hugo documentation is your friend - https://gohugo.io/documentation/

### Making a new Article

Run the following to setup the boilerplate for a new article:

```bash
task new-article
```

The article will go into `/content/blog/<title>` and will be marked as a draft, it will not published to the final website until it is no longer marked as such!

You should add an image to serve as a preview (if appropriate) by prefixing the filename with `feature-`.

#### Caveats if Migrating a Legacy Article

- When running the command above, you should provide an alias that matches the relative URL from the old website.  This will prevent legacy links from becoming dead.  See existing articles that have been migrated for an example.

### Shortcode Documentation

[See the following article](/docs/shortcodes.md)

### Folder Layout

A brief overview on where to find things depending on what you want to modify:

```
pcsx2-net-www/
├─ article-backup/ - Temporary dir that has all the old content and posts to be migrated
├─ content/ - New content that is hosted and served
│  ├─ blog/ - Specifically the folder where posts and their relevant content goes
├─ themes/
│  ├─ pcsx2/ - Everything about the website that isn't article content, look, feel and functionality
│  │  ├─ assets/
│  │  │  ├─ sass/ - We use SASS to preprocess our styling, it all lives here
│  │  ├─ layouts/
│  │  │  ├─ _default/ - Overrides on Hugo default templates
│  │  │  ├─ page/ - HTML pages, used to make more complicated / less templated pages
│  │  │  ├─ partials/ - Like shortcodes, but for templates instead of article content
│  │  │  ├─ shortcodes/ - Reusable macros that can be used in article content
│  │  │  ├─ index.html - Home page
│  │  ├─ static/ - JS/CSS files, as well as our vendored dependencies
├─ config.yaml - Hugo configuration file

```

### Updating Dependencies

Dependency metadata is stored in the top-level `deps-info.json`

> You should stash or commit any unstaged changes first!

After updating that file accordingly, run the following:

```bash
task vendor-deps
```

This will:
1. Re-vendor all referenced dependencies
2. Go through all `.html` files in the hugo theme, and up replace the referenced versions

Deleting a dependency is more involved and is likely a manual effort.

Inspect and commit the changes.

