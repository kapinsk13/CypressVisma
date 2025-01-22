const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "watchForFileChanges": false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
            way2automation_URL: 'https://www.way2automation.com',
            API_URL_jsonplaceholder: 'https://jsonplaceholder.typicode.com',
            API_URL_ALBUMS: 'https://albums-collection-service.herokuapp.com',
        },
  },
});
