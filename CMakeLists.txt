cmake_minimum_required(VERSION 3.6)
project(flute)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        node_modules/fsevents/src/async.cc
        node_modules/fsevents/src/constants.cc
        node_modules/fsevents/src/locking.cc
        node_modules/fsevents/src/methods.cc
        node_modules/fsevents/src/storage.cc
        node_modules/fsevents/src/thread.cc
        node_modules/fsevents/fsevents.cc
        node_modules/nan/nan.h
         node_modules/pty.js/node_modules/nan/nan.h
        node_modules/pty.js/node_modules/nan/nan_callbacks.h
        node_modules/pty.js/node_modules/nan/nan_callbacks_12_inl.h
        node_modules/pty.js/node_modules/nan/nan_callbacks_pre_12_inl.h
        node_modules/sqlite3/src/macros.h
        node_modules/sqlite3/src/node_sqlite3.cc
        node_modules/sqlite3/src/statement.cc
        node_modules/sqlite3/src/statement.h
        node_modules/sqlite3/src/threading.h
        node_modules/uuid/benchmark/benchmark-native.c
        release/darwin-x64/MagicFlute-darwin-x64/MagicFlute.app/Contents/Resources/app/node_modules/sqlite3/src/threading.h)

add_executable(flute ${SOURCE_FILES})