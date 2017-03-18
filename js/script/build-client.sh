set -x
tsc --noImplicitAny client.ts || exit 1
browserify client.js -o public/application.js || exit 1