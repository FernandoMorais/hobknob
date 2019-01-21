// eslint-disable-next-line no-unused-vars
const config = require('config');

exports.dashboard = (req, res) => {
  res.render('main',
    {
      title: 'Dashboard',
      pageHeader: 'Dashboard',
      user: req.user
    });
};

exports.partials = (req, res) => {
  const { name } = req.params;
  res.render(`partials/${name}`);
};
