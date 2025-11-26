#!/usr/bin/env bash
set -euxo pipefail

#build pdf from tex source codes
make all
#rm extra files when bulding tex project
make clean