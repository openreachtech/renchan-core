#!/bin/bash

############################################################## declare functions

function jestCommand () {
  npx jest --forceExit --passWithNoTests "$@";
}

function setupStorage () {
  blockTitle 'setup db with master seeds.';

  npm run db:teardown;
  npm run db:setup;
  npm run db:seed:master;
}

function testWithEmpty () {
  blockTitle 'test with master seeds only.';

  jestCommand --maxWorkers=5 tests/empty/__tests__/
  jestCommand --detectOpenHandles tests/empty/_orders/

  return
}

function testWithSeeded () {
  blockTitle 'test with master and development seeds.';

  npm run db:seed:dev;
  jestCommand --maxWorkers=5 tests/__tests__/
  jestCommand --detectOpenHandles tests/_orders/

  return
}

function blockTitle () {
  echo '';
  echo '//////////////////////////////////////////////////';
  echo '//';
  echo "//    $1";
  echo '//';
  echo '//////////////////////////////////////////////////';
  echo '';
}

function initialize () {
  blockTitle 'Start to test 🎉';
  date;
}

function terminalize () {
  blockTitle 'Finish to test 🍵';
  date;
}

################################################################### execute main

initialize;

setupStorage; # teardown > setup > seed:master

if [ $# = 0 ]; then
  testWithEmpty;
  testWithSeeded;

  exit;
fi

mode="${1:-all}";
target=$2;

if [ $mode = '--empty' ]; then
  if [ "$target" = '' ]; then
    testWithEmpty;
  else
    jestCommand ${@:2};
  fi

  exit;
fi

if [ $mode = '--seeded' ]; then
  if [ "$target" = '' ]; then
    testWithSeeded;
  else
    npm run db:seed:dev;
    jestCommand ${@:2};
  fi

  exit;
fi

npm run db:seed:dev;
jestCommand "$@";
