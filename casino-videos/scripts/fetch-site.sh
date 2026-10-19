#!/usr/bin/env sh
# Pulls every page from the WordPress REST API into content/pages.json.
mkdir -p content
curl -sS -o content/pages.json \
  "https://mga-casino-utan-svensk-licens.se/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title,content,modified"
echo "Saved $(grep -o '"slug"' content/pages.json | wc -l) pages to content/pages.json"
