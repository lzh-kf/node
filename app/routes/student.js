'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { student } = controller;
  router.post('/student/create', student.create);
  router.post('/student/update', student.update);
  router.delete('/student/del', student.del);
  router.post('/student/query', student.query);
  router.post('/student/download', student.download);
};
