import glob

invalid_images = glob.glob('blog/**/*.png', recursive=True)
invalid_images += glob.glob('docs/**/*.png', recursive=True)

if len(invalid_images) != 0:
  print("Found PNG files, please convert these to .webp:")
  for img in invalid_images:
    print(img)
  exit(1)


invalid_images = glob.glob('blog/**/*.webp', recursive=True)
invalid_images += glob.glob('docs/**/*.webp', recursive=True)

for str in invalid_images:
  invalid = False
  if ' ' in str:
    invalid = True
    print("Found space in path: " + str)
  if(invalid):
    exit(1)


print("Found no PNGs or spaces, good to go")
exit(0)
