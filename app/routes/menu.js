'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/menu/create', controller.menu.create);
  router.delete('/menu/del', controller.menu.del);
  router.post('/menu/update', controller.menu.update);
  router.post('/menu/query', controller.menu.query);
};
