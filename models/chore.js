const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupMember = require('./groupMember');

const ScheduleSchema = new Schema({
  schedule_due_date: Date,
  schedule_user_rotation_type: {
    type: String,
    default: 'iterate'
  },
  schedule_recurrence_type: {
    type: String,
    default: 'weekly'
  },
  date_created:{
    type: Date,
    default: Date.now
  }

})

const ChoreSchema = new Schema({
  chore_assigned_user:{
      type: GroupMember.GroupMemberSchema,
      required: true
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
