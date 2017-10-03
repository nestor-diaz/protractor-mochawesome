# Protractor / Mocha / Mochawesome example

This an example of how to use protractor, mocha and mochawesome having multiple instances.

### Motivations
One of the drawbacks running protractor with a `maxInstance > 0` is that mochawesome overwritting the report leaving just the last one generated. To avoid that you can pass a report parameter called `overwrite` setting it to false and you will get multiple reports by spec. However, there is still one thing. The file names and the titles aren't related to each spec making it diffult to know which report belong to a spec.

In this example we show how to set up the protractor config in order to get multiple reports and to have files and titles with the spec name.

### protractor.config.js
```javascript
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
      overwrite: false // THIS MUST BE SET TO FALSE
    }
  },
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 3
  },
  // IN THE ON PREPARE HOOK WE SET THE REPORT TITLE AND THE REPORT FILE NAME WITH THE SPEC NAME BEING EXECUTED.
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
```
