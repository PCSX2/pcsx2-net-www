import json
import os

# Load the aliases file that we built up when migrating all the articles
aliases = {}
with open("./scripts/aliases.json", "r") as f:
  aliases = json.load(f)

# This is the format for a docusaurus client-side redirect
# /docs/oldDoc -> /docs/newDoc
# {
#   to: '/docs/newDoc',
#   from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
# },

# For each alias, throw away the ones with extensions and construct a mapping like above

redirects = []

for key, value in aliases.items():
  expected_path = key.replace("content/", "").replace("/index.md", "")
  # Try to find the corresponding article in the new folder, if it's not there SCREAM
  if not os.path.exists("./pcsx2-net/{}/index.mdx".format(expected_path)):
    print("DOESNT EXIST - {}".format(expected_path))
    exit(1)
  # Now figure out the aliases and construct the redirect
  cleaned_aliases = []
  for alias in value:
    if ".htm" in alias:
      continue
    cleaned_aliases.append(alias)
  # If there are no aliases to route to, similarly scream
  if len(cleaned_aliases) == 0:
    print("NO ALIASES LEFT - {}".format(expected_path))
    exit(1)
  # Construct the redirect
  if len(cleaned_aliases) > 1:
    redirects.append({
      "to": "/{}".format(expected_path),
      "from": cleaned_aliases
    })
  else:
    redirects.append({
      "to": "/{}".format(expected_path),
      "from": cleaned_aliases[0]
    })

with open("./scripts/aliases-out.json", "w+") as f:
  f.write(json.dumps(redirects, indent=2))
