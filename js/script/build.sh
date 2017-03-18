set -x
./script/build-client.sh || exit 1
./script/build-server.sh || exit 1