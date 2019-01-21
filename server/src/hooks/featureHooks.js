const path = require('path');
const async = require('async');
const config = require('config');

const TIMEOUT = 5 * 1000;
const builtInHooks = [
  './server/src/hooks/audit.js'
];
const customHooks = config.hooks || [];

const hooks = builtInHooks.concat(customHooks).map((hook) => {
  const hookpath = path.resolve(hook);
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(hookpath);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error loading hook: ${hookpath}`);
    return null;
  }
});

module.exports.run = (ev) => {
  async.each(hooks, (hook, done) => {
    if (hook[ev.fn]) {
      const fn = async.timeout(hook[ev.fn], TIMEOUT);
      return fn(ev, done);
    }
    return done();
  }, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};
