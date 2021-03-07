const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');


const ChoreSchema = new Schema({
  chore_assigned_users:{
      type: [GroupMember.GroupMemberSchema],
      required: true
  },
  chore_num_assigned_users: {
    type: Number, 
    default: 1
  },
  chore_user_pool:{
    type: [GroupMember.GroupMemberSchema],
    required: true
  },
  chore_name:{
    type: String,
    required: true
  },
  chore_description:{
    type: String,
    default: 'An Amazing Task'
  },
  chore_completion_status: {
    type: String
  },
  chore_point_value: {
    type: Number
  },
  chore_schedule: ScheduleSchema
})


const model = mongoose.model('chore', ChoreSchema)
module.exports = {model, ChoreSchema}
