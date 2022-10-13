import datetime
import glob
import json
import os
import re
from pathlib import Path

id = input("ID Prefix (ie. 219): ")
## [2 New Plugins for Download](/143-2-new-plugins-for-download.html) {#new-plugins-for-download .contentheading}
title_and_alias_regex = "##\s?\[(.*)\]\((\/.*)\.html"
md_file = glob.glob('./article-backup/**/{}*.md'.format(id), recursive=True)[0]
title = ""
alias = ""
content = []
# `devblogs` have a different format unfortunately, gotta get the alias and title from the file name
# /developer-blog/282-q-a-picking-our-noes.html
# file_name = Path(md_file).stem
# title = " ".join(file_name.split("-")[1:]).title()
# alias = "/developer-blog/{}".format(file_name)
with open(md_file) as file:
  lines = file.readlines()
  # for line in lines:
  #   if '<div class="single-article">' in line or '<div class="item-page clearfix">' in line or '[Post a Comment!]' in line:
  #     continue
  #   content.append(line)
  # content.insert(0, "\n")
  found_title = False
  for line in lines:
    matches = re.findall(title_and_alias_regex, line)
    if len(matches) > 0:
      found_title = True
      title = matches[0][0]
      alias = matches[0][1]
      continue
    if found_title:
      if ":::" in line:
        continue
      content.append(line)

slug = title.replace(" ", "-").lower()
draft = "false"

date = None
json_file = glob.glob('./article-backup/**/{}*.json'.format(id), recursive=True)[0]
with open(json_file) as file:
  data = json.load(file)
  date = datetime.datetime.fromisoformat(data['date'])

summary = "TODO"

author_regex = "content=\"(.*)\".+author"
html_file = glob.glob('./article-backup/**/html-full/{}*.html'.format(id), recursive=True)[0]
author = ""
with open(html_file) as file:
  lines = file.readlines()
  for line in lines:
    matches = re.findall(author_regex, line)
    if len(matches) > 0:
      found_title = True
      author = matches[0]
      break

path = "./content/blog/{}/{}".format(date.year, slug)
pathFile = "{}/index.md".format(path)
os.makedirs(path, exist_ok=True)
with open(pathFile, 'a') as f:
  f.write('---\n')
  f.write("title: \"{}\"\n".format(title.title().replace("Pcsx2", "PCSX2")))
  f.write("date: {}\n".format(date.isoformat()))
  f.write("summary: \"{}\"\n".format(summary))
  f.write("draft: {}\n".format(draft))
  f.write("tags:\n")
  f.write("  - \"progress-report\"\n")
  f.write("mainAuthor: {}\n".format(author))
  f.write("aliases:\n")
  f.write("  - \"{}\"\n".format(alias))
  f.write("  - \"{}.html\"\n".format(alias))
  f.write("  - \"{}.htm\"\n".format(alias))
  f.write('---\n')
  f.writelines(content)

print("Wrote - {}".format(path))
