const forever = require('forever-monitor'); // eslint-disable-line import/no-extraneous-dependencies

const child = new (forever.Monitor)('server/app.js', {
  max: -1,
  silent: false,
  options: [],
  watch: true,
  watchDirectory: './',
});

child.on('exit', () => {
  // eslint-disable-next-line no-console
  console.log('app.js has exited');
});

child.start();
