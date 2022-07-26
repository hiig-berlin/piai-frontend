#!/bin/bash

npm -g install svgo

svgo -f ./assets/svg/original -o ./assets/svg/optimized

if [[ ! -d ./assets/svg/urlencoded ]]; then
  mkdir ./assets/svg/urlencoded
fi

for file in ./assets/svg/optimized/*.svg;do
  file_name=$(basename $file)
  new_name=${file_name%.*}.txt
  
  cat "$file" | php -R 'echo strtr(rawurlencode($argn), array("%21"=>"!", "%2A"=>"*", "%22"=>"\"", "%28"=>"(", "%29"=>")"));' > "./assets/svg/urlencoded/$new_name";
  echo "./assets/svg/urlencoded$new_name"

done;

if [[ ! -d ./components/svgs ]]; then
  mkdir ./components/svgs
fi

for file in ./assets/svg/urlencoded/*.txt;do
  file_name=$(basename $file)
  svg_name=${file_name%.*}
  new_name=${file_name%.*}.ts
  
  svg="$(<"$file")"

  echo -e  "export const Svg$svg_name: string = '$svg';\nexport default Svg$svg_name;" > "./components/svgs/Svg$new_name";
  echo "./components/svgs/Svg$new_name"
done;
