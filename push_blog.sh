#!/usr/bin/env bash

printf "\e[1;93mChanges consist only of blog, and ready to push to main? [y]: \e[0m\e[4;37m"
read answer
printf "\e[0m"

if [[ "$answer" != "y" ]]; then
  exit 0
fi

git add blog
git commit -m "Blog"
git checkout main
git rebase dev
git checkout dev
git push --all
