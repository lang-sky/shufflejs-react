
# Guide to contribute

Read the instructions below for setting up the project locally and pushing a pull request with updates. A very good explanation of how to contribute or collaborate is [Contributors vs Collaborators](https://github.com/CoolProp/CoolProp/wiki/Contributors-vs-Collaborators) by CoolProp. This is a great read for anyone new or as a refresher. 

**Initial Boilerplate taken from [NPM Module Boilerplate](https://github.com/flexdinesh/npm-module-boilerplate)**

# Features

* **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
* **Test** - _Mocha_ with _Istanbul_ coverage
* **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
* **CI** - _TravisCI_ configuration setup
* **Minify** - Built code will be minified for performance
* **[Prettier](https://prettier.io)** - opinionated code formatter and sample taken from facebook's [create-react-app](https://github.com/facebook/create-react-app/blob/master/.prettierrc)
* **[Parcel](https://parceljs.org/getting_started.html)** - Blazing fast, zero configuration web application bundler
* **[David-dm](https://david-dm.org/?success)** - WATCHING YOUR NODE.JS DEPENDENCIES
* **[rimraf](https://www.npmjs.com/package/rimraf)** - The UNIX command rm -rf for node
* **[gh-pages](https://www.npmjs.com/package/gh-pages)** - Publish files to a gh-pages branch on GitHub
* **[shufflejs](https://www.npmjs.com/package/shufflejs)** - Publish files to a gh-pages branch on GitHub

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.
- `npm start` - starts dev server and watches for changes in index.html
- `npm run parcel-watch` - only watches for changes in index.ht
- `npm run predeploy` - bundles assets into ./public including source maps. This is useful for deploying the static page but use npm run build instead for creating the npm module for publishing
- `npm run deploy` - deploy ./public to gh-pages at github


# Getting Started Locally

Run one or all of the following

- `git clone <>`
- `npm install`
- `pyenv shell 2.7.14` if you run into npm build errors specifically asking for missing python2. You must have pyenv setup and 2.7.14 installed.
- `npm start` runs parcel dev server at http://127.0.0.1:1234/
- `npm predeeploy` bundles into ./public and its ready to deploy

To update dependancies
- `npm outdated` shows all needed updates
- `npm update` only updates minor versions
- `npm i -g npm-check-updates && ncu` installs, shows all needed updates
- `ncu -u && npm install` and prepares all for updating and install new upgrades

# Publishing to NPM

This is normally reserved for the collaborators and owner. This also requires access to the npm account and travisci accounts. 

- tag release locally. Via git command works for version control but does not update package.json so a better way is to use `npm version` like so:
```shell
# %s will be replaces with the next minor patch version so 0.1.1 to 0.1.2
npm version patch -m "Upgrade to %s for initial demo release"
```
- and push to github to trigger npm publish `git push --tags`

# Contributing Workflow

- fork Shufflejs-react
- clone fork locally
- add upstream to git remote `git remote add upstream git@github.com:ar-to/shufflejs-react.git`
- keep fork master sync with updtream `git pull --rebase upstream master` & `git push origin master`
- use topic branches from your fork master to fix bugs or add features. Push them to fork origin and pull request to upstream from github.
- Branch naming convention: anything except master. If the topic is related to a GitHub issue on the Shufflejs-react (upstream) project, then name it topic-# where # is the number of the GitHub issue, i.e. topic-13. You should consider creating an issue on that issue tracker before starting a new topic branch. That way, people will be able to know what you are doing with your topic branch.