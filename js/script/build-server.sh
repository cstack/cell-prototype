set -x
tsc server.ts --noImplicitAny || exit 1
node server.js