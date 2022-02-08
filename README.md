# PCSX2 Website

The main PCSX2 website is a statically generated website, leveraging the hugo framework.

This repository has the main hugo theme, as well as the articles and content associated with it.

- [Setup](#setup)
  - [Windows](#windows)
  - [Linux](#linux)
- [Developing](#developing)
  - [Making a new Article](#making-a-new-article)
    - [Shortcode Documentation](#shortcode-documentation)
    - [Caveats if Migrating a Legacy Article](#caveats-if-migrating-a-legacy-article)
  - [Folder Layout](#folder-layout)
  - [Updating Dependencies](#updating-dependencies)

## Setup

### Windows

Get Scoop - https://scoop.sh/

```bash
scoop bucket add extras
scoop install hugo-extended python task
```

Run it locally

```bash
hugo server -D
```

View it - http://localhost:1313/

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

#### Shortcode Documentation

TODO

#### Caveats if Migrating a Legacy Article

- When running the command above, you should provide an alias that matches the relative URL from the old website.  This will prevent legacy links from becoming dead.  See existing articles that have been migrated for an example.

### Folder Layout

A brief overview on where to find things depending on what you want to modify:

TODO

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

Deleting a dependency is more involved and is likely a manuall effort.

Inspect and commit the changes.

