const path = require('path');

exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
    todo: '../test/todo.spec*.js',
    interacting: '../test/interacting.spec.js'
  },
  mochaOpts: {
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: false
    }
  },
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 3
  },
  onPrepare: () => {
    return browser.getProcessedConfig().then(function(config) {
      if (config.specs.length > 0) {
        const spec = path.basename(config.specs[0]);

        process.env.MOCHAWESOME_REPORTTITLE = spec;
        process.env.MOCHAWESOME_REPORTFILENAME = spec;
      }
    });
  }
};
