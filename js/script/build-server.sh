set -x
tsc server.ts || exit 1
node server.js