import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'hyh112',
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const setupPlugins = require('./cypress/plugins/index')
      return setupPlugins(on, config)
    },
    baseUrl: 'http://localhost:4200',
  },
})
