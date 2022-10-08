const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '', // https://docs.cypress.io/guides/dashboard/projects#Set-up-a-project-to-record
  e2e: {
    baseUrl: 'http://localhost:3000/',
  },
  chromeWebSecurity: false,
  viewportWidth: 1300
});
