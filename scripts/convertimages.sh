#!/bin/bash

for file in ./public/img/*.jpg;do
  if [[ ${file} != *"_"* ]];then
    convert -resize 1920 -quality 85 "$file" "${file%.*}_1920.jpg"
    convert -resize 960 -quality 85 "$file" "${file%.*}_960.jpg"
  fi

done;

for file in ./public/img/*; do cwebp -q 75 "$file" -o "${file%.*}.webp"; done