'use strict';

`module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const {{model}}Schema = new Schema({
    defalutPropertry: {
      required: true,
      type: String,
    },
  });
  return mongoose.model('{{tableName}}', {{model}}Schema);
}`;

