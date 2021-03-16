const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupPlaceHolderSchema = new Schema({
  group_ID: {
    type: Schema.Types.ObjectID,
    ref: 'group'
  },
  group_name: String
})

const GroupPlaceHolder = mongoose.model('groupPlaceHolder', GroupPlaceHolderSchema);

module.exports = {GroupPlaceHolder, GroupPlaceHolderSchema};