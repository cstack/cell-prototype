set -x
tsc client.ts || exit 1
browserify client.js -o public/application.js || exit 1