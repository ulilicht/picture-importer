Picture Importer
================================

This is a simple application to import pictures from my camera. It imports JPGs and DNGs. All JPGs are written into my main pictures directory. All JPG+DNGs are written into a backup directory. There is a naming helper in place which adds the date to the folder names. 

This project is based on the [React Redux Electron Starter Kit](https://github.com/donnycrash/react-redux-electron-starter-kit) and is currenlty not intended to be re-usable for others ;-) 


Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`


Getting Started
---------------

Just clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/donnycrash/react-redux-electron-starter-kit.git
$ cd react-redux-electron-starter-kit
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch the redux project

We could use concurrently but easiest to open a new tab in bash and run:

$ npm run start-app-hot         # Run electron hot

```

Usage
-----

|`npm run...`|Description|
|---|---|
|`start`|Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.|
|`start-app-hot`| Starts up an Electron instance pointing to `localhost:3000`. HMR will be enabled in development.|
|`start-app`| Starts up an Electron instance pointing to `localhost:3000`. HMR will be enabled in development.|
|`dev`|Same as `npm start`, but enables nodemon to automatically restart the server when server-related code is changed.|
|`dev:nw`|Same as `npm run dev`, but opens the redux devtools in a new window.|
|`dev:no-debug`|Same as `npm run dev` but disables redux devtools.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`flow:check`|Analyzes the project for type errors.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
|`compile:dev` |Compiles code to app/dist with `NODE_ENV` as "development".|
|`compile:prod` |Compiles code to app/dist with `NODE_ENV` as "production".|
|`compile-prepare` |Prepares app folder with its package.json and node_modules.|
|`compile-app` |Compiles app's web code (react and redux).|
|`compile-electron` |Compiles app's electron code (from /electron).|
|`pack` |Builds unpacked app for testing. `NODE_ENV` is "development".|
|`dist` |Builds app for distribution on /release.|
|`dist:linux` |Builds a linux app.|
|`dist:mac` |Builds a mac app.|
|`dist:win32` |Builds a win 32 app.|
