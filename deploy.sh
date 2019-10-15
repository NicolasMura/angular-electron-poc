#!/bin/bash

path_ssh_key='~/.ssh/google_compute_engine_athem';
path_dst='/data/zento/artLunetteV2/app';

tar czf dist.tar.gz dist/angular-electron-poc/

scp -i $path_ssh_key dist.tar.gz techdev@artlunettev2-dev.zento.fr:$path_dst && echo transfer successful!;
ssh -i $path_ssh_key techdev@artlunettev2-dev.zento.fr bash -c "'
  cd $path_dst
  rm -Rf dist
  sleep 1s
  echo Décompression...
  tar xzf dist.tar.gz
'";