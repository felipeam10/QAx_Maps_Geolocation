const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');
const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
      // implement node event listeners here
      config = cypressBrowserPermissionsPlugin(on, config)
      return config;
      
    },
    env: {
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow',
      },
      mongodb: {
            uri: 'mongodb+srv://qax:xperience@cluster0.grbw1ss.mongodb.net/HopeDB?appName=Cluster0',
            database: 'HopeDB'
        }

    },
  },
});
