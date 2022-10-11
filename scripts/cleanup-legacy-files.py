
import os
import glob

id = input("ID Prefix (ie. 219): ")
for f in glob.glob('./article-backup/devblogs/**/{}*'.format(id), recursive=True):
  os.remove(f)
