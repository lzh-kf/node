'use strict';

const { isEmail, isMobile, isDate } = require('./regexp');
const { toString } = Object.prototype;

function dataType(value) {
  return toString.call(value).substr(8).replace(']', '')
    .toLowerCase();
}

function checkEmail(value) {
  return isEmail.test(value);
}

function checkMobile(value) {
  return isMobile.test(value);
}

function checkDate(value) {
  return isDate.test(value);
}

function isExict(value) {
  return value !== undefined && value !== null && value !== '';
}

module.exports = {
  checkEmail,
  checkMobile,
  checkDate,
  dataType,
  isExict,
};
