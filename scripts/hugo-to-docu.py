
from distutils.dir_util import copy_tree
import glob
import os
import re
import frontmatter

def conv_frontmatter(new_key, old_key, new_meta, old_meta, invert_bool = False):
  if old_key in old_meta:
    if invert_bool:
      new_meta[new_key] = not old_meta[old_key]
    else:
      new_meta[new_key] = old_meta[old_key]

def convert_content(content):
  new_content = []
  found_text = False
  truncation_added = False
  for line in content.splitlines():
    if found_text is False and line.strip() != "":
      found_text = True
    if truncation_added is False and found_text is True and line.strip() == "":
      # insert summary truncation marker
      new_content.append(line)
      new_content.append("<!-- truncate -->\n")
      truncation_added = True
      continue

    if "{{<" in line and ">}}" not in line:
      print("multi-line shortcode - {}".format(line))
      return False
    elif "progress/github-link" in line:
      # get props
      title = None
      prNums = []
      authors = []
      shas = []
      # NOTE - this will break on escaped quotes!
      if "title" in line:
        title = line.split("title=\"")[1].split("\"")[0]
      if "prNums" in line:
        prNums = line.split("prNums=\"")[1].split("\"")[0].split(",")
      if "authors" in line:
        authors = line.split("authors=\"")[1].split("\"")[0].split(",")
      if "shas" in line:
        shas = line.split("shas=\"")[1].split("\"")[0].split(",")
      # Construct a new line with the new component
      markup = '<PCSX2PRLink'
      if len(authors) > 0:
        markup = markup + ' authors="{}"'.format(",".join(authors))
      if len(prNums) > 0:
        markup = markup + ' prNums="{}"'.format(",".join(prNums))
      if len(shas) > 0:
        markup = markup + ' shas="{}"'.format(",".join(shas))
      markup = markup + '>{}</PCSX2PRLink>'.format(title)
      new_content.append(markup)
    elif "img-cmp-slider" in line:
      # get props
      before = ""
      after = ""
      if "before" in line:
        before = line.split("before=\"")[1].split("\"")[0]
      if "after" in line:
        after = line.split("after=\"")[1].split("\"")[0]
      new_content.append('<SliderCompare before={{require("{}").default}} after={{require("{}").default}} />'.format(before, after))
    elif "img-cmp " in line:
      # get props
      before = ""
      after = ""
      if "before" in line:
        before = line.split("before=\"")[1].split("\"")[0]
      if "after" in line:
        after = line.split("after=\"")[1].split("\"")[0]
      new_content.append('<ImageCompare left={{require("{}").default}} right={{require("{}").default}} />'.format(before, after))
    elif "{{< img " in line:
      # get props
      cols = ""
      src = ""
      if "cols" in line:
        cols = line.split("cols=\"")[1].split("\"")[0]
        if not cols.isnumeric():
          cols = None
      if "src" in line:
        src = line.split("src=\"")[1].split("\"")[0]
      if cols is None:
        new_content.append('<Image src={{require("{}").default}} />'.format(src))
      else:
        new_content.append('<Image cols={{{}}} src={{require("{}").default}} />'.format(cols, src))
    elif "{{<" in line:
      print("unhandled shortcode - {}".format(line))
      return False
    elif re.match("<\w+\s", line):
      print("unhandled html tag - {}".format(line))
      return False
    else:
      new_content.append(line.strip())
  return "\n".join(new_content)

# Read the file, recreate the folder structure
def convert_article(orig_path):
  print("[Converting] {}".format(orig_path))
  article = frontmatter.load(orig_path)
  # TODO - auto convert short-codes
  # TODO - lint over HTML tags that i skipped in the original migration, catch them now
  content = article.content
  # recreate folder structure
  new_dir = os.path.dirname(orig_path).replace("content", "pcsx2-net")
  os.makedirs(new_dir, exist_ok=True)
  # copy contents
  copy_tree(os.path.dirname(orig_path), new_dir)
  # prepare new markdown contents
  new_post = frontmatter.loads("")
  # convert all frontmatter over to docusaurus equivalents
  conv_frontmatter("title", "title", new_post, article)
  conv_frontmatter("date", "date", new_post, article)
  conv_frontmatter("description", "summary", new_post, article)
  conv_frontmatter("draft", "draft", new_post, article)
  conv_frontmatter("tags", "tags", new_post, article)
  if "aliases" in article:
    with open("scripts/aliases.json", "r") as f:
      alias_data = json.load(f)
      alias_data[orig_path] = article["aliases"]
    with open("scripts/aliases.json", "w") as f:
      f.write(json.dumps(alias_data, indent=2))
  # authors are a bit different
  new_authors = []
  if "mainAuthor" in article:
    new_authors.append(article["mainAuthor"].lower())
  if "secondaryAuthors" in article:
    for author in article["secondaryAuthors"]:
      new_authors.append(author.lower())
  new_post["authors"] = new_authors
  conv_frontmatter("hide_table_of_contents", "toc", new_post, article, invert_bool=True)
  # if there used to be a feature image, use it
  feature_image = glob.glob("{}/feature*".format(os.path.dirname(orig_path)))
  if len(feature_image) > 0:
    new_post["image"] = "./{}".format(os.path.basename(feature_image[0]))

  maybe_new_content = convert_content(content)
  if maybe_new_content is False:
    return False
  new_post.content = maybe_new_content

  # write out new post
  with open("{}/index.md".format(new_dir), "wb+") as f:
    frontmatter.dump(new_post, f)
  if (os.path.isfile("{}/index.mdx".format(new_dir))):
    os.remove("{}/index.mdx".format(new_dir))
  os.rename("{}/index.md".format(new_dir), "{}/index.mdx".format(new_dir))
  return True

import json

with open("scripts/track.json") as f:
  track_data = json.load(f)

subfolders = [ f.path for f in os.scandir("content/blog/2007") if f.is_dir() ]

for article in subfolders:
  article = article.replace("\\", "/")
  if article in track_data and track_data[article] is True:
    print("'{}' is already marked as migrated, skipping".format(article))
    continue
  ok = convert_article("{}/index.md".format(article))
  if ok:
    track_data[article] = True
  else:
    print("Unable to convert '{}'".format(article))
    break

with open("scripts/track.json", "w") as f:
  f.write(json.dumps(track_data, indent=2))
