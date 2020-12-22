'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.login.login);
  router.post('/logout', controller.login.logout);
  router.get('/queryMenusAndPermission', controller.login.queryMenusAndPermission);
};
