
# Schedule App

The Schedule App is web application developed in [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).
Into this app you are able to see the list of schedules and the logs for each schedule entries. The app support mobile layout and also responsive layout.

The backend application was developed on [GitHub Repo - schedules-api](https://github.com/claudiacarvalhoc/schedules-api) and deployed on heroku [myschedules-api](https://myschedules-api.herokuapp.com/).

The Schedule App was developed on [GitHub Repo - schedules-app](https://github.com/claudiacarvalhoc/schedules-app) and is available on [GitHub Pages](https://claudiacarvalhoc.github.io/schedules-app/).

## Installation

### Requirements

* Node v14.16.1
* TypeScript 4.2.4
* NVM 0.37.1 (optional)
* Yarn 1.22.10

### Run app

```bash
yarn install
yarn start
```

### Deploy app

```bash
yarn build
yarn deploy
```

## Project Structure

The project has the following structure:
```
src
└── build
└── config
    └── jest
└── public
└── components
    └── app
    └── buttonaction
    └── header
    └── logitem
    └── profile
    └── scheduleitem
    └── schedulelogs
    └── schedules
    └── time
└── redux
    └── app
```
The tests and styles files of each component are located on the same folder.

# Aditional Notes

1. This project use Jest and Enzyme to test the components.
Some of the tests were developed to make sure that clicks on buttons were actually doing something. But, unfortunately I faced the error below when the click on element was trigged.
```console
Actions must be plain objects. Use custom middleware for async actions.
```

2. The Test Coverage Summary is:

=============================== Coverage summary ===============================
Statements   : 63.86% ( 129/202 )
Branches     : 66.67% ( 50/75 )
Functions    : 55.42% ( 46/83 )
Lines        : 65.71% ( 115/175 )
================================================================================