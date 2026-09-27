#!/usr/bin/env bash

eof_read_out=""
function eof_read {
  eof_read_out=""

  printf "\e[0;37m"
  while IFS= read -r line; do
    printf "\e[0;37m"

    [[ "$line" == "EOF" ]] && return

    if [[ -n "$eof_read_out" ]]; then
      eof_read_out+=$'\n'
    fi

    eof_read_out+="$line"

    printf "\e[0;37m"
  done
}

pattern="*"
raw_files=""

while true; do
  out=$(ls -d $pattern)

  if [[ $? -ne 0 ]]; then
    break
  fi

  raw_files="$raw_files$out "
  pattern="$pattern/*"
done

html_files=""

for i in $raw_files; do
  if [[ "$(tail -c 6 <<< $i)" != ".html" ]]; then
    continue;
  fi
  html_files="$html_files$i "
done

query=""
replace=""

printf "\e[1;93mWhat do you want to replace (end with EOF):\e[0m\n"
eof_read
query="$eof_read_out"

printf "\n\e[1;93mWhat do you want to replace it with (end with EOF):\e[0m\n"
eof_read
replace="$eof_read_out"

for file in $html_files; do
  QUERY="$query" REPLACE="$replace" perl -0pi -e 's/\Q$ENV{QUERY}\E/$ENV{REPLACE}/g' "$file"
done
