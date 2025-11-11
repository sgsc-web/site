#!/bin/zsh
grep -o 'href="[^"]*css[^"]*"' ar/index.html | /usr/bin/sed 's/href="//;s/"//' | while read url; do
  if [[ "$url" == "//"* ]]; then
    url="https:$url"
  fi
  if [[ "$url" != "http"* ]]; then
    url="https://halal-trip.com$url"
  fi
  
  # Create directory structure
  path=$(echo "$url" | /usr/bin/sed 's|https://halal-trip.com/||')
  dir=$(/usr/bin/dirname "$path")
  /bin/mkdir -p "ar/$dir"
  
  # Download file
  /usr/bin/curl -L -o "ar/$path" "$url"
done
