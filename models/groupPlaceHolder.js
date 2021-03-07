const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupPlaceHolderSchema = new Schema({
  group_ID: Schema.Types.ObjectID,
  group_name: String
})

const GroupPlaceHolder = mongoose.model('groupPlaceHolder', GroupPlaceHolderSchema);

module.exports = {GroupPlaceHolder, GroupPlaceHolderSchema};