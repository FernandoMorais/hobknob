const validator = require('validator');

const acl = require('../domain/acl');

module.exports = {
  getUsers: (req, res) => {
    const { applicationName } = req.params;
    acl.getAllUsers(applicationName, (err, users) => {
      if (err) throw err;
      res.send(users);
    });
  },

  grant: (req, res) => {
    const { applicationName } = req.params;
    const { userEmail } = req.body;
    if (!validator.isEmail(userEmail)) {
      res.status(400).send('Invalid email');
      return;
    }
    acl.grant(userEmail, applicationName, (err) => {
      if (err) throw err;
      res.send(200);
    });
  },

  revoke: (req, res) => {
    const { applicationName, userEmail } = req.params;
    acl.revoke(userEmail, applicationName, (err) => {
      if (err) throw err;
      res.send(200);
    });
  },

  assert: (req, res) => {
    const { applicationName, userEmail } = req.params;
    acl.assert(userEmail, applicationName, (err, value) => {
      res.send({
        authorised: value,
      });
    });
  },
};
