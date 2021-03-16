const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupMemberSchema = new Schema({
  user_ID: Schema.Types.ObjectID,
  user_name: String,
  admin: {
    type: Boolean,
    default: false
  },
  completed_tasks: {
    type: Number,
    default: 0,
    required: true
  },
  point_balance: {
    type: Number,
    default: 0,
    required: true
  }

})

const model = mongoose.model('groupMember', GroupMemberSchema);

module.exports = {model, GroupMemberSchema}