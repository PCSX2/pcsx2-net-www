import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime
import json
from urllib.parse import urljoin, urlparse

# Here be dragons, go away

assetLinks = set()

def getAllImageLinks(url, content):
  soup = BeautifulSoup(content, "html.parser")
  for img in soup.find_all("img"):
      img_url = img.attrs.get("src")
      if not img_url:
          # if img does not contain src attribute, just skip
          continue
      img_url = urljoin(url, img_url)
      try:
        pos = img_url.index("?")
        img_url = img_url[:pos]
      except ValueError:
        pass
      assetLinks.add(img_url)

# Get all the dev blogs
devblogs = []
devblogLinks = []
devblogArticleURL = "https://pcsx2.net/developer-blog.html"
while(True):
  page = requests.get(devblogArticleURL)
  soup = BeautifulSoup(page.content, "html.parser")
  blogs = soup.find_all('div', {'class': 'blog-post'})
  for blog in blogs:
    link = blog.findChildren("a" , recursive=True)[0]
    devblogLinks.append("https://pcsx2.net{}".format(link.get('href')))
  # Paginate, check for more blogs
  nextLink = soup.find('li', {'class': 'pagination-next'})
  nextLinkATag = nextLink.find('a')
  if nextLinkATag is not None:
    devblogArticleURL = "https://pcsx2.net{}".format(nextLinkATag.get('href'))
    print("Found {} devblog articles so far, paginating more".format(len(devblogLinks)))
  else:
    break

# Go to each blog, and get the actual metadata and contents
# We will also backup the HTML itself
os.makedirs("./article-backup/devblogs/html-full", exist_ok=True)
os.makedirs("./article-backup/devblogs/html-contents", exist_ok=True)
os.makedirs("./article-backup/devblogs/metadata", exist_ok=True)
os.makedirs("./article-backup/devblogs/markdown", exist_ok=True)
for i, blog in enumerate(devblogLinks):
  page = requests.get(blog)
  fileName = blog.split("/")[-1].split(".")[0]
  soup = BeautifulSoup(page.content, "html.parser")
  getAllImageLinks(blog, page.content)
  # Get the date
  dateRaw = soup.find("dd", {'class': 'create'}).getText().split("Created: ")[1].strip()
  date = datetime.strptime(dateRaw, '%d %B %Y')
  # Get the article author
  author = soup.find("dd", {'class': 'createdby'}).getText().split("Written by ")[1].strip()
  # Save the raw HTML to a file for archival purpose
  filePath = "./article-backup/devblogs/html-full/{}.html".format(fileName)
  if os.path.exists(filePath):
    os.remove(filePath)
  with open(filePath, "w") as f:
    f.write(soup.prettify())
  # Save JUST the article contents to a separate file which we will convert
  filePath = "./article-backup/devblogs/html-contents/{}.html".format(fileName)
  if os.path.exists(filePath):
    os.remove(filePath)
  with open(filePath, "w") as f:
    articleContents = soup.find("div", {'class': 'single-article'})
    articleContents.find('h2', {'class': 'contentheading'}).decompose()
    articleContents.find('div', {'class': 'article-tools'}).decompose()
    f.write(articleContents.prettify())
  # Save the metadata
  filePath = "./article-backup/devblogs/metadata/{}.json".format(fileName)
  if os.path.exists(filePath):
    os.remove(filePath)
  with open(filePath, "w") as f:
    f.write(json.dumps({
      'author': author,
      'date': date.isoformat()
    }))
  print("[{}/{}] DevBlog Articles Archived and Cleaned Up".format(i+1, len(devblogLinks)))

# Get all the rest of the articles
progressReports = []
otherArticles = []
otherArticlesURL = "https://pcsx2.net/article-archive.html"
page = requests.get(otherArticlesURL)
soup = BeautifulSoup(page.content, "html.parser")
topLevelList = soup.find('ul', {'class': 'lca'})
years = topLevelList.findChildren('li', recursive=False)
for year in years:
  monthList = year.find('ul', {'class': 'lca'})
  months = monthList.findChildren('li', recursive=False)
  yearText = year.findChildren("span" , recursive=False)[0]
  yearText.find('span').decompose();
  for month in months:
    articles = month.find_all('li')
    monthText = month.findChildren("span" , recursive=False)[0]
    monthText.find('span').decompose();
    for article in articles:
      day = article.findChildren("span" , recursive=False)[0]
      linkElem = article.findChildren("a" , recursive=False)
      if linkElem is not None and len(linkElem) == 1:
        link = linkElem[0].get('href')
        if "progress" in link:
          progressReports.append({'link': "https://pcsx2.net{}".format(link), 'date': "{}{}{}".format(day.get_text(), monthText.get_text(), yearText.get_text())})
        else:
          otherArticles.append({'link': "https://pcsx2.net{}".format(link), 'date': "{}{}{}".format(day.get_text(), monthText.get_text(), yearText.get_text())})
print("Found {} progress reports".format(len(progressReports)))
print("Found {} other articles".format(len(otherArticles)))

# Backup the progress reports
os.makedirs("./article-backup/progressReports/html-full", exist_ok=True)
os.makedirs("./article-backup/progressReports/html-contents", exist_ok=True)
os.makedirs("./article-backup/progressReports/metadata", exist_ok=True)
os.makedirs("./article-backup/progressReports/markdown", exist_ok=True)
for i, blog in enumerate(progressReports):
  try:
    page = requests.get(blog['link'])
    fileName = blog['link'].split("/")[-1].split(".")[0]
    soup = BeautifulSoup(page.content, "html.parser")
    getAllImageLinks(blog['link'], page.content)
    # Get the date
    date = datetime.strptime(blog['date'], '%d %B %Y')
    # Get the article author
    authorElem = soup.select_one('p:-soup-contains("Written by")')
    if authorElem is not None:
      author = authorElem.find('a').get_text().strip()
    else:
      author = "unknown"
    # Save the raw HTML to a file for archival purpose
    filePath = "./article-backup/progressReports/html-full/{}.html".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      f.write(soup.prettify())
    # Save JUST the article contents to a separate file which we will convert
    filePath = "./article-backup/progressReports/html-contents/{}.html".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      articleContents = soup.find("div", {'class': 'single-article'})
      f.write(articleContents.prettify())
    # Save the metadata
    filePath = "./article-backup/progressReports/metadata/{}.json".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      f.write(json.dumps({
        'author': author,
        'date': date.isoformat()
      }))
    print("[{}/{}] Progress Reports Archived and Cleaned Up".format(i+1, len(progressReports)))
  except Exception as e:
    print("Error on - {}, {}".format(blog, e))

# All other articles
os.makedirs("./article-backup/otherArticles/html-full", exist_ok=True)
os.makedirs("./article-backup/otherArticles/html-contents", exist_ok=True)
os.makedirs("./article-backup/otherArticles/metadata", exist_ok=True)
os.makedirs("./article-backup/otherArticles/markdown", exist_ok=True)
for i, blog in enumerate(otherArticles):
  try:
    page = requests.get(blog['link'])
    fileName = blog['link'].split("/")[-1].split(".")[0]
    soup = BeautifulSoup(page.content, "html.parser")
    getAllImageLinks(blog['link'], page.content)
    # Get the date
    date = datetime.strptime(blog['date'], '%d %B %Y')
    # Get the article author
    authorElem = soup.select_one('p:-soup-contains("Written by")')
    if authorElem is not None:
      author = authorElem.find('a').get_text().strip()
    else:
      author = "unknown"
    # Save the raw HTML to a file for archival purpose
    filePath = "./article-backup/otherArticles/html-full/{}.html".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      f.write(soup.prettify())
    # Save JUST the article contents to a separate file which we will convert
    filePath = "./article-backup/otherArticles/html-contents/{}.html".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      articleContents = soup.find("div", {'class': 'single-article'})
      f.write(articleContents.prettify())
    # Save the metadata
    filePath = "./article-backup/otherArticles/metadata/{}.json".format(fileName)
    if os.path.exists(filePath):
      os.remove(filePath)
    with open(filePath, "w") as f:
      f.write(json.dumps({
        'author': author,
        'date': date.isoformat()
      }))
    print("[{}/{}] Progress Reports Archived and Cleaned Up".format(i+1, len(otherArticles)))
  except Exception as e:
    print("Error on - {}, {}".format(blog, e))

# Download all image assets
os.makedirs("./article-backup/assets", exist_ok=True)
print("Downloading {} assets".format(len(assetLinks)))
for link in assetLinks:
  try:
    print("Downloading - {}".format(link))
    req = requests.get(link, allow_redirects=True)
    path = "{}/{}".format("./article-backup/assets", link.split("https://pcsx2.net/")[1])
    if not os.path.exists(os.path.dirname(path)):
      os.makedirs(os.path.dirname(path))
    open(path, 'wb').write(req.content)
  except Exception as e:
    print("AHHHH - {} - {}".format(link, e))
