'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/role/create', controller.role.create);
  router.delete('/role/del', controller.role.del);
  router.post('/role/update', controller.role.update);
  router.post('/role/query', controller.role.query);
  router.post('/role/queryAll', controller.role.queryAll);
};
