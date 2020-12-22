'use strict';

const { checkEmail, checkMobile, checkDate, dataType, isExict } = require('./index');

function getMap(data) {
  const result = {};
  for (const key in data) {
    result[key] = key;
  }
  return result;
}

/**
  * param { object } rules 规则对象
  * param { object } defaultMap key和中文的映射关系
  * param { object } data 要校验的参数
  * return object || Boolean
  */

function validate(rules, defaultMap, data) {
  const map = defaultMap || getMap(rules);
  // string number email mobile boolean date emun
  // attrs required type min(number) max(number) minLength(string) maxLength(string)
  let result = {};
  for (const key in rules) {
    const currentVaildateRule = rules[key];
    const { min, max, minLength, maxLength, required, type, emun, customValidate } = currentVaildateRule;
    const value = data[key];
    const currentType = dataType(value);
    // 自定义校验
    if (customValidate) {
      try {
        customValidate(data, map);
      } catch (error) {
        throw error;
      }
      return true;
    }
    if (required || value) {
      if (!isExict(value)) {
        result = {
          message: `${map[key]}不能为空`,
        };
        break;
      }
      if (type !== currentType) {
        result = {
          message: `${map[key]}类型应为${type}`,
        };
        break;
      }
      if (type === 'string') {
        if (minLength && value.length < minLength) {
          result = {
            message: `${map[key]}的最小长度为${minLength}`,
          };
          break;
        }
        if (maxLength && value.length > maxLength) {
          result = {
            message: `${map[key]}的最大长度为${maxLength}`,
          };
          break;
        }
      }
      if (type === 'number') {
        if (min && value < min) {
          result = {
            message: `${map[key]}的最小值为${min}`,
          };
          break;
        }
        if (max && value > max) {
          result = {
            message: `${map[key]}的最大值为${max}`,
          };
          break;
        }
      }
      if (type === 'email' && !checkEmail(value)) {
        result = {
          message: `${map[key]}格式错误`,
        };
        break;
      }
      if (type === 'mobile' && !checkMobile(value)) {
        result = {
          message: `${map[key]}格式错误`,
        };
        break;
      }
      if (type === 'date' && !checkDate(value)) {
        result = {
          message: `${map[key]}格式错误,参考yyyy-MM-dd HH:mm:ss`,
        };
        break;
      }
      if (emun && !emun.includes(value)) {
        result = {
          message: `${map[key]}错误，有效值为 ${emun.join(',')}`,
        };
        break;
      }
    } else {
      continue;
    }
  }
  if (Object.keys(result).length) {
    throw result;
  }
  return true;
}


module.exports = validate;
