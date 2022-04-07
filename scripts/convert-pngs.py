import glob
from pathlib import Path
import os
from PIL import Image

num_converted = 0

def convert_to_webp(source):
  destination = source.with_suffix(".webp")
  image = Image.open(source)
  image.save(destination, format="webp")
  return destination

def find_and_replace_file(path, find, replace_with):
  with open(path, 'r') as file :
    filedata = file.read()
  filedata = filedata.replace(find, replace_with)
  with open(path, 'w') as file:
    file.write(filedata)

for f in glob.glob('./content/blog/**/index.md', recursive=True):
  article_dir = Path(f).parent.absolute()
  if os.path.exists(os.path.join(article_dir, 'img')):
    pngs = glob.glob(os.path.join(article_dir, 'img/*.png'))
    for png in pngs:
      png_path = Path(png)
      convert_to_webp(png_path)
      os.remove(png)
      num_converted = num_converted + 1
      print("Converted - {}".format(png))
      # Replace occurrences in the article file
      find_and_replace_file(f, os.path.basename(png_path), os.path.basename(png_path.with_suffix(".webp")))


print("Converted {} images".format(num_converted))
