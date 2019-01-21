module.exports = (app) => {
  app.get('/example-plugin', (req, res) => {
    res.sendStatus(200);
  });
};
