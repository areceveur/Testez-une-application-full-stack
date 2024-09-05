/**
 * @type {Cypress.PluginConfig}
 */
//import * as registerCodeCoverageTasks from '@cypress/code-coverage/task';

const codeCoverageTask = require('@cypress/code-coverage/task')

module.exports = (on, config) => {
  codeCoverageTask(on, config)
  return config
}

