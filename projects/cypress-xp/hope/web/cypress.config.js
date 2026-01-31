require("dotenv").config();

const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const { configurePlugin } = require('cypress-mongodb');

const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      configurePlugin(on);
      // implement node event listeners here
      config = cypressBrowserPermissionsPlugin(on, config)
      return config;
      
    },
    specPattern: [
      './cypress/support/hooks/index.cy.js',
      './cypress/e2e/**'
    ],
    baseUrl: process.env.BASE_URL,
    env: {
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow',
      },
      baseApiUrl: process.env.BASE_URL_API,
      mongodb: {
            uri: process.env.MONGODB_URI,
            database: process.env.DATABASE_NAME
        }

    },
  },
});
