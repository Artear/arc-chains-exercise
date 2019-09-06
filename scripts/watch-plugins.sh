#!/bin/bash

cd plugins;

foo() {
  echo 'watching' $d
  cd $d;
  npm install;
  npm run dev;
  cd ..;
}

for d in */ ; do foo & done