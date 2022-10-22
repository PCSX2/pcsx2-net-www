
from distutils.dir_util import copy_tree
import glob
from io import BytesIO
import os
import frontmatter

def conv_frontmatter(new_key, old_key, new_meta, old_meta, invert_bool = False):
  if old_key in old_meta:
    if invert_bool:
      new_meta[new_key] = not old_meta[old_key]
    else:
      new_meta[new_key] = old_meta[old_key]

def convert_content(content):
  new_content = []
  for line in content.splitlines():
    if "progress/github-link" in line:
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
    else:
      new_content.append(line)
  return "\n".join(new_content)

# Read the file, recreate the folder structure
def convert_article(orig_path):
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

  new_post.content = convert_content(content)

  # write out new post
  with open("{}/index.md".format(new_dir), "wb+") as f:
    frontmatter.dump(new_post, f)
  os.rename("{}/index.md".format(new_dir), "{}/index.mdx".format(new_dir))

convert_article("content/blog/2022/q4-2021-progress-report/index.md")
