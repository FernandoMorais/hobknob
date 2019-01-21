const audit = require('../domain/audit');

module.exports = {
  getFeatureAuditTrail: (req, res) => {
    const { applicationName, featureName } = req.params;

    audit.getFeatureAuditTrail(applicationName, featureName, (err, auditTrail) => {
      if (err) {
        if (err.errorCode === 100) { // key not found
          res.send([]);
          return;
        }
        throw err;
      }
      res.send(auditTrail);
    });
  },

  getApplicationAuditTrail(req, res) {
    const { applicationName } = req.params;

    audit.getApplicationAuditTrail(applicationName, (err, auditTrail) => {
      if (err) {
        if (err.errorCode === 100) { // key not found
          res.send([]);
          return;
        }
        throw err;
      }
      res.send(auditTrail);
    });
  }
};
