'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/permission/create', controller.permission.create);
  router.delete('/permission/del', controller.permission.del);
  router.post('/permission/update', controller.permission.update);
  router.post('/permission/query', controller.permission.query);
};
