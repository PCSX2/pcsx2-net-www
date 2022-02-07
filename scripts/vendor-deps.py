# Simple script to make manually vendoring frontend javascript and css dependencies not manual
# it will compare the versions in `package.json` (monitored by github / dependabot)
# with that in `deps-info.json`
#
# deps-info.json contains metadata for how to download the dependencies, which files to grab, and where to save them
#
# then the script will do a pass through all theme .html files and update the paths accordingly
# NOTE: this step assumes the base folder paths remain the same!

# TODO - detect if there are unstaged git changes and abort

# Compare versions
print("Checking for Dependency Mismatches...")
import json

with open('./package.json', 'r') as f:
  npm_info = json.load(f)['dependencies']
with open('./deps-info.json', 'r') as f:
  vendored_info = json.load(f)

should_exit = False
for npm_dep, npm_ver in npm_info.items():
  if npm_ver != vendored_info[npm_dep]['pinnedVersion']:
    print("MISMATCH FOUND: {}@{} != {}@{}".format(npm_dep, npm_ver, npm_dep, vendored_info[npm_dep]['pinnedVersion']))
    should_exit = True

if should_exit:
  exit(1)
print("Looks Good!...")

# Download and replace the vendored files
# TODO - currently fails fast
print("Vendoring Deps...")
import requests
import os
import shutil

# Clean vendor directories
if os.path.exists("./themes/pcsx2/static/js/vendor/"):
  # clean directory
  shutil.rmtree("./themes/pcsx2/static/js/vendor/")
os.makedirs("./themes/pcsx2/static/js/vendor/")
if os.path.exists("./themes/pcsx2/static/css/vendor/"):
  # clean directory
  shutil.rmtree("./themes/pcsx2/static/css/vendor/")
os.makedirs("./themes/pcsx2/static/css/vendor/")

def construct_url(base_url, version, file_name):
  # Handle intricates between CDNs
  if 'unpkg' in base_url or 'jsdelivr' in base_url:
    return "{}@{}/{}".format(base_url, version, file_name)
  if 'cdnjs.cloudflare' in base_url:
    return "{}/{}/{}".format(base_url, version, file_name)

for dep, meta in vendored_info.items():
  # TODO - error if 404
  # javascript
  if 'js' in meta:
    # download the files into the new directory
    for f in meta['js']['filesToVendor']:
      r = requests.get(construct_url(meta['js']['baseUrlToFetch'], meta['pinnedVersion'], f))
      save_path = "{}@{}/{}".format(meta['js']['directoryToSave'], meta['pinnedVersion'], os.path.basename(f))
      os.makedirs(os.path.dirname(save_path))
      with open(save_path, 'wb') as f:
        f.write(r.content)
  # css
  if 'css' in meta:
    # download the files into the new directory
    for f in meta['css']['filesToVendor']:
      r = requests.get(construct_url(meta['css']['baseUrlToFetch'], meta['pinnedVersion'], f))
      save_path = "{}@{}/{}".format(meta['css']['directoryToSave'], meta['pinnedVersion'], os.path.basename(f))
      os.makedirs(os.path.dirname(save_path))
      with open(save_path, 'wb') as f:
        f.write(r.content)
print("Vendoring Deps Complete!")

# Update all references in code
print("Updating Referenced Versions in HTML files...")
from pathlib import Path
import re

for path in Path('./themes/pcsx2').rglob('*.html'):
  modified_lines = []
  # read current lines
  with open(path) as file:
    lines = file.readlines()
  # update lines
  for line in lines:
    line_to_append = line
    for dep, meta in vendored_info.items():
      if ('script' in line or '<link' in line) and 'vendor/{}'.format(dep) in line:
        line_to_append = re.sub('@(\d+\.?)+', "@{}".format(meta['pinnedVersion']), line)
        break
    modified_lines.append(line_to_append)
  # write the file
  with open(path, 'r+') as f:
    f.seek(0)
    f.writelines(modified_lines)
    f.truncate()
print("Updating Referenced Versions in HTML files completed!")
