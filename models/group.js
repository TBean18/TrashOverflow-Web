const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');
const Chore = require('./chore');


const GroupSchema = new Schema({
  group_name:{
      type: String,
      required: true
  },
  group_members:{
    type: [GroupMember.GroupMemberSchema],
    required: true
  },
  group_member_count: {
    type: Number,
    default: 1
  },
  group_admins:{
    type: [GroupMember.GroupMemberSchema],
    required: true
  },
  group_description:{
    type: String,
    default: 'Our Great Group'
  },
  date_created:{
    type: Date,
    default: Date.now
  },
  group_chore_list: {
    type: [Chore.ChoreSchema]
  }

})


const model = mongoose.model('group', GroupSchema)
module.exports = model
