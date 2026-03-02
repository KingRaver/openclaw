#!/bin/sh
set -e
# Fix /data volume permissions so the node user can write to it.
# Railway and other PaaS platforms mount volumes as root by default.
mkdir -p /data
chown node:node /data
# Drop to node user and execute the container command.
exec runuser -u node -- "$@"
