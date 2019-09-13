# Spaced Repetition Capstone

# by Paul and Chris

# About
Lets the user create spaced repetition flash card sets in order to help them memorize foreign words.

# Live Server
https://spaced-repetition-cr.herokuapp.com/

## Tech Stack
Front End: React, JavaScript, HTML, CSS
Back End: NodeJs, Express, PostgreSQL
Testing: Cypress, Chai, Mocha

## Screenshots:
Dashboard:
![ScreenShot](https://github.com/thinkful-ei-emu/spaced-repetition-client-CP3/blob/master/src/images/dashboard.png)
Learning: ![ScreenShot](https://github.com/thinkful-ei-emu/spaced-repetition-client-CP3/blob/master/src/images/learning.png)
Login: ![ScreenShot](https://github.com/thinkful-ei-emu/spaced-repetition-client-CP3/blob/master/src/images/login_screen.png)
Register: ![ScreenShot](https://github.com/thinkful-ei-emu/spaced-repetition-client-CP3/blob/master/src/images/register.png)

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application *Cypress.io* for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
