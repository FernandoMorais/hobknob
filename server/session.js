const session = require('express-session');

module.exports.init = (config, express) => {
  let sessionMiddleware;
  let useConnectEtcdSession;
  let useConnectRedisSession;

  try {
    useConnectEtcdSession = require.resolve('connect-etcd');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  try {
    useConnectRedisSession = require.resolve('connect-redis');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  if (useConnectEtcdSession) {
    // eslint-disable-next-line global-require,import/no-unresolved
    const EtcdStore = require('connect-etcd')(session);

    sessionMiddleware = session({
      store: new EtcdStore({ url: config.etcdHost, port: config.etcdPort }),
      secret: 'hobknob',
    });
  } else if (useConnectRedisSession) {
    // eslint-disable-next-line global-require,import/no-unresolved
    const RedisStore = require('connect-redis')(session);

    sessionMiddleware = session({
      store: new RedisStore({ host: config.redisHost, port: config.redisPort }),
      secret: 'hobknob',
    });
  } else {
    sessionMiddleware = express.session();
  }

  return function (req, res, next) {
    if (req.path === '/service-status' || req.path === '/_lbstatus') {
      return next();
    }

    return sessionMiddleware(req, res, next);
  };
};
