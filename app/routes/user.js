'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/create', controller.user.create);
  router.delete('/user/del', controller.user.del);
  router.post('/user/update', controller.user.update);
  router.post('/user/query', controller.user.query);
};
