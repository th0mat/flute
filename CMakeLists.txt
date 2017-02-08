cmake_minimum_required(VERSION 3.6)
project(magic)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        app/actions/counter.js
        app/components/Counter.css
        app/components/Counter.js
        app/components/Home.css
        app/components/Home.js
        app/containers/App.js
        app/containers/CounterPage.js
        app/containers/HomePage.js
        app/reducers/counter.js
        app/reducers/index.js
        app/store/configureStore.development.js
        app/store/configureStore.js
        app/store/configureStore.production.js
        app/app.global.css
        app/app.html
        app/app.icns
        app/index.js
        app/main.development.js
        app/package.json
        app/routes.js
        app/yarn.lock)

add_executable(magic ${SOURCE_FILES})