#!/bin/bash

find "${IN_DIR}" -maxdepth 1 -name "*.html" -type f -printf "%f\n" | while read filename; do
  filename="${filename%.*}"
  echo $filename
  iconv -f utf-8 -t utf-8 -c "${IN_DIR}/${filename}.html" > "${IN_DIR}/${filename}.html.new"
  mv -f "${IN_DIR}/${filename}.html.new" "${IN_DIR}/${filename}.html"
  pandoc "${IN_DIR}/${filename}.html" --from html --to gfm -o "${OUT_DIR}/${filename}.md"
done
