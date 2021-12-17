import json
import datetime
import re

with open('./data.json') as f:
  data = json.load(f)

data = data['data']

new_data = []

for entry in data:
  title = entry[0]
  serial = "{}-{}".format(re.split(r'(\d+)', entry[1])[0], re.split(r'(\d+)', entry[1])[1])
  region = entry[2]
  if "compatusa" in region:
    region = "us"
  elif "compatjapan" in region:
    region = "ja"
  elif "compateurope" in region:
    region = "eu"
  elif "compatkorea" in region:
    region = "kr"
  elif "compatchina" in region:
    region = "ch"
  elif "compatfrance" in region:
    region = "fr"
  elif "compatgermany" in region:
    region = "de"
  else:
    print(region)
  status = entry[3].split("<")[0]
  last_tested_version = entry[4]
  crc = entry[5]
  last_tested_date = datetime.datetime.strptime(entry[6], '%d-%m-%Y') # m-d=y? lets change to ISO timestamps y-m-d
  if "Not available" in entry[7]:
    wiki_link = None
  else:
    wiki_link = entry[7].split("href=")[1].split(">")[0]
  if "Not available" in entry[8]:
    forum_link = None
  else:
    forum_link = entry[8].split('href=\"')[1].split('\"')[0]

  new_data.append({
    'title': title,
    'serial': serial,
    'crc': crc,
    'region': region,
    'status': status,
    'last_tested_version': last_tested_version,
    'last_tested_date': last_tested_date.isoformat(),
    'wiki_link': wiki_link,
    'forum_link': forum_link
  })

with open('./data-new.json', 'w') as json_file:
  json.dump(new_data, json_file, indent=2)
