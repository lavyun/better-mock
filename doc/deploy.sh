#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

mv doc/.vuepress/dist/.git doc/.vuepress/.git

# 生成静态文件
npm run doc:build

mv doc/.vuepress/.git doc/.vuepress/dist/.git

# 进入生成的文件夹
cd doc/.vuepress/dist

git add -A
git commit -m 'deploy'

git push -f git@github.com:lavyun/better-mock.git master:gh-pages

cd -