#!/bin/sh
if [ ! -d "/app/node_modules" ]; then
  echo "Copying node_modules from temporary directory..."
  cp -R /tmp/node_modules /app/
fi
exec node server.js