import glob

invalid_images = glob.glob('content/*.png', recursive=True)
invalid_images += glob.glob('themes/*.png', recursive=True)

if len(invalid_images) != 0:
  print("Found PNG files, please convert these to .webp:")
  for img in invalid_images:
    print(img)
  exit(1)
exit(0)
