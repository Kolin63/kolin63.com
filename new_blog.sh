#!/usr/bin/env bash

if [[ ! -d "blog" ]]; then
  echo "this script must be run in root directory of repo!"
  exit 1
fi

d="$(date +%Y-%m-%d)"
i=0

while true; do
  file_id="$d-$i"
  if [[ ! -f "blog/$file_id.html" ]]; then
    break;
  fi
  i=$(( $i + 1 ))
done

printf "\e[1;93mBlog Title: \e[0m\e[4;37m"
read title
printf "\e[0m"

list_entry="    <table class=\"lr\"><tr><td class=\"left\"><li><a href=\"/blog/$file_id.html\">$title</a></li></td><td class=\"right\">$file_id</td></tr></table>"
echo "$list_entry" | cat - blog/list.txt > blog/new_list.txt
mv blog/new_list.txt blog/list.txt

cat blog/prefix.html blog/list.txt blog/postfix.html > blog/index.html
printf "$(cat blog/template.html)" "$title" "$title" "$file_id" > "blog/$file_id.html"

if [[ ! -z "$EDITOR" ]]; then
  $EDITOR blog/$file_id.html
fi
