#!/bin/bash

pwd

cd plugins;


for d in */ ; do
    cd $d;
    npm install;
    npm run build;
    cd ..;
done