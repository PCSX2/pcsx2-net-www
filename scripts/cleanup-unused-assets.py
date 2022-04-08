# Process:
# - find each `index.md` file
# - IF: it has a `img/` directory next to it, get all the file names
#   - if those files do not show up in the index.md file DELETE EM

import glob
from pathlib import Path
import os

num_removed = 0

for f in glob.glob('./content/blog/**/index.md', recursive=True):
  article_dir = Path(f).parent.absolute()
  if os.path.exists(os.path.join(article_dir, 'img')):
    images = glob.glob(os.path.join(article_dir, 'img/*'))
    article_contents = open(f, 'r').read()
    for img in images:
      if article_contents.find(os.path.basename(img)) == -1:
        os.remove(img)
        num_removed = num_removed + 1
        print("Removed - {}".format(img))

print("Removed {} images".format(num_removed))
