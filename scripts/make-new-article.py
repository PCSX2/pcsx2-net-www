# Just a quick script to help make a new hugo article
# and not miss any important configuration
from datetime import datetime
import os

tag = input("Main Tag (devblog/progress-report/none): ")
if tag != "devblog" and tag != "progress-report" and tag != "none":
  exit(1)
title = input("Article Title: ")
slug = title.replace(" ", "-").lower()
date = input("Date (YYYY-MM-DD): ")
date = datetime.fromisoformat(date)
draft = "false"
summary = input("Article Summary: ")
authors = input("Authors (comma sep. // or leave blank): ")
aliasLinks = input("Alias Links (comma sep.): ")
dateInput = input("Date (ISO timestamp, or leave blank): ")
if dateInput != "":
  date = dateInput

path = "./content/blog/{}/{}".format(date.year, slug)
pathFile = "{}/index.md".format(path)
os.makedirs(path, exist_ok=True)
with open(pathFile, 'a') as f:
  f.write('---\n')
  f.write("title: \"{}\"\n".format(title.title().replace("Pcsx2", "PCSX2")))
  f.write("date: {}\n".format(date))
  f.write("summary: \"{}\"\n".format(summary))
  f.write("draft: {}\n".format(draft))
  if tag != "none":
    f.write("tags:\n")
    f.write("  - \"{}\"\n".format(tag))
  if authors != "":
    f.write("mainAuthor: {}\n".format(authors.split(",")[0]))
    if len(authors.split(",")) > 1 and authors.split(",")[0] != "":
      f.write("secondaryAuthors:\n")
      secondaryAuthors = authors.split(",")
      secondaryAuthors.pop()
      for author in secondaryAuthors:
        f.write("  - \"{}\"\n".format(author))
  if len(aliasLinks.split(",")) > 0 and aliasLinks.split(",")[0] != "":
    f.write("aliases:\n")
    for alias in aliasLinks.split(","):
      f.write("  - \"{}\"\n".format(alias))
      f.write("  - \"{}.html\"\n".format(alias))
      f.write("  - \"{}.htm\"\n".format(alias))
  f.write('---\n')
