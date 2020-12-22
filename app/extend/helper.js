/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns-check */
'use strict';
const fs = require('fs');
const validate = require('../utils/validate');
const setBody = require('../utils/setBody');
const jwt = require('../utils/jwt');
module.exports = {
  async checkFileSize(path, size = 2) {
    const status = await fs.statSync(path);
    if (status.size > size * 1024 * 1024) {
      return false;
    }
    return true;
  },
  validate(rules, map, data) {
    const params = data || this.ctx.request.body;
    validate(rules, map, params);
  },
  setBody(data, error, code) {
    setBody(data, error, code, this.ctx);
  },
  jwt,
};
