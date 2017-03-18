set -x
tsc --noImplicitAny --jsx react client.tsx || exit 1
browserify client.js -o public/application.js || exit 1